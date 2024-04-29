import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
    }),
    actions: {
        login() {
            // Lógica de login
            this.isAuthenticated = true;
        },
        logout() {
            // Lógica de logout
            this.isAuthenticated = false;
        }
    }
});