<template>
  <button
    :class="[
      `bg-${color}`,
      `border-${color}`,
      selected ? '!bg-slate-50 !border-slate-50 ring-1 ring-corporate-500' : 'bg-corporate-500',
    ]"
    class="w-fit flex items-start gap-2 px-2 py-0.5 rounded-full text-xs font-normal leading-4 hover:opacity-80 transition-opacity duration-150"
  >
    <span class="text-black/80">{{ text }}</span>
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
    color: "corporate-500",
    selected: false,
  }
);
</script>

<style scoped></style>
