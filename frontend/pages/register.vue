<template>
  <div
    class="page-register flex flex-col justify-center items-center gap-4 w-full h-screen"
  >
    <h1
      class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl"
    >
      Create and account
    </h1>

    <form
      @submit.prevent="createUser()"
      class="flex flex-col gap-4 w-full max-w-[700px] items-center"
    >
      <div class="w-full flex flex-nowrap gap-4">
        <div class="flex flex-col flex-1">
          <label
            for="fullName"
            class="block mb-2 text-sm font-medium text-white"
            >Your Full Name</label
          >
          <input
            type="text"
            name="fullName"
            id="fullName"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-corporate-500 focus:border-corporate-500 block w-full p-2.5"
            placeholder="John Doe"
            v-model="fullName"
            :required="true"
          />
        </div>
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
            v-model="username"
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
        <div class="flex flex-col flex-1">
          <label
            for="confirm-password"
            class="block mb-2 text-sm font-medium text-white"
            >Confirm password</label
          >
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            v-model="confirmPassword"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-corporate-500 focus:border-corporate-500 block w-full p-2.5"
            :required="true"
          />
        </div>
      </div>
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-corporate-500"
            :required="true"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="font-light text-gray-500"
            >I accept the
            <NuxtLink
              to="/terms-and-conditions"
              class="font-medium text-corporate-400 hover:underline"
              >Terms and Conditions</NuxtLink
            ></label
          >
        </div>
      </div>
      <button
        class="btn icon-btn flex justify-center items-center flex-[1_0_0] px-10 py-2 gap-2 self-stretch border rounded-full border-solid border-corporate-500 bg-corporate-500 text-black hover:border-corporate-500/80 hover:bg-corporate-500/80 transition-colors duration-150 text-xl font-normal"
        type="submit"
      >
        Create an account
      </button>
      <p class="text-sm font-light text-gray-500">
        Already have an account?
        <NuxtLink
          to="/login"
          class="font-medium text-corporate-500 hover:underline dark:text-primary-500"
          >Login here</NuxtLink
        >
      </p>
    </form>
    <SnackbarComponent :text="message" :type="color" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";

const { register } = useUserStore();
const fullName = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const message = ref("");
const color = ref("");
onMounted(() => {
  console.log("register page mounted");
  // register("Hello Tester", "test2@gmail.com", "test123");
});
const createUser = async () => {
  if (password.value !== confirmPassword.value) {
    message.value = "Passwords do not match";
    color.value = "error";
    return;
  }
  try {
    await register(fullName.value, username.value, password.value);
    message.value = "User created successfully";
    color.value = "success";
  } catch (error) {
    console.error(error);
  }
};
</script>
