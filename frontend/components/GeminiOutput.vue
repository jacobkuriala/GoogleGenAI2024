<template>
  <main
    class="generate-output flex col-span-9 h-full overflow-hidden justify-center items-center gap-2 border bg-black shadow-custom p-4 rounded-xl border-solid border-slate-500/30"
  >
    <div
      class="output-placeholder flex flex-col items-center justify-center w-full h-full gap-12"
      v-if="output === '' || undefined || null"
    >
      <NuxtImg
        src="/images/illustration.png"
        format="auto"
        sizes="70vw sm:70vw md:50vw lg:40vw"
      />
      <p class="w-1/2 text-slate-800 text-center text-xl font-normal">
        {{ placeholder }}
      </p>
    </div>
    <div
      class="output w-full h-full flex flex-col gap-6 shrink-0 p-16 bg-corporate overflow-auto"
      v-else
      v-html="output"
    />
  </main>
</template>

<script setup lang="ts">
const props = defineProps<{
  output?: string | undefined | null;
  placeholder?: string | undefined | null;
}>();
</script>

<style lang="postcss" scoped>
.output h1 {
  @apply self-stretch text-slate-400  text-2xl font-normal leading-8;
}
.output h2 {
  @apply text-slate-400 text-xl font-normal leading-6;
}
.output p {
  @apply text-slate-400 text-base font-normal leading-6 mb-4;
}
</style>
