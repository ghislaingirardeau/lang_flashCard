<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <div id="app_container">
        <el-container :style="{ height: containerHeight }">
          <el-header class="header-container">
            <Transition name="fade" mode="out-in">
              <h1 class="header-container-title" :key="$route.params.id">
                {{
                  $route.params.id
                    ? $route.params.id.replaceAll("_", " ")
                    : "Flash Cards"
                }}
              </h1>
            </Transition>
            <!-- <nuxt-link :to="localePath('test')">test</nuxt-link> -->
            <Transition name="fade" mode="out-in">
              <Icon
                v-if="$route.params.id"
                name="mdi:arrow-left-drop-circle-outline"
                size="34px"
                @click="$router.back()"
                class="header-icons"
              />
              <Icon
                v-else
                name="mdi:cog-outline"
                size="34px"
                class="header-icons"
                @click="dialogSettings = true"
              />
            </Transition>
          </el-header>
          <el-container class="main-container">
            <el-main><slot /></el-main>
          </el-container>
          <Transition name="fade" mode="out-in">
            <el-footer
              class="footer_container footer_container-nav"
              v-if="$route.params.id && $route.params.id != $t('home.lastAdd')"
            >
              <TheFooterNav />
            </el-footer>
            <el-footer class="footer_container footer_container-home" v-else>
              <TheFooterHome :switchLang="switchLang" />
            </el-footer>
          </Transition>
        </el-container>
        <FormDialog
          v-model:value="dialogSettings"
          :doOnConfirm="registerSettings"
          :title="$t('settings.title')"
        >
          <el-form-item :label="$t('settings.languages')">
            <LazySetLanguage v-model:settings="settings" />
          </el-form-item>
          <el-form-item :label="$t('settings.voiceSpeed')">
            <Lazyel-slider
              v-model="settings.rate"
              :step="0.1"
              :min="0.6"
              :max="1.2"
            />
          </el-form-item>
          <span>{{
            $t("settings.cacheNote", { percent: navigatorStorageUsed })
          }}</span>
          <el-form-item
            :label="$t('settings.cacheLabel')"
            style="padding-top: 5px"
          >
            <Icon
              name="mdi:trash-can-outline"
              size="34px"
              @click="deleteCache"
              style="cursor: pointer"
            />
          </el-form-item>
        </FormDialog>
      </div>
    </Body>
  </Html>
</template>

<script setup>
const cardsStore = useCardsStore();
const dialogSettings = ref(false);
const { height } = useWindowSize();
const switchLocalePath = useSwitchLocalePath();
const i18n = useI18n();
const settings = ref({});
const navigatorStorageUsed = ref(0);

// SET HEAD FOR I18N SEO
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
const title = computed(() => i18n.t("headTag.title"));
useHead({
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
    },
    {
      hid: "description",
      name: "description",
      content: i18n.t("headTag.content"),
    },
  ],
});

onBeforeMount(async () => {
  /* await device.nuxtServerInit(); */
  await cardsStore.nuxtServerInit();
  settings.value = { ...cardsStore.languages };
  // check if app load on the right lang set
  if (i18n.locale.value != cardsStore.languages.from.slice(0, 2)) {
    navigateTo(switchLocalePath(cardsStore.languages.from.slice(0, 2)));
  }
});

const breakpoints = useBreakpoints({
  xl: 1280,
});

onMounted(() => {
  const styleBody = document.querySelector("#app_container").style;
  breakpoints.smallerOrEqual("xl").value
    ? (styleBody.marginInline = "0px")
    : (styleBody.marginInline = "300px");
  window.isUpdateAvailable = new Promise(function (resolve, reject) {
    // lazy way of disabling service workers while developing
    if ("serviceWorker" in navigator) {
      // register service worker file
      navigator.serviceWorker.ready
        .then((reg) => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
                case "installed":
                  if (navigator.serviceWorker.controller) {
                    // new update available
                    if (
                      window.confirm(
                        "New update available ! Reload the app now ?"
                      )
                    ) {
                      window.location.reload();
                    }
                    resolve(true);
                  } else {
                    // no update available
                    resolve(false);
                  }
                  break;
              }
            };
          };
        })
        .catch((err) => console.error("[SW ERROR]", err));
    }
  });
});

navigator.storage.estimate().then((estimate) => {
  navigatorStorageUsed.value = (
    (estimate.usage / estimate.quota) *
    100
  ).toFixed(5);
});

const containerHeight = computed(() => {
  return height.value + "px";
});


const deleteCache = () => {
  if (window.confirm("Clean the audio file ?")) {
    caches.delete("flashCardCache").then((isGone) => {
      alert("Cache has been removed");
    });
  }
};

const switchLang = (e) => {
  let to = settings.value.to;
  let from = settings.value.from;

  settings.value.from = to;
  settings.value.to = from;

  registerSettings(true);

  const eltToAnim = document.querySelector(".footer_container-home");
  const textToFade = eltToAnim.querySelectorAll("p");
  const iconToFade = eltToAnim.querySelector("svg");

  i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    iconToFade.classList.add("footer-icons-animate");
    textToFade.forEach((element) => {
      element.classList.add("footer-text-animate");
    });
  };

  setTimeout(() => {
    iconToFade.classList.remove("footer-icons-animate");
    textToFade.forEach((element) => {
      element.classList.remove("footer-text-animate");
    });
  }, 1000);
};

const registerSettings = (payload) => {
  // need to desconstruct the object otherwise cardsStore.languages strict equal to settings.value on every changes
  if (payload) {
    const { from, to, rate } = settings.value;

    cardsStore.setParams({
      from,
      to,
      rate,
      remember: cardsStore.languages.remember,
    });
    // if the from language change
    if (i18n.locale.value != settings.value.from.slice(0, 2)) {
      navigateTo(switchLocalePath(cardsStore.languages.from.slice(0, 2)));
    }
  } else {
    settings.value = { ...cardsStore.languages };
  }
};
</script>

<style lang="scss">
.header-container {
  background-color: $colorSecondary;
  color: $colorPrimary;
  padding-top: 10px;
  position: relative;
  height: 55px;
  border-bottom: 1px solid rgb(255, 255, 255);
  &-title {
    padding-left: 10px;
    font-size: 28px;
    width: 50%;
    display: inline;
    font-family: $fontSecondary;
  }
}
.main-container {
  height: 50%;
}
.el-main {
  padding: 0px;
}
.footer_container {
  border-top: 1px solid rgb(255, 255, 255);
  &-nav {
    height: 120px;
    background-color: $colorSecondary;
    padding-top: 15px;
  }
  &-home {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $colorSecondary;
    color: $colorPrimary;
    font-family: $fontSecondary;
    font-size: 20px;
    min-height: 64px;
    & p {
      display: inline;
    }
    &-text {
      max-width: 200px;
    }
  }
}
.header-icons {
  position: absolute;
  cursor: pointer;
  right: 20px;
}
.footer-icons {
  cursor: pointer;
  transform: translateY(-5px) rotateZ(90deg);
  margin-inline: 10px 10px;
  &-animate {
    animation: rotate-switcher 1s ease both;
  }
}

@keyframes rotate-switcher {
  0% {
    transform: translateY(-5px) rotateZ(90deg);
    opacity: 0.2;
  }
  100% {
    transform: translateY(-5px) rotateZ(270deg);
  }
}
</style>
