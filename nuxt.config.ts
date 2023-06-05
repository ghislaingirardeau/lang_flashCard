require("dotenv").config();
import en from "./lang/en";
import fr from "./lang/fr";
import km from "./lang/km";
import id from "./lang/id";
import th from "./lang/th";

import type { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  ssr: false,
  app: {
    head: {
      title: "Vocabulary app",
      meta: [
        { charset: "utf-8" },

        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          hid: "description",
          name: "description",
          content:
            "Créez et personnalisez votre propre vocabulaire. Mon vocabulaire en carte est une application web pour vous aider à apprendre une nouvelle langue. Mon vocabulaire en carte vous permet de traduire, écouter la prononciation à différente vitesse et enregistre le mot ou l'expression que vous souhaitez apprendre sous forme de catégories ou cartes personnalisables.Créez et personnalisez votre propre vocabulaire. Mon vocabulaire en carte est une application web pour vous aider à apprendre une nouvelle langue. Mon vocabulaire en carte vous permet de traduire, écouter la prononciation à différente vitesse et enregistre le mot ou l'expression que vous souhaitez apprendre sous forme de catégories ou cartes personnalisables.",
        },
        {
          name: "google-site-verification",
          content: "TI69RjohqFY28V_7hg30Rkq7GMxQ2WrDgI2mYHNHnWc",
        },
      ],
      htmlAttrs: {
        lang: "fr-FR",
      },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          href: "https://fonts.googleapis.com/css2?family=Acme&family=Delicious+Handrawn&display=swap",
          rel: "stylesheet",
        },
      ],
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
  buildModules: [
    [
      "@nuxt-modules/compression",
      {
        algorithm: "brotliCompress",
      },
    ],
  ],
  modules: [
    "@vueuse/nuxt",
    "nuxt-icon",
    "@vite-pwa/nuxt",
    "@element-plus/nuxt",
    "nuxt-vuefire",
    /* "@nuxt/devtools", */ // if use, not possible to access vue inside devtool
    "nuxt-simple-sitemap",
    /* "nuxt-security", */ // il active => nuxt/devtools doesnt work

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
    // "@nuxtjs/robots", BUG
  ],
  runtimeConfig: {
    public: {
      XRAPIDAPIKEY: process.env.XRAPIDAPIKEY,
      XRAPIDAPIHOST: process.env.XRAPIDAPIHOST,
      XRAPIDAPIHOSTTTS: process.env.XRAPIDAPIHOSTTTS,
      XRAPIDAPIGOOGLE: process.env.XRAPIDAPIGOOGLE,
      TRANSLO: process.env.TRANSLO,
    },
  },
  sitemap: {
    siteUrl: "https://my-flashcard-lang.netlify.app",
  },
  vuefire: {
    auth: true,
    config: {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECTID,
      appId: process.env.APPID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      measurementId: process.env.MEASUREMENTID,
      databaseURL: process.env.DATABASEURL,
    },
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
    defaultLocale: "fr",
    vueI18n: {
      locale: "fr",
      fallbackLocale: "fr",
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
  pwa: {
    meta: {
      title: "My Vocabulary Cards",
      author: "gg web dev",
    },
    manifest: {
      name: "My Vocabulary Cards",
      short_name: "My Vocabulary Cards",
      lang: "en",
      description: "My Vocabulary Cards",
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
};

export default config;
