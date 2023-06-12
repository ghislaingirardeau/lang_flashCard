<template>
  <div id="app_container">
    <el-container :style="{ height: containerHeight }">
      <el-header class="header-container">
        <Transition name="fade" mode="out-in">
          <div :key="($route.params.id as string)" class="header-container-nav">
            <h1 class="header-container-title">
              {{
                $route.params.id
                  ? ($route.params.id as string).replaceAll("_", " ")
                  : "Flash Cards"
              }}
            </h1>

            <div v-if="!$route.params.id">
              <Icon
                :name="
                  userStore.user
                    ? 'mdi:logout-variant'
                    : 'mdi:account-circle-outline'
                "
                size="34px"
                @click="userAccount"
                class="header-icons"
                id="account-icon"
              />
            </div>
            <SvgHelp @click="showTutorial = true" />
            <Icon
              v-if="$route.params.id"
              name="mdi:arrow-left-drop-circle-outline"
              size="34px"
              @click="backToHome"
              class="header-icons"
            />
            <SvgSettings v-else @click="dialogSettings = true" />
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
        <component v-if="online" :is="footerToLoad" :switchLang="switchLang" />
        <component v-else :is="footerOffline" />
      </Transition>
    </el-container>
    <FormDialog
      v-model:value="dialogSettings"
      :doOnConfirm="registerSettings"
      :title="$t('settings.title')"
    >
      <div class="d-item">
        <span>{{ $t("settings.languages") }}:</span>
        <LazySetLanguage v-model:settings="settings" />
      </div>
      <div class="d-item">
        <span>{{ $t("settings.voiceSpeed") }}:</span>
        <Lazyel-slider
          v-model="settings.rate"
          :step="0.1"
          :min="0.6"
          :max="1.2"
          id="rate"
        />
      </div>

      <div class="d-item">
        <span>Memory Usage</span>
        <Icon
          name="mdi:trash-can-outline"
          size="34px"
          @click="deleteCache"
          style="cursor: pointer"
        />
      </div>
      <p>{{ $t("settings.cacheNote") }}</p>
    </FormDialog>
    <FormDialog
      v-model:value="account.show"
      :doOnConfirm="logUser"
      :title="account.signUp ? 'Sign-Up' : 'Sign-In'"
      :btnText="account.signUp ? 'Sign-Up' : 'Log-In'"
      :loadingBtn="account.loading"
    >
      <SignIn
        v-model:signUp="account.signUp"
        v-model:email="userData.email"
        v-model:name="userData.name"
        v-model:password="userData.password"
        :accountMessage="account.errorMessage"
        :loading="account.loading"
      />
    </FormDialog>
  </div>
</template>

<script setup lang="ts">
import footerNav from "@/components/TheFooterNav.vue";
import footerHome from "@/components/TheFooterHome.vue";
import footerOffline from "@/components/TheFooterOffLine.vue";

const cardsStore = useCardsStore();
const userStore = useUserStore();
const dialogSettings = ref(false);
const account = reactive({
  show: false,
  loading: false,
  signUp: false,
  errorMessage: "",
});
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const i18n = useI18n();
const settings = ref({
  from: "fr-FR",
  to: "km-KM",
  remember: 0,
  rate: 1,
});
const showTutorial = ref(false);
const route = useRoute();
const userData = ref({
  email: "test@mail.com",
  password: "azerty1",
  name: "",
});

const innerWidth = window.innerWidth;
const online = useOnline();
const innerHeight = ref(window.innerHeight);

onMounted(() => {
  settings.value = { ...cardsStore.languages };

  const styleBody = (document.querySelector("#app_container") as HTMLElement)
    .style;
  innerWidth <= 1280
    ? (styleBody.marginInline = "0px")
    : (styleBody.marginInline = "300px");

  window.onresize = (event) => {
    innerHeight.value = window.innerHeight;
    useSetRootCss();
  };

  useSetRootCss();

  useServiceWorkerOnUpadte();
});
const footerToLoad = computed(() =>
  route.params.id && route.params.id != i18n.t("home.lastAdd")
    ? footerNav
    : footerHome
);
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

const switchLang = (e: Event) => {
  const { from, to } = settings.value;

  settings.value.from = to;
  settings.value.to = from;

  useAnimSwitchArrow(e);

  registerSettings(true);
};

const registerSettings = (payload: boolean) => {
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

const logUser = (payload: boolean) => {
  useUserSign(payload, userStore, userData, account);
};
// SHOW ACCOUNT CONNECTION OR UNLOG
const userAccount = () => {
  useUserAccount(userStore, account);
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
.d-item {
  display: flex;
  align-items: center;
  margin-block: 20px;
  & > span {
    width: 40%;
  }
}
</style>
