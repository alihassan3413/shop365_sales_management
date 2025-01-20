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
        <h2 class="text-lg text-gray-800">Today Sale</h2>
        <button
          @click="$emit('update:isOpen', false)"
          class="text-gray-500 hover:text-gray-700"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Error Alert -->
      <div v-if="formError" class="px-6 pt-4">
        <div
          class="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm"
        >
          {{ formError }}
        </div>
      </div>

      <!-- Form -->
      <form class="p-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <div class="text-gray-500 text-sm mb-1">Today Sale *</div>
              <input
                v-model="formData.total_sale"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                :class="{ 'border-red-300': formErrors?.total_sale }"
              />
              <div
                v-if="formErrors?.total_sale"
                class="text-red-500 text-xs mt-1"
              >
                {{ formErrors.total_sale }}
              </div>
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Card Swipe</div>
              <input
                v-model="formData.card_swipe"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Daily Expense</div>
              <input
                v-model="formData.daily_expense"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Daily Expense Notes</div>
              <textarea
                v-model="formData.daily_expense_notes"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Bills Paid</div>
              <input
                v-model="formData.bills_paid"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Paid Bills Details</div>
              <textarea
                v-model="formData.paid_bills_details"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <!-- Difference Display -->
            <div class="md:mt-6">
              <input
                :value="calculateDifference"
                placeholder="Difference= 000,000/-"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
                readonly
              />
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div>
              <div class="text-gray-500 text-sm mb-1">Bank Sale</div>
              <input
                v-model="formData.bank_sale"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Cash</div>
              <input
                v-model="formData.cash"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Other Expense</div>
              <input
                v-model="formData.other_expense"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">Other Expense Notes</div>
              <textarea
                v-model="formData.other_expense_notes"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">
                Other/Pending Payments
              </div>
              <input
                v-model="formData.pending_payments"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <div class="text-gray-500 text-sm mb-1">
                Other/Pending Payments Details
              </div>
              <textarea
                v-model="formData.pending_payments_details"
                class="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-gray-400 resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="md:mt-6">
              <button
                type="submit"
                class="w-full bg-[#1e2736] text-white px-8 py-2 rounded hover:bg-[#283142] font-medium"
                :disabled="isLoading"
              >
                {{ isLoading ? "Submitting..." : "Submit" }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { X } from "lucide-vue-next";
import { useSales } from "../../composables/useSales";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isOpen"]);

// Setup form state and actions
const { createSale, isLoading, error: formError, formErrors } = useSales();

const initialFormState = {
  total_sale: "",
  bank_sale: "",
  card_swipe: "",
  cash: "",
  daily_expense: "",
  daily_expense_notes: "",
  other_expense: "",
  other_expense_notes: "",
  bills_paid: "",
  paid_bills_details: "",
  pending_payments: "",
  pending_payments_details: "",
};

const formData = ref({ ...initialFormState });

// Calculate difference using computed property instead of watch
const calculateDifference = computed(() => {
  const total = Number(formData.value.total_sale) || 0;
  const expenses = [
    "bank_sale",
    "card_swipe",
    "cash",
    "daily_expense",
    "other_expense",
    "bills_paid",
    "pending_payments",
  ].reduce((sum, field) => sum + (Number(formData.value[field]) || 0), 0);

  return String(total - expenses);
});

const resetForm = () => {
  formData.value = { ...initialFormState };
};

const handleSubmit = async () => {
  try {
    const result = await createSale({
      ...formData.value,
      difference: calculateDifference.value,
    });

    if (result) {
      resetForm();
      emit("update:isOpen", false);
    }
  } catch (err) {
    console.error("Form submission error:", err);
  }
};
</script>
