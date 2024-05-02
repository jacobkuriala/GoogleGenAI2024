<template>
  <button
    :class="[
      color,
      selected ? '!bg-slate-50 !border-slate-50 ring-4 ring-corporate-400' : '',
    ]"
    class="w-fit flex items-start gap-2 px-2 py-0.5 rounded-full text-base font-normal  hover:opacity-80 transition-opacity duration-150 bg-corporate-500"
  >
    <span class="text-black/80 capitalize opacity-80">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string;
    color?: string;
    selected?: boolean | null;
  }>(),
  {
    text: "Custom",
    color: "bg-corporate-500",
    selected: false,
  }
);
</script>

<style scoped></style>
