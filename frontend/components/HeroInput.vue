<template>
  <div
    class="hero-input flex gap-8 h-20 justify-between items-center self-stretch border bg-slate-950 shadow-inner pl-10 pr-2 py-2 rounded-full border-solid border-slate-500 font-work"
  >
    <input
      type="text"
      class="bg-transparent w-full border-0 outline-none text-slate-400 text-2xl font-normal leading-normal whitespace-pre-nowrap"
      :placeholder="placeholder"
      v-model='input'
    />
    <HeroButton text="Generate" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
const props = defineProps<{
  placeholder?: string | "Placeholder";
}>();
const input = ref<string>('');
</script>

<style scoped></style>
