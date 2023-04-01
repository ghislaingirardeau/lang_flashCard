<template>
  <GridSwiper>
    <GridMyRow v-for="card in loadCards" :key="card.id" :idClass="card">
      <GridMyCol :col="6">
        {{ card.title }}
      </GridMyCol>
      <GridMyCol :col="6"> {{ $t("home.translation") }}</GridMyCol>
    </GridMyRow>
  </GridSwiper>
</template>

<script>
export default {
  setup(props) {
    const cardsStore = useCardsStore();

    const loadCards = computed(() => {
      return cardsStore.cards;
    });

    return { loadCards };
  },
};
</script>

<style lang="scss"></style>
