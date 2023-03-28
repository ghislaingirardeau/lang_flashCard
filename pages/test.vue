<template>
  <div>
    <SwipeTest v-for="card in loadCards" :key="card.id" :idClass="card.id">
      <div class="block_swipe_card block_swipe_card-md">{{ card.title }}</div>
      <div class="block_swipe_card block_swipe_card-sm"></div>
      <div class="block_swipe_card block_swipe_card-sm"></div>
    </SwipeTest>
    <div id="test-main"></div>
  </div>
</template>

<script>
export default {
  setup() {
    const cardsStore = useCardsStore();
    const loadCards = computed(() => {
      return cardsStore.cards;
    });
    onMounted(() => {
      console.log("object");
      const newElt = document.createElement("div");
      newElt.className = "test-div-child";
      let elt = document.getElementById("test-main");
      elt.appendChild(newElt);
      newElt.innerHTML = "Prix: ";
    });
    return { loadCards };
  },
};
</script>

<style lang="scss">
#test-main {
  width: 100%;
  height: 50px;
  background-color: aqua;
}
.test-div-child {
  width: 50%;
  height: 50px;
  background-color: rgb(255, 0, 208);
}
</style>
