<template>
  <div class="common-layout">
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
          class="footer_container footer_container-nav"
          v-if="$route.params.id"
        >
          <TheFooterNav />
        </el-footer>
        <el-footer class="footer_container footer_container-home" v-else>
          <div class="footer_container-home-text">
            <p>{{ $t("footer.title") }} gG web dev</p>
          </div>
          <div>
            <p>
              {{ langFrom }}
            </p>
            <Icon
              name="mdi:arrow-up-down-bold-outline"
              size="34px"
              class="footer-icons"
              @click="switchLang"
            />
            <p>
              {{ langTo }}
            </p>
          </div>
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
    /* const device = useDeviceInfo(); */
    const dialogSettings = ref(false);
    const { height } = useWindowSize();
    const switchLocalePath = useSwitchLocalePath();
    const i18n = useI18n();

    const settings = ref({});

    onBeforeMount(async () => {
      /* await device.nuxtServerInit(); */
      await cardsStore.nuxtServerInit();
      settings.value = { ...cardsStore.languages };
      // check if app load on the right lang set
      if (i18n.locale.value != cardsStore.languages.from.slice(0, 2)) {
        navigateTo(switchLocalePath(cardsStore.languages.from.slice(0, 2)));
      }
    });

    const containerHeight = computed(() => {
      return height.value + "px";
    });

    const langTo = computed(() => {
      return cardsStore.langTo;
    });
    const langFrom = computed(() => {
      return cardsStore.langFrom;
    });

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

      /* setTimeout(() => {
        iconToFade.classList.add("footer-icons-animate");
        textToFade.forEach((element) => {
          element.classList.add("footer-text-animate");
        });
      }, 300); */

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

        cardsStore.setParams({ from, to, rate });
        // if the from language change
        if (i18n.locale.value != settings.value.from.slice(0, 2)) {
          navigateTo(switchLocalePath(cardsStore.languages.from.slice(0, 2)));
        }
      } else {
        settings.value = { ...cardsStore.languages };
      }
    };

    return {
      containerHeight,
      settings,
      dialogSettings,
      registerSettings,
      langTo,
      langFrom,
      switchLang,
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
                      alert("new update available, restart the app");
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
