<template>
  <el-footer class="footer_container footer_container-home">
    <div class="footer_container-home-text">
      <p v-if="remember > 0">
        {{ $t("footer.remember") }}
        {{ remember }}
        {{ $t("footer.word") }}
      </p>
      <p v-else>{{ $t("footer.title") }} gG web dev</p>
    </div>
    <div>
      <p>
        {{ langFrom }}
      </p>
      <!-- <Icon
        name="mdi:arrow-right-bold-outline"
        size="34px"
        class="switcher-lang switcher-lang-home"
        @click="switchLang"
      /> -->
      <svg
        data-v-4fa0a2a1=""
        @click="switchLang"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="icon switcher-lang switcher-lang-home"
        width="34px"
        height="34px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11 16H3V8h8V2l10 10l-10 10v-6m2-9v3H5v4h8v3l5-5l-5-5Z"
        ></path>
      </svg>
      <p>
        {{ langTo }}
      </p>
    </div>
  </el-footer>
</template>

<script setup>
const props = defineProps({
  switchLang: {
    type: Function,
    required: true,
  },
});
const cardsStore = useCardsStore();
const langTo = computed(() => {
  return cardsStore.langTo;
});
const langFrom = computed(() => {
  return cardsStore.langFrom;
});
const remember = computed(() => {
  return cardsStore.languages.remember
    ? cardsStore.languages.remember
    : undefined;
});
</script>

<style lang="scss" scoped></style>
