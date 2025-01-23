import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const http = useHttp(); // Assuming you have the HTTP composable

  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 7,
    secure: true,
    sameSite: "strict",
  };

  const token = ref(null);
  const user = ref(null);
  const globalError = ref(null);
  const isLoading = ref(false);
  const errors = ref({});

  const initAuth = () => {
    const authToken = useCookie("auth-token", cookieOptions);
    const userCookie = useCookie("auth-user", cookieOptions);

    token.value = authToken.value || null;

    try {
      user.value = userCookie.value ? JSON.parse(userCookie.value) : null;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      user.value = null;
      // Optional: Clear the invalid cookie
      const userCookieObj = useCookie("auth-user", cookieOptions);
      userCookieObj.value = null;
    }
  };

  const clearAuth = () => {
    const authToken = useCookie("auth-token", cookieOptions);
    const userCookie = useCookie("auth-user", cookieOptions);

    authToken.value = null;
    userCookie.value = null;
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
        const authToken = useCookie("auth-token", cookieOptions);
        const userCookie = useCookie("auth-user", cookieOptions);

        authToken.value = response.token;
        userCookie.value = JSON.stringify(response.user);

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
