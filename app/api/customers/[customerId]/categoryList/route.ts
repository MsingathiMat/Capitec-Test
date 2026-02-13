import { prisma } from "@/lib/prisma";
import { summaryPeriodSchema } from "@/schemas/zodschemavalidation";
import { SummaryPeriod } from "@/constants/summaryPeriod";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) => {
  const { customerId } =await params;

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID not supplied" },
      { status: 400 }
    );
  }

  const query = request.nextUrl.searchParams;
  const period = query.get("period") ?? SummaryPeriod.THIRTY_DAYS;
  const startDateQuery = query.get("startDate");
  const endDateQuery = query.get("endDate");

  const periodValidation = summaryPeriodSchema.safeParse(period);
  if (!periodValidation.success) {
    return NextResponse.json(
      { error: "Invalid summary period" },
      { status: 400 }
    );
  }

  try {
    const now = new Date();
    const endDate = endDateQuery ? new Date(endDateQuery) : now;
    let startDate: Date;

    if (startDateQuery) {
      startDate = new Date(startDateQuery);
    } else {
      startDate = new Date(now);

      switch (periodValidation.data) {
        case SummaryPeriod.SEVEN_DAYS:
          startDate.setDate(now.getDate() - 7);
          break;
        case SummaryPeriod.THIRTY_DAYS:
          startDate.setDate(now.getDate() - 30);
          break;
        case SummaryPeriod.NINETY_DAYS:
          startDate.setDate(now.getDate() - 90);
          break;
        case SummaryPeriod.ONE_YEAR:
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        customerId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        category: true,
        amount: true,
      },
    });

    const categoryTotals: Record<string, number> = {};

    for (const t of transactions) {
      categoryTotals[t.category] =
        (categoryTotals[t.category] ?? 0) + t.amount;
    }

    const categoryMeta = await prisma.categoryMeta.findMany();

    const categories = Object.entries(categoryTotals).map(
      ([name, amount]) => {
        const meta = categoryMeta.find((c) => c.name === name);

        return {
          name,
          amount: Math.round(amount * 100) / 100,
          color: meta?.color ?? "#000000",
          icon: meta?.icon ?? "circle",
        };
      }
    );

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
