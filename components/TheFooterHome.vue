<template>
  <el-footer class="footer_container footer_container-home">
    <div class="footer_container-home-text">
      <p v-if="remember > 0">
        {{ $t("footer.remember") }}
        {{ remember }}
        {{ $t("footer.word") }}
      </p>
      <p>By gG web dev</p>
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

const remember = computed(() => {
  return cardsStore.languages.remember
    ? cardsStore.languages.remember
    : undefined;
});
</script>

<style lang="scss" scoped></style>
