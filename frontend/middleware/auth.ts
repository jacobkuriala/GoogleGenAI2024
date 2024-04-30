export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  console.log(userStore.isAuthenticated, "auth middleware");

  if (process.server) {
    // Lógica específica del servidor, si es necesario
    console.log("Middleware ejecutándose en el servidor");
  } else {
    // Lógica específica del cliente
    if (!userStore.isAuthenticated && to.path !== "/login") {
      console.log("not authenticated");
      return window.location.href = "/login";
    }
  }
});