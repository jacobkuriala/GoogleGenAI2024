<template>
    <div class="bubble-mini-right" :style="`left: ${props.x}px; top: ${props.y}px;`">
        {{message}}
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    message: string | '...',
    x: number,
    y: number,
}>()
</script>
<style lang="postcss" scoped>
.bubble-mini-right{
    @apply absolute z-40 m-5 text-center font-press-start italic text-base bg-white text-black p-[2px] px-2 w-fit transform -translate-x-1/2 -translate-y-1/2;
    box-shadow: 0 -4px white, 0 -8px black, 4px 0 white, 4px -4px black, 8px 0 black, 0 4px white, 0 8px black, -4px 0 white, -4px 4px black, -8px 0 black, -4px -4px black, 4px 4px black;
}
</style>