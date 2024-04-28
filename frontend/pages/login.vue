<template>
  <form @submit.prevent="loginUser()">
    <input v-model="email" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { login } = useUserStore();
let email = ref('')
let password = ref('')
let errors = ref(null)

onMounted(() => {
  console.log("Login page mounted");
  // get token from local storage, if authenticated, redirect to dashboard
  const token = window.localStorage.getItem('token');
  login("test@gmail.com", "test123") // testing to see if the login function works

  if (token) return navigateTo('/');
});

const loginUser = async () => {
        errors.value = null
        try {
            await login(email.value, password.value);
            const token = window.localStorage.getItem('token');
            if (token) return navigateTo('/login');
        } catch (error) {
            console.log(error);
        }
    }
</script>
