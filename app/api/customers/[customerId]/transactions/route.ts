// app/api/customers/[customerId]/transactions/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/customers/{customerId}/transactions
// ?limit=&offset=&category=&startDate=&endDate=&sortBy=
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

  const query = request.nextUrl.searchParams;

  // -------------------------
  // Pagination
  // -------------------------
  let limit = Number(query.get("limit") ?? 20);
  if (isNaN(limit) || limit < 1) limit = 20;
  if (limit > 100) limit = 100;

  let offset = Number(query.get("offset") ?? 0);
  if (isNaN(offset) || offset < 0) offset = 0;

  // -------------------------
  // Filters
  // -------------------------
  const categoryFilter = query.get("category")?.trim() || undefined;
  const startDateParam = query.get("startDate")?.trim();
  const endDateParam = query.get("endDate")?.trim();

  let startDate: Date | undefined;
  let endDate: Date | undefined;

  if (startDateParam) {
    startDate = new Date(startDateParam);
    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid startDate" },
        { status: 400 }
      );
    }
    startDate.setDate(startDate.getDate() + 1);

    // ✅ START OF DAY
    startDate.setHours(0, 0, 0, 0);
  }

  if (endDateParam) {
    endDate = new Date(endDateParam);
    if (isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid endDate" },
        { status: 400 }
      );
    }

    endDate.setDate(endDate.getDate() + 1);
    // ✅ END OF DAY
    endDate.setHours(23, 59, 59, 999);
  }

  // -------------------------
  // Sorting
  // -------------------------
  const sortBy = query.get("sortBy")?.trim() ?? "date_desc";

  let orderBy:
    | { date: "asc" | "desc" }
    | { amount: "asc" | "desc" } = { date: "desc" };

  switch (sortBy) {
    case "date_asc":
      orderBy = { date: "asc" };
      break;
    case "date_desc":
      orderBy = { date: "desc" };
      break;
    case "amount_asc":
      orderBy = { amount: "asc" };
      break;
    case "amount_desc":
      orderBy = { amount: "desc" };
      break;
  }

  try {
    // -------------------------
    // Where clause
    // -------------------------
    const whereClause: any = { customerId };

    if (categoryFilter) {
      whereClause.category = categoryFilter;
    }

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = startDate;
      if (endDate) whereClause.date.lte = endDate;
    }

    // -------------------------
    // Total count
    // -------------------------
    const total = await prisma.transaction.count({
      where: whereClause,
    });

    // -------------------------
    // Fetch transactions
    // -------------------------
    const transactionsRaw = await prisma.transaction.findMany({
      where: whereClause,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        categoryMeta: true,
      },
    });

    // -------------------------
    // Format response
    // -------------------------
    const transactions = transactionsRaw.map((t) => ({
      id: t.id,
      date: t.date.toISOString(),
      merchant: t.merchant,
      category: t.category,
      amount: Number(t.amount.toFixed(2)),
      description: t.description,
      paymentMethod: t.paymentMethod
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      icon: t.categoryMeta?.icon ?? null,
      categoryColor: t.categoryMeta?.color ?? null,
    }));

    return NextResponse.json({
      transactions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + transactions.length < total,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
