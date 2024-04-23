<template>
    <div class="chat-box" >{{message}}</div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    message: string | 'Chat box goes here',
}>()
</script>
<style lang="postcss" scoped>
.chat-box{
    @apply fixed left-4 bottom-4 text-[#F5EAC8] h-20 bg-[#1c1c1c] rounded-lg font-bold p-5 text-lg uppercase font-arial tracking-[3px] w-[calc(100%-2rem)] ;
    box-shadow: 0 0 0 6px #F5EAC8, 0 0 0 12px #251C00;
}
</style>