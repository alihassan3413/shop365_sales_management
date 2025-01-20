<!-- LoginForm.vue -->
<template>
  <div
    class="w-full max-w-md sm:px-6 md:px-8 mx-auto p-6 rounded-lg shadow-lg bg-white"
  >
    <div class="flex flex-col justify-center items-center mb-6 sm:mb-8">
      <h1 class="font-semibold text-xl sm:text-2xl">Login</h1>
      <p class="text-gray-500 text-sm sm:text-base">
        Please enter your credentials
      </p>
    </div>

    <!-- Error Alert -->
    <div
      v-if="globalError"
      class="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
    >
      {{ globalError }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="relative mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1"
          >Phone Number</label
        >
        <div class="relative">
          <UserRound
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4"
          />
          <input
            v-model="form.phone_no"
            type="text"
            id="number"
            class="w-full pl-10 pr-4 py-2 border text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Phone Number"
            :class="{ 'border-red-500': errors.phone_no }"
          />
        </div>
        <span v-if="errors.phone_no" class="text-red-500 text-xs mt-1">{{
          errors.phone_no
        }}</span>
      </div>

      <div class="relative mb-6 sm:mb-8">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Password</label
        >
        <div class="relative">
          <Lock
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4"
          />
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="Enter your password"
            class="w-full pl-10 pr-4 py-2 border text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.password }"
          />
        </div>
        <span v-if="errors.password" class="text-red-500 text-xs mt-1">{{
          errors.password
        }}</span>
      </div>

      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-[#334155] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { UserRound, Lock } from "lucide-vue-next";
import { reactive } from "vue";
import { useAuthStore } from "~/store/useAuthStore";

const form = reactive({
  phone_no: "",
  password: "",
});

const { login, errors, globalError, isLoading } = useAuthStore();

const handleSubmit = async () => {
  const success = await login(form);
  if (success) {
    console.log("Login successful");
  }
};
</script>
