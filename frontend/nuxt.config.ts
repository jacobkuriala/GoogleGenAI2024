// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
 
  app: {
    head: {
      title: "Campfire Storyteller AI",

      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  build: {
    transpile: ["@headlessui/vue"],
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@pinia/nuxt", "nuxt-icon"],

  
  css: ["~/assets/css/fontface.css", "~/assets/css/main.css"],
  tailwindcss: {
    cssPath: ["~/assets/css/main.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    editorSupport: true,
  },
});
