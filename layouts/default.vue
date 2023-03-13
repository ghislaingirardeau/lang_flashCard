<template>
  <div class="common-layout">
    <el-container :style="{ height: containerHeight }">
      <el-header class="header-container">
        <span class="text-large font-800 ml-5"> {{ title }} </span>
        <Icon
          v-if="showGoBack === 'card-id'"
          name="mdi:arrow-left-drop-circle-outline"
          size="34px"
          color="white"
          @click="$router.back()"
          class="goBack"
        />
      </el-header>
      <el-container class="main-container">
        <el-main><slot /></el-main>
      </el-container>
      <el-footer class="footer-container"> gg </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute();
    const { height } = useWindowSize();

    const containerHeight = computed(() => {
      return height.value + "px";
    });

    const showGoBack = computed(() => {
      console.log(route.params);
      return route.name;
    });

    const title = computed(() => {
      return route.params.id ? route.params.id : "Home";
    });

    return {
      title,
      showGoBack,
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
  height: 10%;
}
.main-container {
  height: 80%;
}
.footer-container {
  background-color: $btnColor;
  padding-top: 10px;
  position: relative;
  height: 10%;
}
.goBack {
  position: absolute;
  right: 20px;
  z-index: 9999;
}
</style>
