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
            color="white"
            @click="$router.back()"
            class="goBack"
          />
          <Icon
            v-else
            name="mdi:cog-outline"
            size="34px"
            color="white"
            class="goBack"
            @click="dialogSettings = true"
          />
        </Transition>
      </el-header>
      <el-container class="main-container">
        <el-main><slot /></el-main>
      </el-container>
      <Transition name="fade" mode="out-in">
        <el-footer class="footer-container" v-if="$route.params.id">
          <MicRecord v-if="settings.recorder" />
          <InputRecord v-else />
        </el-footer>
      </Transition>
    </el-container>
    <FormDialog
      v-model:value="dialogSettings"
      :doOnConfirm="registerSettings"
      title="Settings"
    >
      <SetLanguage />
      <el-switch
        v-model="settings.recorder"
        size="large"
        active-text="Voice recorder"
        inactive-text="Text"
      />
    </FormDialog>
  </div>
</template>

<script>
export default {
  setup() {
    const dialogSettings = ref(false);
    const { height } = useWindowSize();
    const settings = reactive({
      recorder: false,
    });

    const containerHeight = computed(() => {
      return height.value + "px";
    });

    const registerSettings = () => {
      let r = document.querySelector(":root");
      settings.recorder
        ? r.style.setProperty("--footer-height", "130px")
        : r.style.setProperty("--footer-height", "75px");
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
}

a {
  text-decoration: none;
}

.header-container {
  background-color: $btnColor;
  padding-top: 10px;
  position: relative;
  height: 55px;
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
  border-top: 2px solid grey;
  height: var(--footer-height);
}
.goBack {
  position: absolute;
  right: 20px;
  z-index: 9999;
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
