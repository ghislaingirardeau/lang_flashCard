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

<script setup>
const i18n = useI18n();
// SET HEAD FOR I18N SEO
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
useHead({
  title: i18n.t("headTag.title"),
  htmlAttrs: {
    ...head.value.htmlAttrs,
  },
  meta: [
    {
      hid: "description",
      name: "description",
      content: i18n.t("headTag.content"),
    },
    ...head.value.meta,
  ],
  link: [...head.value.link],
});
</script>
