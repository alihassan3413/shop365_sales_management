<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog
      as="div"
      @close="$emit('update:isOpen', false)"
      class="relative z-50"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
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
              class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium text-gray-900 mb-4"
              >
                Filter Sales by Date
              </DialogTitle>

              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Start Date</label
                  >
                  <input
                    type="date"
                    v-model="localStartDate"
                    class="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700"
                    >End Date</label
                  >
                  <input
                    type="date"
                    v-model="localEndDate"
                    class="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
                  />
                </div>

                <div class="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    class="px-4 py-2 border rounded hover:bg-gray-50 transition-colors duration-150"
                    @click="$emit('update:isOpen', false)"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 bg-[#1E293B] text-white rounded hover:bg-[#2A3B52] transition-colors duration-150"
                    @click="applyFilter"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isOpen", "apply-filter"]);

const localStartDate = ref("");
const localEndDate = ref("");

const applyFilter = () => {
  emit("apply-filter", localStartDate.value, localEndDate.value);
};

// Reset dates when popup is opened
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      localStartDate.value = "";
      localEndDate.value = "";
    }
  }
);
</script>
