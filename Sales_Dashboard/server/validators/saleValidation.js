import { z } from "zod";

export const saleValidation = z.object({
  total_sale: z.string().regex(/^\d*\.?\d*$/, "Must be a valid number"),
  bank_sale: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
  card_swipe: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
  cash: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
  daily_expense: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
  other_expense: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
  bills_paid: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
  daily_expense_notes: z.string().optional(),
  other_expense_notes: z.string().optional(),
  paid_bills_details: z.string().optional(),
  pending_payments: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
  pending_payments_details: z.string().optional(),
  difference: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid number")
    .optional(),
});
