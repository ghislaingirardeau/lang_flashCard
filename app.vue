<template>
  <div>
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

<script setup></script>

<style lang="scss">
body {
  margin: 0px;
}
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
