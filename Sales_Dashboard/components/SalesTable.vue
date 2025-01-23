<template>
  <div class="w-full flex flex-col">
    <div class="w-full overflow-x-auto px-6 sm:px-10 mb-16">
      <div class="min-w-[1000px]">
        <table class="w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                Date
              </th>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                Total Sale
              </th>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                UBL Bank
              </th>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                Card Swipe
              </th>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                Cash
              </th>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                Daily Expense
              </th>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                Other Expenses
              </th>
              <th class="py-4 px-4 text-left text-sm text-gray-600 font-medium">
                Bills Paid
              </th>
              <th
                class="py-4 px-4 text-left text-sm text-gray-600 font-medium"
              ></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-if="salesData.length !== 0"
              v-for="(sale, index) in salesData"
              :key="index"
              class="bg-white text-primary rounded hover:bg-gray-50 transition-colors duration-150 shadow-sm"
            >
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y first:border-l last:border-r border-gray-200"
              >
                {{ formatDate(sale.created_at) }}
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-gray-200"
              >
                {{ formatCurrency(sale.total_sale) }}
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-gray-200"
              >
                {{ formatCurrency(sale.bank_sale) }}
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-gray-200"
              >
                {{ formatCurrency(sale.card_swipe) }}
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-gray-200"
              >
                {{ formatCurrency(sale.cash) }}
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-gray-200"
              >
                <div class="flex items-center gap-2">
                  {{ formatCurrency(sale.daily_expense) }}
                  <button
                    class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
                    @click="
                      handleNoteView(
                        'Daily Expense Notes',
                        sale.daily_expense_notes,
                        index
                      )
                    "
                  >
                    <EyeIcon class="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-gray-200"
              >
                <div class="flex items-center gap-2">
                  {{ formatCurrency(sale.other_expense) }}
                  <button
                    class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
                    @click="
                      handleNoteView(
                        'Other Expense Notes',
                        sale.other_expense_notes,
                        index
                      )
                    "
                  >
                    <Eye class="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-gray-200"
              >
                <div class="flex items-center gap-2">
                  {{ formatCurrency(sale.bills_paid) }}
                  <button
                    class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
                    @click="
                      handleNoteView(
                        'Bills Paid Details',
                        sale.paid_bills_details,
                        index
                      )
                    "
                  >
                    <Eye class="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </td>
              <td
                class="py-4 px-4 text-sm text-gray-600 border-y border-r border-gray-200"
              >
                <button
                  class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
                  @click="openEditModal(sale)"
                >
                  <PencilIcon class="h-4 w-4 text-gray-600" />
                </button>
              </td>
            </tr>

            <tr v-else>
              <td colspan="9">
                <div
                  class="flex flex-col items-center justify-center py-16 px-4"
                >
                  <div class="bg-gray-50 rounded-full p-6 mb-4">
                    <SearchX class="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">
                    No sales found
                  </h3>
                  <p class="text-sm text-gray-500 text-center max-w-md mb-4">
                    No sales data is available for the selected time period. Try
                    adjusting your date filter or create a new sale.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="fixed bottom-6 left-0 right-0">
          <div class="overflow-x-auto px-6 sm:px-10">
            <div class="min-w-[1000px]">
              <table class="w-full">
                <tfoot>
                  <tr class="bg-[#1E293B] text-white">
                    <td class="py-4 px-4 text-sm font-medium rounded-l-lg">
                      Total:
                    </td>
                    <td class="py-4 px-4 text-sm font-medium">
                      {{ formatCurrency(totals.total_sale) }}
                    </td>
                    <td class="py-4 px-4 text-sm font-medium">
                      {{ formatCurrency(totals.bank_sale) }}
                    </td>
                    <td class="py-4 px-4 text-sm font-medium">
                      {{ formatCurrency(totals.cardSwipe) }}
                    </td>
                    <td class="py-4 px-4 text-sm font-medium">
                      {{ formatCurrency(totals.cash) }}
                    </td>
                    <td class="py-4 px-4 text-sm font-medium">
                      {{ formatCurrency(totals.dailyExpense) }}
                    </td>
                    <td class="py-4 px-4 text-sm font-medium">
                      {{ formatCurrency(totals.otherExpenses) }}
                    </td>
                    <td class="py-4 px-4 text-sm font-medium">
                      {{ formatCurrency(totals.billsPaid) }}
                    </td>
                    <td class="py-4 px-4 rounded-r-lg"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NotePopUp
      :isOpen="isNotePopupOpen"
      :note="currentNote"
      :title="noteTitle"
      @update:isOpen="isNotePopupOpen = $event"
    />

    <UpdateSalesPopUp
      v-model:isOpen="isEditModalOpen"
      :sale-data="selectedSale"
      @update:sale="handleSaleUpdate"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { MoreVerticalIcon, PencilIcon, Eye } from "lucide-vue-next";
import { useSales } from "#imports";
import NotePopUp from "./PopUp/NotePopUp.vue";
import UpdateSalesPopUp from "./PopUp/UpdateSalesPopUp.vue";

const { fetchSales, sales, isLoading, error } = useSales();

// Sample data structure
const salesData = sales;
const isNotePopupOpen = ref(false);
const isEditModalOpen = ref(false);
const currentNote = ref("");
const noteTitle = ref("");
const selectedSale = ref(null);

const totals = computed(() => {
  return {
    total_sale: salesData.value.reduce(
      (sum, sale) => sum + parseFloat(sale.total_sale || 0),
      0
    ),
    bank_sale: salesData.value.reduce(
      (sum, sale) => sum + parseFloat(sale.bank_sale || 0),
      0
    ),
    cardSwipe: salesData.value.reduce(
      (sum, sale) => sum + parseFloat(sale.card_swipe || 0),
      0
    ),
    cash: salesData.value.reduce(
      (sum, sale) => sum + parseFloat(sale.cash || 0),
      0
    ),
    dailyExpense: salesData.value.reduce(
      (sum, sale) => sum + parseFloat(sale.daily_expense || 0),
      0
    ),
    otherExpenses: salesData.value.reduce(
      (sum, sale) => sum + parseFloat(sale.other_expense || 0),
      0
    ),
    billsPaid: salesData.value.reduce(
      (sum, sale) => sum + parseFloat(sale.bills_paid || 0),
      0
    ),
  };
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const handleNoteView = (title, note, index) => {
  noteTitle.value = title;
  currentNote.value = note;
  isNotePopupOpen.value = true;
};

const openEditModal = (sale) => {
  selectedSale.value = {
    todaySale: sale.total_sale,
    ublBank: sale.bank_sale,
    cardSwipe: sale.card_swipe,
    cash: sale.cash,
    dailyExpense: sale.daily_expense,
    dailyExpenseNotes: sale.daily_expense_notes,
    otherExpense: sale.other_expense,
    otherExpenseNotes: sale.other_expense_notes,
    paidBillsAmount: sale.bills_paid,
    paidBillsDetails: sale.paid_bills_details,
    pendingPayments: sale.pending_payments || "",
    pendingPaymentsDetails: sale.pending_payments_details || "",
    date: formatDate(sale.created_at),
    difference: sale.difference,
    id: sale.id,
  };
  isEditModalOpen.value = true;
};

const handleSaleUpdate = async (updatedSale) => {
  try {
    await fetchSales();
    isEditModalOpen.value = false;
  } catch (error) {
    console.error("Error updating sale:", error);
  }
};

onMounted(async () => {
  await fetchSales();
});
</script>
