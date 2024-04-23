// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [  "~/assets/styles/main.css"],
    modules: ["@nuxtjs/tailwindcss"],
    tailwindcss: {
        cssPath: ["~/assets/styles/main.css", { injectPosition: "first" }],
        configPath: "tailwind.config",
        editorSupport: true,
      },
})