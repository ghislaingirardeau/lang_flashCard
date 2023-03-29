<template>
  <div>
    <GridMyRow v-for="card in loadCards" :key="card.id" :idClass="card.id">
      <GridMyCol :col="6">
        {{ card.title }}
      </GridMyCol>
      <GridMyCol :col="2"> {{ card.lastUpdate }}</GridMyCol>
      <GridMyCol :col="4"> {{ $t("home.translation") }}</GridMyCol>
    </GridMyRow>
  </div>
</template>

<script>
export default {
  setup() {
    const cardsStore = useCardsStore();
    const loadCards = computed(() => {
      return cardsStore.cards;
    });
    return { loadCards };
  },
};
</script>

<style lang="scss"></style>
