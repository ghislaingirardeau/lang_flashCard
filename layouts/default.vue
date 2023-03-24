<template>
  <div class="common-layout">
    <el-container :style="{ height: containerHeight }">
      <el-header class="header-container">
        <span class="header-container-title">
          {{ $route.params.id ? $route.params.id : "Home" }}
        </span>
        <el-divider direction="vertical" />
        <NuxtLink class="ml-5" :to="{ name: 'test' }">te</NuxtLink>
        <Transition name="fade">
          <Icon
            v-if="$route.name === 'card-id'"
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
          class="footer-container footer-container-recorder"
          v-if="$route.params.id"
        >
          <LazyMicRecord v-if="settings.recorder" />
          <LazyInputRecord v-else />
        </el-footer>
        <el-footer class="footer-container footer-container-home" v-else>
          Create By Gg web dev
        </el-footer>
      </Transition>
    </el-container>
    <FormDialog
      v-model:value="dialogSettings"
      :doOnConfirm="registerSettings"
      title="Settings"
    >
      <el-form-item label="Languages">
        <SetLanguage v-model:settings="settings" />
      </el-form-item>
      <el-form-item label="Recorder">
        <el-switch
          v-model="settings.recorder"
          size="large"
          active-text="Voice"
          inactive-text="Text"
        />
      </el-form-item>
      <el-form-item label="Voice speed">
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
    });

    const containerHeight = computed(() => {
      return height.value + "px";
    });

    const registerSettings = () => {
      cardsStore.setParams(settings);
      setFooter();
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
:root {
  --footer-height: 75px;
  --el-text-color-regular: $colorSecondary;
  --el-switch-on-color: $colorSecondary;
  --el-text-color-primary: $colorSecondary;
  --el-color-primary: $colorSecondary;
}

a {
  text-decoration: none;
  color: $colorPrimary;
}

body {
  background-color: $colorFith;
  color: $colorPrimary;
}
svg {
  color: $colorThird;
}

.header-container {
  background-color: $colorSecondary;
  color: $colorPrimary;
  padding-top: 10px;
  position: relative;
  height: 55px;
  border-bottom: 1px solid rgb(255, 255, 255);
  &-title {
    font-size: 24px;
    padding-left: 10px;
  }
}
.main-container {
  height: 70%;
}
.el-main {
  padding: 0px;
}
.footer-container {
  position: relative;
  padding-top: 15px;
  border-top: 1px solid rgb(255, 255, 255);
  &-recorder {
    height: var(--footer-height);
  }
  &-home {
    background-color: $colorSecondary;
    color: $colorPrimary;
  }
}
.header-icons {
  position: absolute;
  right: 20px;
}
.el-dialog {
  background-color: $colorFith;
  &__header {
    background-color: $colorSecondary;
    margin-right: 0px;
    border-bottom: 1px solid rgb(255, 255, 255);
  }
  &__title {
    font-weight: bold;
    font-size: 24px;
    color: $colorPrimary;
  }
  &__body {
    color: $colorThird;
    border: 1px solid rgb(255, 255, 255);
    & label {
      color: $colorThird;
    }
  }
}
.el-slider__bar {
  background-color: $colorThird;
}
.el-switch__label {
  color: $colorSecondary;
}
.el-select-dropdown__item {
  color: $colorSecondary;
  &.selected {
    color: $colorThird;
  }
}
.el-button {
  color: $colorSecondary;
  &--primary {
    color: white;
  }
}
.el-form-item {
  align-items: center;
  text-align: center;
  padding-top: 20px;
}
.el-switch {
  margin-left: 30px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
