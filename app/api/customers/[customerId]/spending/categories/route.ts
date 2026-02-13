import { prisma } from "@/lib/prisma";
import { summaryPeriodSchema } from "@/schemas/zodschemavalidation";
import { SummaryPeriod } from "@/constants/summaryPeriod";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) => {
  const { customerId } = await params;

  if (!customerId) {
    return NextResponse.json({ error: "Customer ID not supplied" }, { status: 400 });
  }

  const query = request.nextUrl.searchParams;

  const period = query.get("period") ?? SummaryPeriod.THIRTY_DAYS;
  const startDateQuery = query.get("startDate");
  const endDateQuery = query.get("endDate");

  const periodValidation = summaryPeriodSchema.safeParse(period);
  if (!periodValidation.success) {
    return NextResponse.json(
      { error: "Summary period in query string is invalid" },
      { status: 400 }
    );
  }
  const validatedPeriod = periodValidation.data;

  try {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = endDateQuery ? new Date(endDateQuery) : now;

    // If custom date range provided
    if (startDateQuery) {
      startDate = new Date(startDateQuery);
    } else {
      // Otherwise, calculate based on period
      switch (validatedPeriod) {
        case SummaryPeriod.SEVEN_DAYS:
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          break;
        case SummaryPeriod.THIRTY_DAYS:
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 30);
          break;
        case SummaryPeriod.NINETY_DAYS:
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 90);
          break;
        case SummaryPeriod.ONE_YEAR:
          startDate = new Date(now);
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 30);
      }
    }

    // Fetch transactions
    const transactions = await prisma.transaction.findMany({
      where: {
        customerId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        { error: "No transactions found for this period" },
        { status: 404 }
      );
    }

    // Aggregate by category
    const categoryMap: Record<
      string,
      { amount: number; transactionCount: number }
    > = {};

    for (const t of transactions) {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = { amount: 0, transactionCount: 0 };
      }
      categoryMap[t.category].amount += t.amount;
      categoryMap[t.category].transactionCount += 1;
    }

    // Fetch category metadata (color, icon)
    const categoryMeta = await prisma.categoryMeta.findMany();
    const totalAmountRaw = transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalAmount = Math.round(totalAmountRaw * 100) / 100;

    const categories = Object.entries(categoryMap).map(([name, data]) => {
      const meta = categoryMeta.find((c) => c.name === name);
      const percentage = totalAmountRaw === 0 ? 0 : (data.amount / totalAmountRaw) * 100;

      return {
        name,
        amount: Math.round(data.amount * 100) / 100,
        percentage: Math.round(percentage * 100) / 100,
        transactionCount: data.transactionCount,
        color: meta?.color ?? "#000000",
        icon: meta?.icon ?? "circle",
      };
    });

    const response = {
      dateRange: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      },
      totalAmount,
      categories,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};