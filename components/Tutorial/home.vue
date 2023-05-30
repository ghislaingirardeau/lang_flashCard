<template>
  <div class="modal_tuto">
    <TutorialArrowContent className="modal_tuto-card" v-if="tutoPage === 1">
      <template #contentUp>
        <h2>{{ $t("tutorial.home.page1.contentUp.title") }}</h2>
        <p>{{ $t("tutorial.home.page1.contentUp.text") }}</p>
      </template>
      <!-- <template #contentDown>
        <h2>{{ $t("tutorial.home.page1.contentDown.title") }}</h2>
        <p>{{ $t("tutorial.home.page1.contentDown.text") }}</p>
      </template> -->
    </TutorialArrowContent>
    <TutorialArrowContent
      className="modal_tuto-lastRemember"
      v-if="tutoPage === 2"
    >
      <template #contentUp>
        <h2>{{ $t("tutorial.home.page2.contentUp") }}</h2>
      </template>
      <template #contentDown>
        <h2>{{ $t("tutorial.home.page2.contentDown") }}</h2>
      </template>
    </TutorialArrowContent>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tutoPage: {
    required: true,
    type: Number,
  },
});
</script>

<style lang="scss" scoped></style>
