<template>
  <div
    class="max-w-full min-h-24 bg-white flex justify-between items-center px-6 sm:px-10"
  >
    <div>
      <p class="text-[#1E293B] text-2xl font-medium leading-normal">
        Sale Details
      </p>
    </div>
    <div class="flex justify-center items-center gap-3">
      <button
        class="px-6 py-3 border text-[#1E293B] border-[#1E293B] rounded flex justify-center items-center gap-3 transition-transform duration-300 ease-in-out transform hover:scale-105"
        @click="openDateFilter"
      >
        <Filter class="w-5 h-5" />
        <span class="hidden sm:block">{{ dateFilterLabel }}</span>
      </button>
      <button
        class="px-6 py-3 text-white bg-[#1E293B] rounded flex justify-center items-center gap-3 transition-transform duration-300 ease-in-out transform hover:scale-105"
        @click="openCreateSalePopup"
      >
        <Plus class="w-5 h-5" />
        <span class="hidden sm:block">Create Today Sale</span>
      </button>
      <button
        v-if="user.role == Role.ADMIN"
        class="px-6 py-3 border text-[#1E293B] border-[#1E293B] rounded flex justify-center items-center gap-3 transition-transform duration-300 ease-in-out transform hover:scale-105"
        @click="openReportPopup"
      >
        <ClipboardPlus class="w-5 h-5" />
        <span class="hidden sm:block">Generate Report</span>
      </button>
    </div>
    <CreateSalePopUp
      :isOpen="isPopupOpen"
      @update:isOpen="isPopupOpen = $event"
    />
    <DateFilterPopup
      :isOpen="isDateFilterOpen"
      @update:isOpen="isDateFilterOpen = $event"
      @apply-filter="applyDateFilter"
    />
    <GenerateReport
      :isOpen="isReportPopupOpen"
      @update:isOpen="isReportPopupOpen = $event"
    />
  </div>
</template>

<script setup>
import { Plus, Filter } from "lucide-vue-next";
import CreateSalePopUp from "../components/PopUp/CreateSalePopUp.vue";
import DateFilterPopup from "../components/PopUp/DateFilterPopup.vue";
import GenerateReport from "../components/PopUp/GenerateReport.vue";
import { ref, computed } from "vue";
import { useSales } from "#imports";
import { format, parseISO } from "date-fns";
import { useAuthStore } from "~/store/useAuthStore";
import { Role } from "@prisma/client";

const isPopupOpen = ref(false);
const isDateFilterOpen = ref(false);
const isReportPopupOpen = ref(false);
const startDate = ref("");
const endDate = ref("");
const { fetchSales } = useSales();
const { user } = useAuthStore();

const formatDate = (date) => {
  if (!date) return "";
  try {
    return format(parseISO(date), "yyyy-MM-dd");
  } catch (error) {
    console.error("Date parsing error:", error);
    return "";
  }
};

const openReportPopup = () => {
  isReportPopupOpen.value = true;
};

const dateFilterLabel = computed(() => {
  if (startDate.value && endDate.value) {
    try {
      return `${format(parseISO(startDate.value), "MMM d, yyyy")} - ${format(
        parseISO(endDate.value),
        "MMM d, yyyy"
      )}`;
    } catch (error) {
      return "This Month";
    }
  }
  return "This Month";
});

const openCreateSalePopup = () => {
  isPopupOpen.value = true;
};

const openDateFilter = () => {
  isDateFilterOpen.value = true;
};

const applyDateFilter = async (start, end) => {
  startDate.value = start;
  endDate.value = end;

  // Format dates before sending to API
  const formattedStart = formatDate(start);
  const formattedEnd = formatDate(end);

  if (formattedStart && formattedEnd) {
    await fetchSales(formattedStart, formattedEnd);
  }

  isDateFilterOpen.value = false;
};
</script>
