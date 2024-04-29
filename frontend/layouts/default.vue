<template>
  <div
    id="app"
    class="layout layout--default min-h-screen w-screen bg-gradient-to-br from-[#1E293B] to-[#020617] relative"
  >
    <TopBar />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss">
body,
html {
  @apply font-work bg-[#1E293B] bg-[#020617];
}

</style>
