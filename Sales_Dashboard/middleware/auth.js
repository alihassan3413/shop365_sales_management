import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    authStore.initAuth();
  }

  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }
});
