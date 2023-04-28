require("dotenv").config();
import en from "./lang/en";
import fr from "./lang/fr";
import km from "./lang/km";
import id from "./lang/id";
import th from "./lang/th";

export default defineNuxtConfig({
  ssr: false,
  app: {
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
    "@nuxt/devtools",
    "nuxt-simple-sitemap",
    /* "nuxt-security", */
    /* "@nuxtjs/robots", */ // BUG
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
    siteUrl: "https://my-flashcard-lang.netlify.app",
  },
  pwa: {
    meta: {
      title: "My Vocabulary Cardsuage",
      author: "gg web dev",
    },
    manifest: {
      name: "My Vocabulary Cardsuage",
      short_name: "My Vocabulary Cards",
      lang: "en",
      description: "My Vocabulary Cardsuage",
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
        iso: "en-US",
        file: "en.js",
      },
      {
        code: "fr",
        iso: "fr-FR",
        file: "fr.js",
      },
      {
        code: "km",
        iso: "km-KM",
        file: "km.js",
      },
      {
        code: "id",
        iso: "id-ID",
        file: "id.js",
      },
      {
        code: "th",
        iso: "th-TH",
        file: "th.js",
      },
    ],
    baseUrl: "https://my-flashcard-lang.netlify.app",
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      messages: { en, fr, km, id, th },
    },
    customRoutes: "config",
    pages: {
      "card/[id]": {
        en: "/card/[id]",
        fr: "/carte/[id]",
      },
    },
  },
});
