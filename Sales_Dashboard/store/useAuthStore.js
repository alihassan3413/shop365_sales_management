import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const http = useHttp(); // Assuming you have the HTTP composable

  const token = ref(localStorage.getItem("auth-token") || null);
  const user = ref(JSON.parse(localStorage.getItem("auth-user")) || null);
  const globalError = ref(null);
  const isLoading = ref(false);
  const errors = ref({});

  const initAuth = () => {
    token.value = localStorage.getItem("auth-token") || null;

    try {
      user.value = JSON.parse(localStorage.getItem("auth-user")) || null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      user.value = null;
      localStorage.removeItem("auth-user"); // Optionally clear corrupted data
    }
  };

  const clearAuth = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    token.value = null;
    user.value = null;
  };

  const validateForm = (credentials) => {
    const validationErrors = {};
    if (!credentials.phone_no) {
      validationErrors.phone_no = "Phone number is required";
    } else if (!/^\d{11}$/.test(credentials.phone_no)) {
      validationErrors.phone_no = "Invalid phone number format";
    }

    if (!credentials.password) {
      validationErrors.password = "Password is required";
    }

    return {
      isValid: Object.keys(validationErrors).length === 0,
      validationErrors,
    };
  };

  const login = async (credentials) => {
    try {
      isLoading.value = true;
      errors.value = {};
      globalError.value = null;

      const { isValid, validationErrors } = validateForm(credentials);
      if (!isValid) {
        errors.value = validationErrors;
        return false;
      }

      const response = await http.post("/login", credentials);

      if (response.token) {
        localStorage.setItem("auth-token", response.token);
        localStorage.setItem("auth-user", JSON.stringify(response.user));

        token.value = response.token;
        user.value = response.user;

        await router.push("/dashboard");
        return true;
      }

      globalError.value = "Login failed";
      return false;
    } catch (error) {
      errors.value = error.errors || {};
      globalError.value = error.message || "An error occurred";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await http.post("/logout");
      clearAuth();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      clearAuth();
      router.push("/login");
    }
  };

  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value;
  });

  initAuth();

  return {
    user,
    errors,
    globalError,
    isLoading,
    isAuthenticated,
    login,
    logout,
    initAuth,
  };
});
