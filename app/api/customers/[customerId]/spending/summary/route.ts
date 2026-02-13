// app/api/customers/[customerId]/spending/summary/route.ts
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

    const transactions = await prisma.transaction.findMany({
      where: {
        customerId,
        date: {
          gte: startDate,
          lte: now,
        },
      },
    });

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        { error: "No transactions found for this period" },
        { status: 404 }
      );
    }

    const totalSpentRaw = transactions.reduce((sum, t) => sum + t.amount, 0);
    const transactionCount = transactions.length;
    const averageTransactionRaw = totalSpentRaw / transactionCount;

    const totalSpent = Math.round(totalSpentRaw * 100) / 100;
    const averageTransaction = Math.round(averageTransactionRaw * 100) / 100;

    const categoryMap: Record<string, number> = {};
    for (const t of transactions) {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
    const topCategory =
      Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    // Previous period comparison
    const previousStartDate = new Date(startDate);
    const previousEndDate = new Date(startDate);
    previousEndDate.setDate(previousEndDate.getDate() - 1);
    previousStartDate.setTime(
      previousEndDate.getTime() - (now.getTime() - startDate.getTime())
    );

    const previousTransactions = await prisma.transaction.findMany({
      where: {
        customerId,
        date: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
    });

    const previousTotal = previousTransactions.reduce((sum, t) => sum + t.amount, 0);
    const previousCount = previousTransactions.length;

    const spentChangeRaw =
      previousTotal === 0 ? null : ((totalSpentRaw - previousTotal) / previousTotal) * 100;
    const transactionChangeRaw =
      previousCount === 0 ? null : ((transactionCount - previousCount) / previousCount) * 100;

    const spentChange = spentChangeRaw !== null ? Math.round(spentChangeRaw * 100) / 100 : null;
    const transactionChange =
      transactionChangeRaw !== null ? Math.round(transactionChangeRaw * 100) / 100 : null;

    const response = {
      period: validatedPeriod,
      totalSpent,
      transactionCount,
      averageTransaction,
      topCategory,
      comparedToPrevious: {
        spentChange,
        transactionChange,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};