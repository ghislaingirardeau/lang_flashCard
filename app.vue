<template>
  <VitePwaManifest />
  <!-- DEFINE LAYOUT = if pass name, available for all page -->
  <!-- OPT 1 <NuxtLayout name="default"> -->
  <!-- OPT 2 <NuxtLayout :name="layoutName"> -->
  <!-- OPT 3 if no name = it's default layout but can be change inside specific page-->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
