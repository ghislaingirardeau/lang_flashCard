<template>
  <div class="modal_tuto">
    <TutorialArrowContent className="modal_tuto-recorder" v-if="tutoPage === 1">
      <template #contentUp>
        <h2>{{ $t("tutorial.card.page1.contentUp") }}</h2>
      </template>
      <template #contentDown>
        <h2>{{ $t("tutorial.card.page1.contentDown") }}</h2>
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
        <p v-html="$t('tutorial.card.contentLeft.text')"></p>
        <span>
          {{ $t("tutorial.card.contentLeft.comment") }}
        </span>
      </div>
    </div>
    <div class="modal_tuto-word" v-if="tutoPage === 3">
      <div class="modal_tuto-word-contentRight">
        <h2>{{ $t("tutorial.card.contentRight.title") }}</h2>
        <p>{{ $t("tutorial.card.contentRight.text") }}</p>
      </div>
      <Icon
        :name="isTouchable ? 'ph:hand-tap' : 'ic:outline-ads-click'"
        size="54px"
        color="white"
        class="modal_tuto-word-tap"
      />
      <div class="modal_tuto-switch-contentDown">
        <h2>{{ $t("tutorial.home.page1.contentDown.title") }}</h2>
        <p>{{ $t("tutorial.home.page1.contentDown.text") }}</p>
      </div>
      <img
        src="@/assets/arrow4.svg"
        alt=""
        class="modal_tuto-switch-arrowdown"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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
