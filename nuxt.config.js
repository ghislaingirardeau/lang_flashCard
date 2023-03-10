require("dotenv").config();

export default defineNuxtConfig({
  ssr: false,
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
    "@vite-pwa/nuxt",
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
  runtimeConfig: {
    public: {
      XRAPIDAPIKEY: process.env.XRAPIDAPIKEY,
      XRAPIDAPIHOST: process.env.XRAPIDAPIHOST,
      XRAPIDAPIHOSTTTS: process.env.XRAPIDAPIHOSTTTS,
    },
  },
  pwa: {
    meta: {
      title: "FlashCard Language",
      author: "gg web dev",
    },
    manifest: {
      name: "FlashCard Language",
      short_name: "FlashCard Lang",
      lang: "en",
      description: "FlashCard Language",
      theme_color: "#30bdc7",
      start_url: "https://my-flashcard-lang.netlify.app",
      display: "standalone",
    },
    icon: {
      fileName: "android-chrome-192x192.png",
      sizes: [64, 120, 144, 152, 192], //, 384, 512
    },
    workboxOptions: {
      exclude: ["_redirects"],
    },
  },
});
