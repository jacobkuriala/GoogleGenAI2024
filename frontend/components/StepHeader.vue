<template>
  <header
    class="step-header flex flex-col items-start gap-2 self-stretch pb-2 px-4 mb-4"
  >
    <div
      class="step__heading flex items-center gap-4 self-stretch pl-0 pr-2 pt-1 pb-2"
    >
      <div
        class="step__number flex w-10 h-10 flex-col justify-center items-center gap-2 bg-corporate-500 p-2 rounded-lg"
      >
        <span class="text-white text-center text-lg font-semibold leading-6">{{
          step.index
        }}</span>
      </div>
      <div
        class="step__text flex flex-col justify-center items-start flex-[1_0_0] "
      >
        <h2 class="text-slate-300 text-xl font-medium">Step {{step.index}}: {{ step.title }}</h2>
        <p class="text-slate-500 text-sm font-normal leading-5 max-w-[36ch]">
        {{ step.description }}
        </p>
      </div>
    </div>
    <div class="step__progress flex flex-col items-start gap-2 self-stretch">
      <div
        class="step__progress-bar flex flex-col items-start gap-2 self-stretch bg-slate-600 rounded-3xl overflow-hidden"
      >
        <span
          :class="`step__progress-bar__head bg-corporate-500 h-1`"
          :style="`width: ${step.index / totalSteps * 100 || 2}%`"
        ></span>
      </div>
      <div class="step__progress-step">
        <span class="text-slate-600 text-sm font-normal leading-4"
          >Step {{ step.index }} of {{ totalSteps }}</span
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  step?:
    | {
        index: number;
        title: string;
        description: string;
      }
    | undefined
    | null;
  totalSteps?: number | undefined | null;
}>();
</script>

<style scoped></style>
