<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-container">
        <span class="text-large font-800 ml-5"> Nuxt 3 </span>
        <Icon
          v-if="showGoBack === 'card-id'"
          name="mdi:arrow-left-drop-circle-outline"
          size="34px"
          color="white"
          @click="$router.back()"
          class="goBack"
        />
      </el-header>
      <el-container>
        <el-main><slot /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute();
    const showGoBack = computed(() => {
      return route.name;
    });

    return {
      showGoBack,
    };
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.header-container {
  background-color: $btnColor;
  padding-top: 10px;
  position: relative;
}
.common-layout {
  width: 375px;
}
.goBack {
  position: absolute;
  right: 20px;
  z-index: 9999;
}
</style>
