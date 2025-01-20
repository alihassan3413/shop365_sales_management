import db from "../../utils/db";
import { saleValidation } from "~/server/validators/saleValidation";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate the input data
    const validationResult = saleValidation.safeParse(body);
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.errors,
        },
      };
    }

    const {
      total_sale,
      bank_sale,
      card_swipe,
      cash,
      daily_expense,
      other_expense,
      bills_paid,
      daily_expense_notes,
      other_expense_notes,
      paid_bills_details,
      pending_payments,
      pending_payments_details,
      difference,
    } = body;

    // Create the sale entry in the database
    const sale = await db.sale.create({
      data: {
        total_sale,
        bank_sale,
        card_swipe,
        cash,
        daily_expense,
        other_expense,
        bills_paid,
        daily_expense_notes,
        other_expense_notes,
        paid_bills_details,
        pending_payments,
        pending_payments_details,
        difference,
      },
    });

    console.log("Created Sale: ", sale);
    // Return a success response with the created data
    return {
      statusCode: 200,
      success: true,
      message: "Sale created successfully",
      data: sale,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {
        success: false,
        message: "An unexpected error occurred",
        errors: null,
      },
    };
  }
});
