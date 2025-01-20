<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500/50 flex justify-center items-start sm:items-center z-50 overflow-y-auto"
  >
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg my-4">
      <!-- Header -->
      <div
        class="sticky top-0 flex justify-between items-center px-6 py-4 bg-gray-50 rounded-t-lg border-b z-10"
      >
        <h2 class="text-lg text-gray-800">Update Sale</h2>
        <h2 class="text-lg text-gray-800">Date: {{ saleData?.date }}</h2>
        <button
          @click="$emit('update:isOpen', false)"
          class="text-gray-500 hover:text-gray-700"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-50 text-red-600 p-4 mx-6 mt-4 rounded">
        {{ error }}
      </div>

      <!-- Form -->
      <form class="p-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <div class="text-gray-500 text-sm mb-1">Today Sale</div>
              <input
                v-model="formData.todaySale"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                :class="{ 'border-red-500': formErrors['total_sale'] }"
              />
              <span
                v-if="formErrors['total_sale']"
                class="text-red-500 text-sm"
              >
                {{ formErrors["total_sale"] }}
              </span>
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Card Swipe</div>
              <input
                v-model="formData.cardSwipe"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                :class="{ 'border-red-500': formErrors['card_swipe'] }"
              />
              <span
                v-if="formErrors['card_swipe']"
                class="text-red-500 text-sm"
              >
                {{ formErrors["card_swipe"] }}
              </span>
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Daily Expense</div>
              <input
                v-model="formData.dailyExpense"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                :class="{ 'border-red-500': formErrors['daily_expense'] }"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Daily Expense Notes</div>
              <textarea
                v-model="formData.dailyExpenseNotes"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Paid Bills Amount</div>
              <input
                v-model="formData.paidBillsAmount"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">
                Paid Bills Amount Details
              </div>
              <textarea
                v-model="formData.paidBillsDetails"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <div class="md:mt-6">
              <input
                v-model="computedDifference"
                placeholder="Difference= 000,000/-"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                readonly
              />
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div>
              <div class="text-gray-500 text-sm mb-1">UBL Bank</div>
              <input
                v-model="formData.ublBank"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                :class="{ 'border-red-500': formErrors['bank_sale'] }"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Cash</div>
              <input
                v-model="formData.cash"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                :class="{ 'border-red-500': formErrors['cash'] }"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Other Expense</div>
              <input
                v-model="formData.otherExpense"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Other Expense Notes</div>
              <textarea
                v-model="formData.otherExpenseNotes"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">
                Other/Pending Payments
              </div>
              <input
                v-model="formData.pendingPayments"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">
                Other/Pending Payments Details
              </div>
              <textarea
                v-model="formData.pendingPaymentsDetails"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <div class="md:mt-6">
              <button
                type="submit"
                class="w-full bg-[#1e2736] text-white px-8 py-2 rounded hover:bg-[#283142] font-medium disabled:opacity-50"
                :disabled="isLoading"
              >
                {{ isLoading ? "Updating..." : "Update Sale" }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { X } from "lucide-vue-next";
import { useSales } from "#imports";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  saleData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:isOpen", "saleUpdated"]);

const { updateSale, isLoading, error, formErrors } = useSales();

// Create a local copy of the sale data
const formData = ref({
  id: "",
  todaySale: "",
  cardSwipe: "",
  dailyExpense: "",
  dailyExpenseNotes: "",
  paidBillsAmount: "",
  paidBillsDetails: "",
  ublBank: "",
  cash: "",
  otherExpense: "",
  otherExpenseNotes: "",
  pendingPayments: "",
  pendingPaymentsDetails: "",
});

// Watch for changes in props.saleData
watch(
  () => props.saleData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData };
    }
  },
  { deep: true, immediate: true }
);

const computedDifference = computed(() => {
  const total = Number(formData.value.todaySale) || 0;
  const expenses =
    (Number(formData.value.ublBank) || 0) +
    (Number(formData.value.cardSwipe) || 0) +
    (Number(formData.value.cash) || 0) +
    (Number(formData.value.dailyExpense) || 0) +
    (Number(formData.value.otherExpense) || 0) +
    (Number(formData.value.paidBillsAmount) || 0) +
    (Number(formData.value.pendingPayments) || 0);

  return `${total - expenses}`;
});

const handleSubmit = async () => {
  try {
    const dataToUpdate = {
      id: formData.value.id,
      total_sale: formData.value.todaySale,
      bank_sale: formData.value.ublBank,
      card_swipe: formData.value.cardSwipe,
      cash: formData.value.cash,
      daily_expense: formData.value.dailyExpense,
      daily_expense_notes: formData.value.dailyExpenseNotes,
      other_expense: formData.value.otherExpense,
      other_expense_notes: formData.value.otherExpenseNotes,
      bills_paid: formData.value.paidBillsAmount,
      bills_paid_details: formData.value.paidBillsDetails,
      pending_payments: formData.value.pendingPayments,
      pending_payments_details: formData.value.pendingPaymentsDetails,
      difference: computedDifference.value,
    };

    const updatedSale = await updateSale(dataToUpdate);
    emit("saleUpdated", updatedSale);
    emit("update:isOpen", false);
  } catch (err) {
    console.error("Failed to update sale:", err);
  }
};
</script>
