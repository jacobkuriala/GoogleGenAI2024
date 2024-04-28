<template>
    <form @submit.prevent="loginUser(username, password)">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useUserStore } from "../stores/userStore";
  
  const { login } = useUserStore();
  const username = ref("");
  const password = ref("");
  
  const loginUser = (username: string, password:string) => {
    // Aquí agregarías la lógica para verificar las credenciales
    login(username, password);
  };
  </script>
  