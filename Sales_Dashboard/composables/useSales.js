import { useHttp } from "#imports";
import { saleValidation } from "~/server/validators/saleValidation";

export const useSales = () => {
  const http = useHttp();
  const sales = useState("sales", () => []);
  const isLoading = useState("isLoading", () => false);
  const error = useState("error", () => null);
  const formErrors = useState("formErrors", () => ({}));

  const clearErrors = () => {
    error.value = null;
    formErrors.value = {};
  };

  const fetchSales = async (start_date = null, end_date = null) => {
    isLoading.value = true;
    clearErrors();
    try {
      const queryParams = new URLSearchParams();
      if (start_date) queryParams.append("start_date", start_date);
      if (end_date) queryParams.append("end_date", end_date);

      const queryString = queryParams.toString();
      const url = `/sales${queryString ? `?${queryString}` : ""}`;

      const response = await http.get(url);

      sales.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch sales";
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  const createSale = async (formData) => {
    isLoading.value = true;
    clearErrors();

    try {
      // Prepare form data for validation
      const formDataToValidate = {
        ...formData,
        total_sale: String(formData.total_sale),
        bank_sale: formData.bank_sale ? String(formData.bank_sale) : undefined,
        card_swipe: formData.card_swipe
          ? String(formData.card_swipe)
          : undefined,
        cash: formData.cash ? String(formData.cash) : undefined,
        daily_expense: formData.daily_expense
          ? String(formData.daily_expense)
          : undefined,
        other_expense: formData.other_expense
          ? String(formData.other_expense)
          : undefined,
        bills_paid: formData.bills_paid
          ? String(formData.bills_paid)
          : undefined,
        pending_payments: formData.pending_payments
          ? String(formData.pending_payments)
          : undefined,
        difference: formData.difference
          ? String(formData.difference)
          : undefined,
      };

      // Validate form data
      saleValidation.parse(formDataToValidate);

      // Submit to API
      const response = await http.post("/sales", formDataToValidate);
      sales.value.push(response.data);

      return response.data;
    } catch (err) {
      if (err.errors) {
        // Handle Zod validation errors
        const validationErrors = {};
        err.errors.forEach((error) => {
          validationErrors[error.path[0]] = error.message;
        });
        formErrors.value = validationErrors;
        error.value = "Please check the form for errors";
      } else {
        // Handle API or other errors
        error.value = err.message || "Failed to create sale";
      }
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  const updateSale = async (formData, id) => {
    isLoading.value = true;
    clearErrors();

    try {
      // Prepare form data for validation, similar to createSale
      const formDataToValidate = {
        ...formData,
        total_sale: String(formData.total_sale),
        bank_sale: formData.bank_sale ? String(formData.bank_sale) : undefined,
        card_swipe: formData.card_swipe
          ? String(formData.card_swipe)
          : undefined,
        cash: formData.cash ? String(formData.cash) : undefined,
        daily_expense: formData.daily_expense
          ? String(formData.daily_expense)
          : undefined,
        other_expense: formData.other_expense
          ? String(formData.other_expense)
          : undefined,
        bills_paid: formData.bills_paid
          ? String(formData.bills_paid)
          : undefined,
        pending_payments: formData.pending_payments
          ? String(formData.pending_payments)
          : undefined,
        difference: formData.difference
          ? String(formData.difference)
          : undefined,
      };

      // Validate form data
      saleValidation.parse(formDataToValidate);

      // Submit to API
      const response = await http.put(`/sales/${id}`, formDataToValidate);

      const saleIndex = sales.value.findIndex(
        (sale) => sale.id === formData.id
      );
      if (saleIndex !== -1) {
        sales.value[saleIndex] = response.data;
      }

      return response.data;
    } catch (err) {
      if (err.errors) {
        const validationErrors = {};
        err.errors.forEach((error) => {
          validationErrors[error.path[0]] = error.message;
        });
        formErrors.value = validationErrors;
        error.value = "Please check the form for errors";
      } else {
        // Handle API or other errors
        error.value = err.message || "Failed to update sale";
      }
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchSales,
    createSale,
    isLoading,
    error,
    formErrors,
    updateSale,
    sales,
    clearErrors,
  };
};
