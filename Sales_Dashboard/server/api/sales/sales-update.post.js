import db from "../../utils/db";
import { saleValidation } from "~/server/validators/saleValidation";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const saleExists = await db.sale.findUnique({
      where: { id: body.id },
    });

    if (!saleExists) {
      return {
        statusCode: 404,
        success: false,
        message: "Sale not found",
      };
    }

    const validationResult = saleValidation.partial().safeParse(body);

    if (!validationResult.success) {
      return {
        statusCode: 403,
        success: false,
        message: "Validation failed",
        errors: validationResult.error.format(),
      };
    }

    const data = Object.entries(validationResult.data).reduce(
      (acc, [key, value]) => {
        acc[key] =
          value !== null && value !== undefined ? String(value) : value;
        return acc;
      },
      {}
    );

    const updateSale = await db.sale.update({
      where: { id: body.id },
      data,
    });

    return {
      statusCode: 200,
      success: true,
      message: "Sale updated successfully",
      data: updateSale,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    };
  }
});
