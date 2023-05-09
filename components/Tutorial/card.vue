<template>
  <div class="modal_tuto">
    <TutorialArrowContent className="modal_tuto-recorder" v-if="tutoPage === 1">
      <template #contentUp>
        <h2>Translate with voice</h2>
      </template>
      <template #contentDown>
        <h2>Translate with keyboard</h2>
      </template>
    </TutorialArrowContent>
    <div class="modal_tuto-word" v-if="tutoPage === 2">
      <Icon
        :name="
          isTouchable
            ? 'material-symbols:swipe-outline'
            : 'fluent:cursor-hover-24-regular'
        "
        size="54px"
        color="white"
        class="modal_tuto-word-swipe"
      />
      <div class="modal_tuto-word-contentLeft">
        <p>
          Show options icons : <br />
          Delete or Good*
        </p>
        <span>
          *Good means that you remember the word now, so you don't need it
          anymore. The app will count as a word you remember to see your
          progress
        </span>
      </div>
    </div>
    <div class="modal_tuto-word" v-if="tutoPage === 3">
      <div class="modal_tuto-word-contentRight">
        <h2>Listen to the word</h2>
        <p>You can change the rate inside settings, to listen it slowly</p>
      </div>
      <Icon
        :name="isTouchable ? 'ph:hand-tap' : 'ic:outline-ads-click'"
        size="54px"
        color="white"
        class="modal_tuto-word-tap"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tutoPage: {
    required: true,
    type: Number,
  },
});
const isTouchable = computed(() => {
  return navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
});
</script>

<style lang="scss" scoped></style>
