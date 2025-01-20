import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // Cookie options with proper SameSite configuration
  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true, // Ensure cookie is only sent over HTTPS
    sameSite: "strict", // Strict same-site policy
  };

  // Initialize reactive refs for auth state
  const token = ref(null);
  const user = ref(null);
  const globalError = ref(null);
  const isLoading = ref(false);
  const errors = ref({});

  // Initialize auth state from cookies
  const initAuth = () => {
    const authToken = useCookie("auth-token", cookieOptions);
    const userCookie = useCookie("auth-user", cookieOptions);

    if (authToken.value) {
      token.value = authToken.value;
    }

    if (userCookie.value) {
      try {
        user.value =
          typeof userCookie.value === "string"
            ? JSON.parse(userCookie.value)
            : userCookie.value;
      } catch (e) {
        console.error("Error parsing user cookie:", e);
        clearAuth();
      }
    }
  };

  // Clear all auth state and cookies
  const clearAuth = () => {
    const authToken = useCookie("auth-token", cookieOptions);
    const userCookie = useCookie("auth-user", cookieOptions);

    // Clear cookies
    authToken.value = null;
    userCookie.value = null;

    // Clear reactive state
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
    } else if (credentials.password.length < 4) {
      validationErrors.password = "Password must be at least 4 characters";
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

      const { data } = await useFetch("/api/auth/login", {
        method: "POST",
        body: credentials,
      });

      if (data.value) {
        // Set cookies with proper options
        const authToken = useCookie("auth-token", cookieOptions);
        const userCookie = useCookie("auth-user", cookieOptions);

        authToken.value = data.value.token;
        userCookie.value = JSON.stringify(data.value.user);

        // Update reactive state
        token.value = data.value.token;
        user.value = data.value.user;

        await router.push("/dashboard");
        return true;
      }

      globalError.value = "Login failed";
      return false;
    } catch (error) {
      if (error.data?.errors) {
        errors.value = error.data.errors;
      }
      globalError.value = error.message || "An error occurred";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    clearAuth();
    router.push("/login");
  };

  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value;
  });

  // Initialize auth state when store is created
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
