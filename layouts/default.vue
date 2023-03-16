<template>
  <div class="common-layout">
    <el-container :style="{ height: containerHeight }">
      <el-header class="header-container">
        <span class="header-container-title">
          {{ $route.params.id ? $route.params.id : "Home" }}
        </span>
        <el-divider direction="vertical" />
        <NuxtLink class="ml-5" :to="{ name: 'test' }">test </NuxtLink>
        <Transition name="fade">
          <Icon
            v-if="$route.name === 'card-id'"
            name="mdi:arrow-left-drop-circle-outline"
            size="34px"
            color="white"
            @click="$router.back()"
            class="goBack"
          />
        </Transition>
      </el-header>
      <el-container class="main-container">
        <el-main><slot /></el-main>
      </el-container>
      <Transition name="fade">
        <el-footer v-if="$route.params.id" class="footer-container">
          <!-- <MicRecord /> -->
          <InputRecord />
        </el-footer>
      </Transition>
    </el-container>
  </div>
</template>

<script>
export default {
  setup() {
    const { height } = useWindowSize();
    /* const cardsStore = useCardsStore();
    cardsStore.nuxtServerInit(); */

    const containerHeight = computed(() => {
      return height.value + "px";
    });

    return {
      containerHeight,
    };
  },
};
</script>

<style lang="scss">
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
  height: 80px;
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
