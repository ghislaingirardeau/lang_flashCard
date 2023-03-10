require("dotenv").config();

export default defineNuxtConfig({
  ssr: false,
  target: "static",
  app: {
    head: {
      charset: "utf-16",
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
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
      icon: [
        {
          src: "/pwa-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },

    workbox: {
      navigateFallback: "/",
    },
    /* devOptions: {
      enabled: true,
      type: "module",
    }, */
  },
});
