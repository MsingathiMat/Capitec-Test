
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

  const user = await prisma.customer.findUnique({
    where: {
      customerId, 
    },
  
  });

  if (!user) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
};