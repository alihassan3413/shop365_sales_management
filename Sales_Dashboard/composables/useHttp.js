import { ref } from "vue";

export const useHttp = () => {
  const isLoading = ref(false);
  const error = ref(null);

  const request = async (endpoint, options = {}) => {
    isLoading.value = true;
    error.value = null;
    const baseURL = "/api";

    const tokenState = useState("token");
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(tokenState.value && {
          Authorization: `Bearer ${tokenState.value}`,
        }),
      },
    };

    try {
      const response = await $fetch(baseURL + endpoint, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      });

      return response;
    } catch (error) {
      const formattedError = formatError(error);
      error.value = formattedError;
      throw formattedError;
    } finally {
      isLoading.value = false;
    }
  };

  const formatError = (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response._data?.message || error.message;

      return {
        status,
        message: message || formatErrorMessage(status),
        errors: error.response._data?.errors,
      };
    }
    return {
      status: 500,
      message: error.message || "Network error",
    };
  };

  const formatErrorMessage = (status) => {
    switch (status) {
      case 401:
        return "Please Login!!!";
      case 403:
        return "You don't have permission to perform this action";
      case 404:
        return "Resource not found";
      case 422:
        return "Validation error";
      case 500:
        return "Server error. Please try again later.";
      default:
        return "Something went wrong";
    }
  };

  return {
    get: (endpoint, options = {}) =>
      request(endpoint, { ...options, method: "GET" }),
    post: (endpoint, data, options = {}) =>
      request(endpoint, { ...options, method: "POST", body: data }),
    put: (endpoint, data, options = {}) =>
      request(endpoint, { ...options, method: "PUT", body: data }),
    isLoading,
    error,
  };
};
