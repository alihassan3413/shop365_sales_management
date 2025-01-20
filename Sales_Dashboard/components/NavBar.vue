<template>
  <nav class="w-full h-20 bg-white border-b">
    <client-only>
      <div
        v-if="!isAuthenticated"
        class="min-h-full flex justify-center items-center"
      >
        <img
          src="/Shop365.png"
          alt="Shop365"
          class="max-w-24 sm:max-w-36 flex-shrink-0"
        />
      </div>

      <div
        v-else
        class="min-h-full flex justify-between items-center px-6 sm:px-10"
      >
        <div>
          <img
            src="/Shop365.png"
            alt="Shop365"
            class="max-w-20 sm:max-w-36 flex-shrink-0"
          />
        </div>

        <div
          class="text-primary font-inter text-sm sm:text-md md:text-lg font-medium leading-normal"
        >
          SHOP365 Sale
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <div class="hidden sm:block">
            <p
              class="text-primary text-right font-inter text-sm sm:text-base font-medium leading-normal"
            >
              {{ userData?.name || "User" }}
            </p>
            <p
              class="text-[#BDBCBC] text-right font-inter text-xs sm:text-sm font-light leading-normal"
            >
              {{ userData?.role || "Guest" }}
            </p>
          </div>

          <div
            class="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#FFF2AC] flex items-center justify-center"
          >
            <button @click="handleLogout">
              <p
                class="text-primary font-inter text-sm sm:text-md md:text-lg font-medium leading-normal"
              >
                {{ nameInitials }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </client-only>
  </nav>
</template>

<script setup>
import { useAuthStore } from "~/store/useAuthStore";
import { computed, onMounted } from "vue";

const store = useAuthStore();

// Computed properties for reactive state
const isAuthenticated = computed(() => store.isAuthenticated);
const userData = computed(() => store.user);

const nameInitials = computed(() => {
  if (!userData.value?.name) return "U";
  return userData.value.name
    .split(" ")
    .map((n) => n[0])
    .join("");
});

onMounted(() => {
  store.initAuth();
});

const handleLogout = () => {
  store.logout();
};
</script>
