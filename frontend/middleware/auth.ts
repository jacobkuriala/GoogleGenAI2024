export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();
  if (!user.isAuthenticated && to.path !== "/login") {
    return navigateTo("/login");
  }
});
