<template>
  <div id="app_container">
    <VitePwaManifest />
    <!-- DEFINE LAYOUT = if pass name, available for all page -->
    <!-- OPT 1 <NuxtLayout name="default"> -->
    <!-- OPT 2 <NuxtLayout :name="layoutName"> -->
    <!-- OPT 3 if no name = it's default layout but can be change inside specific page-->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const breakpoints = useBreakpoints({
  xl: 1280,
});
onMounted(() => {
  const styleBody = document.querySelector("#app_container").style;
  breakpoints.smallerOrEqual("xl").value
    ? (styleBody.marginInline = "0px")
    : (styleBody.marginInline = "300px");
});
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
