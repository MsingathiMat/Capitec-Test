// app/api/customers/[customerId]/goals/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) => {
  const { customerId } = await params;

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID not supplied" },
      { status: 400 }
    );
  }

  try {
    const goals = await prisma.goal.findMany({
      where: { customerId },
    });

    // Round numeric values
    const responseGoals = goals.map((goal) => ({
      id: goal.id,
      category: goal.category,
      monthlyBudget: Number(goal.monthlyBudget.toFixed(2)),
      currentSpent: Number(goal.currentSpent.toFixed(2)),
      percentageUsed: Number(goal.percentageUsed.toFixed(2)),
      daysRemaining: goal.daysRemaining,
      status: goal.status.toLowerCase(), // e.g., ON_TRACK -> on_track
    }));

    return NextResponse.json(responseGoals, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};