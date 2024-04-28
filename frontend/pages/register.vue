<template>
    <form @submit.prevent="createUser()">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useUserStore } from "../stores/userStore";
  
  const { register } = useUserStore();
  const fullName = ref("");
  const username = ref("");
  const password = ref("");
  onMounted(() => {
    console.log("register page mounted");
    register("Hello Tester", "test2@gmail.com", "test123")
  });
  const createUser = async () => {
    // Aquí agregarías la lógica para verificar las credenciales
    try{
      await register(fullName.value, username.value, password.value);
    } catch (error) {
      console.log(error);
    }
    };
  </script>
  