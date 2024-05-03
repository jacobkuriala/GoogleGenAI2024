<template>
    <nav class="login-nav flex h-4 justify-center items-center gap-6" v-if="!userStore.isAuthenticated">
        <NuxtLink to="/login" class="text-slate-400 hover:text-slate-500 transition-colors duration-150 text-base font-normal leading-5">Login</NuxtLink>
        <NuxtLink to="/register" class="text-slate-400 hover:text-slate-500 transition-colors duration-150 text-base font-normal leading-5">Register</NuxtLink>
    </nav>
</template>

<script setup lang="ts">
const userStore = useUserStore();

</script>

<style scoped>

</style>