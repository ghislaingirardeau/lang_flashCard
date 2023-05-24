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
            <!-- <Icon
              name="material-symbols:help-outline"
              size="34px"
              class="header-help"
              @click="showTutorial = true"
            /> -->
            <svg
              data-v-4fa0a2a1=""
              @click="showTutorial = true"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="icon header-help"
              width="34px"
              height="34px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362Zm-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.313.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
              ></path>
            </svg>
            <Icon
              v-if="!$route.params.id"
              :name="
                getUser ? 'mdi:logout-variant' : 'mdi:account-circle-outline'
              "
              size="34px"
              @click="userAccount"
              class="header-icons"
            />
            <Icon
              v-if="$route.params.id"
              name="mdi:arrow-left-drop-circle-outline"
              size="34px"
              @click="backToHome"
              class="header-icons"
            />

            <!-- <Icon
              
              name="mdi:cog-outline"
              size="34px"
              class="header-icons"
              @click="dialogSettings = true"
            /> -->
            <svg
              data-v-4fa0a2a1=""
              v-else
              @click="dialogSettings = true"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="icon header-icons"
              width="34px"
              height="34px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 8a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m-2 12c-.25 0-.46-.18-.5-.42l-.37-2.65c-.63-.25-1.17-.59-1.69-.99l-2.49 1.01c-.22.08-.49 0-.61-.22l-2-3.46a.493.493 0 0 1 .12-.64l2.11-1.66L4.5 12l.07-1l-2.11-1.63a.493.493 0 0 1-.12-.64l2-3.46c.12-.22.39-.31.61-.22l2.49 1c.52-.39 1.06-.73 1.69-.98l.37-2.65c.04-.24.25-.42.5-.42h4c.25 0 .46.18.5.42l.37 2.65c.63.25 1.17.59 1.69.98l2.49-1c.22-.09.49 0 .61.22l2 3.46c.13.22.07.49-.12.64L19.43 11l.07 1l-.07 1l2.11 1.63c.19.15.25.42.12.64l-2 3.46c-.12.22-.39.31-.61.22l-2.49-1c-.52.39-1.06.73-1.69.98l-.37 2.65c-.04.24-.25.42-.5.42h-4m1.25-18l-.37 2.61c-1.2.25-2.26.89-3.03 1.78L5.44 7.35l-.75 1.3L6.8 10.2a5.55 5.55 0 0 0 0 3.6l-2.12 1.56l.75 1.3l2.43-1.04c.77.88 1.82 1.52 3.01 1.76l.37 2.62h1.52l.37-2.61c1.19-.25 2.24-.89 3.01-1.77l2.43 1.04l.75-1.3l-2.12-1.55c.4-1.17.4-2.44 0-3.61l2.11-1.55l-.75-1.3l-2.41 1.04a5.42 5.42 0 0 0-3.03-1.77L12.75 4h-1.5Z"
              ></path>
            </svg>
          </div>
        </Transition>
        <!-- <nuxt-link :to="localePath('test')">test</nuxt-link> -->
      </el-header>
      <el-container class="main-container">
        <LazyTheTutorial
          v-if="showTutorial"
          @send-tuto="showTutorial = false"
        />
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
      {{ navigatorStorageUsed }}%
      <el-form-item :label="$t('settings.cacheLabel')" style="padding-top: 5px">
        <Icon
          name="mdi:trash-can-outline"
          size="34px"
          @click="deleteCache"
          style="cursor: pointer"
        />
      </el-form-item>
    </FormDialog>
    <FormDialog
      v-model:value="dialogLogin"
      :doOnConfirm="logUser"
      :title="signUp ? 'Sign-Up' : 'Sign-In'"
    >
      <SignIn
        v-model:signUp="signUp"
        v-model:email="userData.email"
        v-model:name="userData.name"
        v-model:password="userData.password"
      />
    </FormDialog>
  </div>
</template>

<script setup>
import footerNav from "@/components/TheFooterNav.vue";
import footerHome from "@/components/TheFooterHome.vue";

const cardsStore = useCardsStore();
const userStore = useUserStore();
const getUser = useCurrentUser();
const dialogSettings = ref(false);
const dialogLogin = ref(false);
const signUp = ref(false);
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const i18n = useI18n();
const settings = ref({});
const navigatorStorageUsed = ref(0);
const showTutorial = ref(false);
const route = useRoute();
const userData = ref({
  email: "test@mail.com",
  password: "azerty1",
  name: "",
});

onBeforeMount(async () => {
  const user = await getCurrentUser();
  await cardsStore.nuxtServerInit(user);
  settings.value = { ...cardsStore.languages };
  // check if app load on the right lang set
  if (i18n.locale.value != cardsStore.languages.from.slice(0, 2)) {
    navigateTo(switchLocalePath(cardsStore.languages.from.slice(0, 2)));
  }
});

const innerWidth = window.innerWidth;
const innerHeight = ref(window.innerHeight);

onMounted(() => {
  const styleBody = document.querySelector("#app_container").style;
  innerWidth <= 1280
    ? (styleBody.marginInline = "0px")
    : (styleBody.marginInline = "300px");

  window.onresize = (event) => {
    innerHeight.value = window.innerHeight;
    console.log("window resize");
  };

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
  return innerHeight.value + "px";
});

const deleteCache = () => {
  if (window.confirm("Clean the audio file ?")) {
    caches.delete("flashCardCache").then((isGone) => {
      alert("Cache has been removed");
    });
  }
};

const switchLang = (e) => {
  const { from, to } = settings.value;

  settings.value.from = to;
  settings.value.to = from;

  let keyframes = [
    {
      opacity: 0,
      transform: "rotateZ(20deg)",
      offset: 0.5,
    },
  ];
  let element = e.target.nodeName === "svg" ? e.target : e.target.parentNode;

  element.animate(keyframes, {
    duration: 400,
    fill: "forwards",
  });

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
    dialogSettings.value = false;
  } else {
    settings.value = { ...cardsStore.languages };
    dialogSettings.value = false;
  }
};

const logUser = (payload) => {
  useUserSign(payload, signUp, userStore, userData, dialogLogin);
};
// SHOW ACCOUNT CONNECTION OR UNLOG
const userAccount = () => {
  useUserAccount(getUser, userStore, dialogLogin);
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
