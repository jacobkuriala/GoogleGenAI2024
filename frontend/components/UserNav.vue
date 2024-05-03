<template>
  <nav
    class="user-nav flex flex-nowrap gap-2 items-center  "
  v-if="userStore.isAuthenticated">
    <div class="flex flex-col items-end relative">
      <div class="user-nav__email text-white text-base font-normal leading-5 ">
        {{ userStore.email }}
      </div>
      <span
        role="button"
        class="absolute n text-sm text-slate-500 top-full right-0 hover:underline"
        @click="userStore.logout"
        >Logout</span
      >
    </div>

    <div
      class="relative inline-flex items-center justify-center aspect-square w-10 h-10 overflow-hidden bg-slate-600 rounded-full"
    >
      <span class="font-medium text-gray-600 dark:text-gray-300">{{
        userInitials
      }}</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const getInitials = (full_name: string): string => {
  return full_name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
};

const userInitials = computed(() => getInitials(userStore.full_name));
</script>

<style scoped></style>
