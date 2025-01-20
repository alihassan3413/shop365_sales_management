-- CreateTable
CREATE TABLE "Sale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total_sale" TEXT NOT NULL,
    "bank_sale" TEXT,
    "card_swipe" TEXT,
    "cash" TEXT,
    "daily_expense" TEXT,
    "other_expense" TEXT,
    "bills_paid" TEXT,
    "daily_expense_notes" TEXT,
    "other_expense_notes" TEXT,
    "paid_bills_details" TEXT,
    "pending_payments" TEXT,
    "pending_payments_details" TEXT,
    "difference" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
