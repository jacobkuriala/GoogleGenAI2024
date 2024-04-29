<template>
    <button class="hero-button flex justify-center items-center gap-2 self-stretch bg-corporate-500 hover:bg-corporate-400 px-10 py-2 rounded-full text-black font-work text-2xl font-normal leading-normal ">
        {{ text }}
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    text?: string | "Button";
}>();
</script>

<style scoped>

</style>