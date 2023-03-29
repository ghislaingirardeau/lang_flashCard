<template>
  <div class="common-layout">
    <el-container :style="{ height: containerHeight }">
      <el-header class="header-container">
        <Transition name="fade" mode="out-in">
          <h1 class="header-container-title" :key="$route.params.id">
            {{ $route.params.id ? $route.params.id : "Flash Cards" }}
          </h1>
        </Transition>
        <nuxt-link :to="localePath('test')">test</nuxt-link>
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
          class="footer_container footer_container-recorder"
          v-if="$route.params.id"
        >
          <LazyMicRecord v-if="settings.recorder" />
          <LazyInputRecord v-else />
        </el-footer>
        <el-footer class="footer_container footer_container-home" v-else>
          {{ $t("footer.title") }} gG web dev
        </el-footer>
      </Transition>
    </el-container>
    <FormDialog
      v-model:value="dialogSettings"
      :doOnConfirm="registerSettings"
      :title="$t('settings.title')"
    >
      <el-form-item :label="$t('settings.languages')">
        <SetLanguage v-model:settings="settings" />
      </el-form-item>
      <el-form-item :label="$t('settings.recorder')">
        <el-switch
          v-model="settings.recorder"
          size="large"
          :active-text="$t('settings.voice')"
          :inactive-text="$t('settings.text')"
        />
      </el-form-item>
      <el-form-item :label="$t('settings.voiceSpeed')">
        <el-slider v-model="settings.rate" :step="0.1" :min="0.6" :max="1.2" />
      </el-form-item>
    </FormDialog>
  </div>
</template>

<script>
export default {
  setup() {
    const cardsStore = useCardsStore();
    const dialogSettings = ref(false);
    const { height } = useWindowSize();
    const router = useRouter();
    const switchLocalePath = useSwitchLocalePath();
    const i18n = useI18n();

    const settings = ref({});

    const setFooter = () => {
      let r = document.querySelector(":root");
      settings.value.recorder
        ? r.style.setProperty("--footer-height", "130px")
        : r.style.setProperty("--footer-height", "75px");
    };

    onBeforeMount(async () => {
      await cardsStore.nuxtServerInit();
      settings.value = { ...cardsStore.languages };
      setFooter();
      // check if app load on the right lang set
      if (i18n.locale.value != cardsStore.languages.from.slice(0, 2)) {
        navigateTo(switchLocalePath(cardsStore.languages.from.slice(0, 2)));
      }
    });

    const containerHeight = computed(() => {
      return height.value + "px";
    });

    const registerSettings = () => {
      cardsStore.setParams(settings);
      setFooter();
      // if the from language change
      if (i18n.locale.value != settings.value.from.slice(0, 2)) {
        navigateTo(switchLocalePath(cardsStore.languages.from.slice(0, 2)));
      }
    };

    return {
      containerHeight,
      settings,
      dialogSettings,
      registerSettings,
    };
  },
  mounted() {
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
                      alert("new update available");
                      resolve(true);
                    } else {
                      // no update available
                      alert("no update available");
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
  },
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
  height: 70%;
}
.el-main {
  padding: 0px;
}
.footer_container {
  position: relative;
  padding-top: 15px;
  border-top: 1px solid rgb(255, 255, 255);
  &-recorder {
    height: var(--footer-height);
  }
  &-home {
    background-color: $colorSecondary;
    color: $colorPrimary;
    font-family: $fontSecondary;
    font-size: 20px;
  }
}
.header-icons {
  position: absolute;
  right: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
