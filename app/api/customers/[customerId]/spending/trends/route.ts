// app/api/customers/[customerId]/spending/trends/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/customers/{customerId}/spending/trends?months={months}
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) => {
  const { customerId } = await params;

  // Validate customerId
  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID not supplied" },
      { status: 400 }
    );
  }

  // Get months from query string, default to 12
  const query = request.nextUrl.searchParams;
  const monthsParam = query.get("months")?.trim() ?? "12";

  const months = parseInt(monthsParam, 10);

  // Validate months
  if (isNaN(months) || months < 1) {
    return NextResponse.json(
      { error: "Months query parameter must be a number >= 1" },
      { status: 400 }
    );
  }

  if (months > 24) {
    return NextResponse.json(
      { error: "Maximum months allowed is 24" },
      { status: 400 }
    );
  }

  try {
    const trends: {
      month: string;
      totalSpent: number;
      transactionCount: number;
      averageTransaction: number;
    }[] = [];

    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1,
        0,
        0,
        0,
        0
      );
      const monthEnd = new Date(
        monthStart.getFullYear(),
        monthStart.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      // Fetch transactions for this month
      const transactions = await prisma.transaction.findMany({
        where: {
          customerId,
          date: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      });

      const totalSpentRaw = transactions.reduce((sum, t) => sum + t.amount, 0);
      const transactionCount = transactions.length;
      const averageTransactionRaw =
        transactionCount > 0 ? totalSpentRaw / transactionCount : 0;

      // Round to 2 decimals
      const totalSpent = Number(totalSpentRaw.toFixed(2));
      const averageTransaction = Number(averageTransactionRaw.toFixed(2));

      trends.push({
        month: `${monthStart.getFullYear()}-${String(
          monthStart.getMonth() + 1
        ).padStart(2, "0")}`,
        totalSpent,
        transactionCount,
        averageTransaction,
      });
    }

    return NextResponse.json(trends, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};