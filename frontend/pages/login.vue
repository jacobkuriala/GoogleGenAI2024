<template>
  <div
    class="page-register flex flex-col justify-center items-center gap-4 w-full h-screen"
  >
    <h1
      class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl"
    >
      Login
    </h1>

    <form
      @submit.prevent="loginUser()"
      class="flex flex-col gap-4 w-full max-w-[350px] items-center"
    >
      <div class="w-full flex flex-nowrap gap-4">
        <div class="flex flex-col flex-1">
          <label for="email" class="block mb-2 text-sm font-medium text-white"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-corporate-500 focus:border-corporate-500 block w-full p-2.5"
            placeholder="name@company.com"
            v-model="email"
            :required="true"
          />
        </div>
      </div>
      <div class="w-full flex flex-nowrap gap-4">
        <div class="flex flex-col flex-1">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-white"
            >Password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-corporate-500 focus:border-corporate-500 block w-full p-2.5"
            :required="true"
            v-model="password"
          />
        </div>
      </div>

      <button
        class="btn icon-btn flex justify-center items-center flex-[1_0_0] px-10 py-2 gap-2 self-stretch border rounded-full border-solid border-corporate-500 bg-corporate-500 text-black hover:border-corporate-500/80 hover:bg-corporate-500/80 transition-colors duration-150 text-xl font-normal"
        type="submit"
      >
        Login
      </button>
      <p class="text-sm font-light text-gray-500">
        Don't have an account?
        <NuxtLink
          to="/register"
          class="font-medium text-corporate-500 hover:underline dark:text-primary-500"
          >Register here</NuxtLink
        >
      </p>
    </form>
    <SnackbarComponent :text="message" :type="color" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { login } = useUserStore();
let email = ref("");
let password = ref("");
const message = ref<string>("");
const color = ref<string>("default");

onMounted(() => {
  console.log("Login page mounted");
  // get token from local storage, if authenticated, redirect to dashboard
  const token = window.localStorage.getItem("token");
  // login("test@gmail.com", "test123"); // testing to see if the login function works

  if (token) return navigateTo("/");
});

const loginUser = async () => {
  message.value = "";
  try {
    await login(email.value, password.value);
    const token = window.localStorage.getItem("token");
    if (token) return navigateTo("/generate");
  } catch (error: any) {
    console.log(error);
    message.value = error.message;
    color.value = "error";
  }
};
</script>
