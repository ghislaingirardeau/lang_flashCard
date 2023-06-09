<template>
  <div class="footer_container footer_container-home">
    <div class="footer_container-home-text">
      <p>
        {{ $t("footer.total") }} : {{ total }} / {{ $t("footer.remember") }} :
        {{ remember }}
      </p>
      <p>{{ userName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const cardsStore = useCardsStore();
const userStore = useUserStore();

const total = computed(() => {
  return cardsStore.totalWord as number;
});

const remember = computed(() => {
  return cardsStore.languages.remember ? cardsStore.languages.remember : 0;
});
const userName = computed(() => {
  return userStore.user?.name ? "Welcome " + userStore.user.name : "";
});
</script>

<style lang="scss" scoped></style>
