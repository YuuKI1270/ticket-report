<script setup lang="ts">
// props
const {
  error = false,
  message,
  open = false,
  success = false,
  warning = false,
  onClose,
} = defineProps<{
  message?: string;
  open: boolean;
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  onClose: () => void;
}>();
</script>

<template>
  <dialog :open="open" class="p-2 bg-transparent w-screen h-screen z-50">
    <div
      role="alert"
      class="rounded-xl border border-gray-100 bg-white p-4 w-1/5 mx-auto"
    >
      <div class="flex gap-4 items-center justify-between">
        <div v-if="error" class="flex flex-row space-x-2 items-center">
          <span class="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </span>

          <span v-if="success" class="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>

          <span v-if="warning" class="text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>

          <p class="mt-1 text-sm text-gray-700">
            {{ message ?? "Something went wrong" }}
          </p>
        </div>

        <button
          class="text-gray-500 transition hover:text-gray-600"
          @click="onClose"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </dialog>
</template>

