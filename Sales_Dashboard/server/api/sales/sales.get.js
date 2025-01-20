import { parseISO, isValid, endOfDay, startOfDay } from "date-fns";
import db from "../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const { start_date, end_date } = getQuery(event);

    let queryFilters = {};

    if (!start_date || !end_date) {
      // Default to current month
      const firstDayOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      const currentDay = new Date();

      queryFilters.createdAt = {
        gte: startOfDay(firstDayOfMonth),
        lte: endOfDay(currentDay),
      };
    } else {
      const parsedStartDate = parseISO(start_date);
      const parsedEndDate = parseISO(end_date);

      if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
        throw new Error("Invalid date format");
      }

      queryFilters.createdAt = {
        gte: startOfDay(parsedStartDate),
        lte: endOfDay(parsedEndDate),
      };
    }

    const sales = await db.sale.findMany({
      where: queryFilters,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "Sales fetched successfully",
      data: sales,
    };
  } catch (error) {
    console.error("Error fetching sales:", error);
    return {
      statusCode: 500,
      body: {
        success: false,
        message: "An unexpected error occurred while fetching sales",
        errors: error.message,
      },
    };
  }
});
