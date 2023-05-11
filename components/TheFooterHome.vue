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
