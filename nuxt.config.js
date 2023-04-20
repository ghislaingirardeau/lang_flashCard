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
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
      title: "My flashCard Lang",
      meta: [
        {
          name: "description",
          content:
            "A flash card is a web app to help you learning a new langagues. Flash cards language translate, speech and store word or expression you want to learn into customable categories.",
        },
      ],
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
          additionalData: '@use "@/assets/scss/_main.scss" as *;',
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
    "nuxt-simple-sitemap",
    "@nuxtjs/robots",
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
      XRAPIDAPIGOOGLE: process.env.XRAPIDAPIGOOGLE,
    },
  },
  sitemap: {
    siteUrl: "https://my-flashcard-lang.netlify.app/fr",
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
      theme_color: "#6fffe9",
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
