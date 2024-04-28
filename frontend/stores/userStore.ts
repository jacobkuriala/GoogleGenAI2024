import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        password: '',
        full_name: '',
        email: '',
        api_token: '',
        isAuthenticated: false,
    }),
    actions: {
        async login(email: string, password: string) {
            // Lógica de login
            const response = await fetch('http://localhost:3002/api/auth/login', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                }) 
            });
            const data = await response.json();
            console.log(response)
            // if user not existed, show error message and stay on login page
            if (response.status !== 200) {
                console.log(data);
                return;
            }
            // check if user existed, if yes, store the token and navigate to home page
            localStorage.setItem('token',data.token)
            this.$state.api_token = data.token
            this.$state.email = email
            this.$state.password = data.password
            this.$state.isAuthenticated = true;
        },

        async register(full_name: string, email: string, password: string) {
            // logica de registro
            const response = await fetch('http://localhost:3002/api/auth/register', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "full_name": full_name,
                    "email": email,
                    "password": password
                }) 
            });
            console.log(response)
            const data = await response.json();
            console.log(data)

            // if created successfully, store the token and navigate to login page
            if (response.status == 200) {
                return navigateTo('/login');
            } else {
                console.log(data.error)
            }
        }
        ,
        logout() {
            // Lógica de logout
            localStorage.removeItem('token')
            this.resetState()
        },
        resetState() {      
            this.$state.password = ''
            this.$state.full_name = ''
            this.$state.email = ''
            this.$state.api_token = ''
            this.$state.isAuthenticated = false
        },
    }
});