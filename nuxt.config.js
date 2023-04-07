require("dotenv").config();
import en from "./lang/en";
import fr from "./lang/fr";
import km from "./lang/km";
import id from "./lang/id";
import th from "./lang/th";

export default defineNuxtConfig({
  ssr: false,
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
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
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
    "@nuxtjs/i18n",
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
      theme_color: "#000814",
      icons: [
        {
          src: "icons/pwa-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },

    workbox: {
      navigateFallback: "/",
    },
    // TO TEST PWA ON DEV
    /* devOptions: {
      enabled: true,
      type: "module",
    }, */
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "fr",
        file: "fr.js",
      },
      {
        code: "km",
        file: "km.js",
      },
      {
        code: "id",
        file: "id.js",
      },
      {
        code: "th",
        file: "th.js",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      messages: { en, fr, km, id, th },
    },
  },
});
