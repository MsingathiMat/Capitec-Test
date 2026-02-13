

type SimpleSizes = "small" | "medium" | "large" | undefined

type Period = "7d" | "30d" | "90d" | "1y"

type SpendingSummary = {
    period: Period,
    totalSpent: number,
    transactionCount: number,
    averageTransaction: number,
    topCategory: string,
    comparedToPrevious: {
        spentChange: number,
        transactionChange: number
    }
}

type SpendingGoals = {
    id: string,
    category: string,
    monthlyBudget: number,
    currentSpent: number,
    percentageUsed: number,
    daysRemaining: number,
    status: string
}




type Transaction = {
    id: string;
    date: string;
    merchant: string;
    category: string;
    amount: number;
    description: string;
    paymentMethod: "CREDIT CARD" | "DEBIT CARD" | "DEBIT ORDER" | string;
    icon: string;
    categoryColor: string; // HEX color code
};

type Pagination = {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
};

type TransactionsResponse = {
    transactions: Transaction[];
    pagination: Pagination;
};



type Category = {
    amount: number
    name: string,
    color: string,
    icon: string
}

type MonthlyTrend = {
    averageTransaction:number,
    month:string,
    totalSpent:number,
    transactionCount:number
}