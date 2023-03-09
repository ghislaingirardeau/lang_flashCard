export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "My flashCard Lang",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "@vueuse/nuxt",
    "nuxt-icon",
    /* "@nuxtjs/tailwindcss", */
    "@element-plus/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore", // import { defineStore } from 'pinia'
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  publicRuntimeConfig: {
    XRAPIDAPIKEY: process.env.XRAPIDAPIKEY,
    XRAPIDAPIHOST: process.env.XRAPIDAPIHOST,
    XRAPIDAPIHOSTTTS: process.env.XRAPIDAPIHOSTTTS,
  },
});
