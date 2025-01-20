import * as lucideIcons from "lucide-vue-next";

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(lucideIcons).forEach(([iconName, iconComponent]) => {
    nuxtApp.vueApp.component(iconName, iconComponent);
  });
});
