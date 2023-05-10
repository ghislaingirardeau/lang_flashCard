<template>
  <div id="app_container">
    <el-container :style="{ height: containerHeight }">
      <el-header class="header-container">
        <Transition name="fade" mode="out-in">
          <div :key="$route.params.id" class="header-container-nav">
            <h1 class="header-container-title">
              {{
                $route.params.id
                  ? $route.params.id.replaceAll("_", " ")
                  : "Flash Cards"
              }}
            </h1>
            <Icon
              name="material-symbols:help-outline"
              size="34px"
              class="header-help"
              @click="showTutorial = true"
              @touchStart="showTutorial = true"
            />
            <Icon
              v-if="$route.params.id"
              name="mdi:arrow-left-drop-circle-outline"
              size="34px"
              @click="backToHome"
              @touchStart="backToHome"
              class="header-icons"
            />
            <Icon
              v-else
              name="mdi:cog-outline"
              size="34px"
              class="header-icons"
              @click="dialogSettings = true"
              @touchStart="dialogSettings = true"
            />
          </div>
        </Transition>
        <!-- <nuxt-link :to="localePath('test')">test</nuxt-link> -->
      </el-header>
      <el-container class="main-container">
        <LazyTheTutorial v-if="showTutorial" @send-tuto="closeTuto" />
        <el-main><slot /></el-main>
      </el-container>
      <Transition name="fade" mode="out-in">
        <component :is="footerToLoad" :switchLang="switchLang" />
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
      <p>
        {{ $t("settings.test", 1) }}<br />
        {{ $t("settings.test", 2) }}<br />
      </p>
      <el-form-item :label="$t('settings.cacheLabel')" style="padding-top: 5px">
        <Icon
          name="mdi:trash-can-outline"
          size="34px"
          @click="deleteCache"
          style="cursor: pointer"
        />
      </el-form-item>
    </FormDialog>
  </div>
</template>

<script setup>
import footerNav from "@/components/TheFooterNav.vue";
import footerHome from "@/components/TheFooterHome.vue";

const cardsStore = useCardsStore();
const dialogSettings = ref(false);
const { height } = useWindowSize();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const i18n = useI18n();
const settings = ref({});
const navigatorStorageUsed = ref(0);
const showTutorial = ref(false);
const route = useRoute();

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

const footerToLoad = computed(() =>
  route.params.id && route.params.id != i18n.t("home.lastAdd")
    ? footerNav
    : footerHome
);

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

const closeTuto = () => {
  showTutorial.value = false;
};

const switchLang = (e) => {
  let to = settings.value.to;
  let from = settings.value.from;

  settings.value.from = to;
  settings.value.to = from;

  i18n.onBeforeLanguageSwitch = () => {
    let keyframes;
    let element;
    if (route.params.id) {
      element = e.target.nodeName === "svg" ? e.target : e.target.parentNode;
      keyframes = [
        {
          transform: `rotateZ(0deg)`,
        },
        {
          transform: `rotateZ(180deg)`,
        },
      ];
    } else {
      element = document.querySelector(".footer_container-home");
      keyframes = [
        {
          opacity: 0,
          transform: `scale(0.95)`,
          offset: 0.2,
        },
      ];
    }

    element.animate(keyframes, {
      duration: 400,
      fill: "both",
    });
  };

  registerSettings(true);
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

const backToHome = () => {
  navigateTo(
    localePath({
      name: "index",
    })
  );
};
</script>

<style lang="scss">
.header-container {
  background-color: $colorSecondary;
  color: $colorPrimary;
  position: relative;
  height: 55px;
  border-bottom: 1px solid rgb(255, 255, 255);
  &-title {
    font-size: 2rem;
    flex-grow: 10;
    font-family: $fontSecondary;
    margin: 0px;
  }
  &-nav {
    display: flex;
    height: 54px;
    align-items: center;
  }
}
</style>
