<template>
  <div
    class="snackbar w-full max-w-[calc(100%-2rem)] md:max-w-[fit-content] inline-flex justify-center items-center gap-14 px-3 py-4 rounded-lg absolute top-4 bottom-auto lg:top-auto lg:bottom-4 left-1/2 -translate-x-1/2 z-50 shadow-lg"
    :class="{
      'bg-gray-200': props.type === 'default',
      'bg-red-400': props.type === 'error',
      'bg-emerald-400': props.type === 'success',
      active: isSnackbarOpen,
    }"
  >
    <span
      :class="{
        'text-gray-50': props.type !== 'default',
        'text-gray-500': props.type === 'default',
      }"
      class="snackbar__text text-sm font-normal leading-5"
      >{{ props.text }}</span
    >
    <button
      class="snackbar__close flex justify-center items-center gap-2 hover:opacity-60"
      @click="closeSnackbar"
    >
      <span
        :class="{
          'text-gray-50': props.type !== 'default',
          'text-gray-500': props.type === 'default',
        }"
        class="text-sm font-normal leading-5 uppercase tracking-wide"
        >Close</span
      >
      <Icon
        class="h-5 w-5"
        aria-hidden="true"
        :class="{
          'text-gray-50': props.type !== 'default',
          'text-gray-400': props.type === 'default',
        }"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, defineExpose } from "vue";

const isSnackbarOpen = ref(false);
const props = defineProps({
  text: {
    type: String,
    default: "Snackbar text",
  },
  type: {
    type: String,
    default: "default",
  },
});
const closeSnackbar = () => {
  isSnackbarOpen.value = false;
};
const openSnackbar = () => {
  isSnackbarOpen.value = true;
  closeSnackbarTimeout();
};
const closeSnackbarTimeout = () => {
  setTimeout(closeSnackbar, 4000);
};
onMounted(() => {
  closeSnackbarTimeout();
});
// Exponer openSnackbar para que pueda ser llamado desde fuera
defineExpose({ openSnackbar });
</script>

<style lang="postcss" scoped>
.snackbar {
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s ease-in-out;
  @apply translate-y-[-1rem] lg:translate-y-4;
}
.snackbar.active {
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease-in-out;
  @apply translate-y-0;
}
</style>
