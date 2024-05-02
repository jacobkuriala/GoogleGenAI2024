<template>
  <div
    id="app"
    class="layout layout--default h-screen w-screen bg-gradient-to-br from-[#1E293B] to-[#020617] relative"
  >
    <TopBar />
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="postcss">
body,
html {
  @apply font-work;
}
</style>
