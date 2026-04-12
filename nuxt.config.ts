// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: ["convex-nuxt", "@nuxt/icon"],

  convex: {
    url: process.env.CONVEX_URL,
  },

  app: {
    head: {
      title: "Nuxt-Convex",
      meta: [{ name: "description", content: "A Nuxt 4 example using Convex" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.jade.min.css",
        },
      ],
      htmlAttrs: { lang: "en", "data-theme": "light" },
    },
  },
});
