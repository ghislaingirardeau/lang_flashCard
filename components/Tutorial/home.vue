<template>
  <div class="modal_tuto">
    <TutorialArrowContent
      className="modal_tuto-cardSwitch"
      v-if="tutoPage === 1"
    >
      <template #contentUp>
        <h2>Add a new card</h2>
        <p>Name your carte by what it's gonna contain</p>
      </template>
      <template #contentDown>
        <h2>Switch the language</h2>
        <p>If you want to save words from your new language</p>
      </template>
    </TutorialArrowContent>
    <TutorialArrowContent
      className="modal_tuto-lastRemember"
      v-if="tutoPage === 2"
    >
      <template #contentUp>
        <h2>See quickly your last added word</h2>
      </template>
      <template #contentDown>
        <h2>Numbers of word you consider as known</h2>
      </template>
    </TutorialArrowContent>
  </div>
</template>

<script setup>
const props = defineProps({
  tutoPage: {
    required: true,
    type: Number,
  },
});
</script>

<style lang="scss" scoped></style>
