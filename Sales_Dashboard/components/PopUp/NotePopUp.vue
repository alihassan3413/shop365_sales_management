<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog
      as="div"
      @close="$emit('update:isOpen', false)"
      class="relative z-50"
      :open="isOpen"
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
                {{ title }}
              </DialogTitle>

              <div class="mt-4">
                <p class="text-sm text-gray-600">
                  {{ note || "No notes available." }}
                </p>
              </div>

              <div class="mt-6 flex justify-end">
                <button
                  type="button"
                  class="px-4 py-2 bg-[#1E293B] text-white rounded hover:bg-[#2A3B52] transition-colors duration-150"
                  @click="$emit('update:isOpen', false)"
                >
                  Close
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
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "Notes",
  },
});

defineEmits(["update:isOpen"]);
</script>
