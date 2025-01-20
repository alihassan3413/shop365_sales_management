<!-- components/PopUp/GenerateReportPopup.vue -->
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Generate Sales Report
              </DialogTitle>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700"
                  >Profit Amount</label
                >
                <input
                  type="number"
                  v-model="profitAmount"
                  class="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter profit amount"
                />
              </div>

              <div class="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  class="inline-flex justify-center cursor-pointer rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-[#2A3B52] transition-colors duration-150"
                  @click="generateReport"
                  :disabled="!profitAmount || isLoading"
                >
                  {{ isLoading ? "Generating..." : "Generate Report" }}
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useSales } from "#imports";
import { generatePDF } from "~/server/utils/pdfGenerator";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isOpen"]);
const profitAmount = ref("");
const isLoading = ref(false);
const { sales } = useSales();

const closeModal = () => {
  emit("update:isOpen", false);
  profitAmount.value = "";
};

const calculateTotals = (sales) => {
  return sales.reduce(
    (acc, sale) => {
      acc.totalSales += Number(sale.total_sale) || 0;
      acc.totalBank += Number(sale.bank_sale) || 0;
      acc.totalCardSwipe += Number(sale.card_swipe) || 0;
      acc.totalCash += Number(sale.cash) || 0;
      acc.totalDailyExpenses += Number(sale.daily_expense) || 0;
      acc.totalOtherExpenses += Number(sale.other_expense) || 0;
      acc.totalBillsPaid += Number(sale.bills_paid) || 0;
      acc.pendingBills += Number(sale.pending_payments) || 0;
      return acc;
    },
    {
      totalSales: 0,
      totalBank: 0,
      totalCardSwipe: 0,
      totalCash: 0,
      totalDailyExpenses: 0,
      totalOtherExpenses: 0,
      totalBillsPaid: 0,
      pendingBills: 0,
    }
  );
};

const generateReport = async () => {
  try {
    isLoading.value = true;

    const totals = calculateTotals(sales.value);

    // Calculate card swipe fee (1%)
    const cardSwipeFee = totals.totalCardSwipe * 0.01;

    // Calculate net profit
    const netProfit =
      Number(profitAmount.value) -
      (totals.totalDailyExpenses + totals.totalOtherExpenses + cardSwipeFee);

    const reportData = {
      ...totals,
      profitAmount: Number(profitAmount.value),
      cardSwipeFee,
      netProfit,
      generatedDate: new Date().toLocaleDateString(),
    };

    await generatePDF(reportData);
    closeModal();
  } catch (error) {
    console.error("Error generating report:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
