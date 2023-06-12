<template>
  <div
    class="container-swipe container-swipe-flex"
    @touchstart.passive="startDrag"
    @touchend.passive="endDrag"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const emit: Function = defineEmits();
const scrollStartX = ref(0);
const scrollStartY = ref(0);
const cardsStore = useCardsStore();
const localePath = useLocalePath();
const route = useRoute();

const onRouteHome = computed(() => {
  return route.params.id ? false : true;
});

const idCard = (id: string) => {
  return route.params.id
    ? cardsStore.cardItems[route.params.id as string].find(
        (e) => e.id === parseInt(id)
      )
    : cardsStore.cards.find((e) => e.id === parseInt(id));
};

const doOnClickDelete = (param: string, id: number, remember: boolean) => {
  param
    ? cardsStore.removeCard(param, id)
    : cardsStore.removeItem(route.params.id as string, id, remember);
};

const startDrag = (event: TouchEvent) => {
  scrollStartX.value = event.changedTouches[0].clientX;
  scrollStartY.value = event.changedTouches[0].clientY;
};
const endDrag = (event: TouchEvent) => {
  const defineTouchX = event.changedTouches[0].clientX - scrollStartX.value;
  const defineTouchY = event.changedTouches[0].clientY - scrollStartY.value;

  // get id to find the elements
  let elementWithId = useFindEltId(event.target as HTMLElement) as string;

  //swipe left: show icon
  if (defineTouchX < -50) {
    useAnimDeleteIcon(
      elementWithId.replace("card-", ""),
      onRouteHome.value,
      "remove",
      "add"
    );
    return;
  }
  //swipe right: hide icon
  if (defineTouchX > 50) {
    useAnimDeleteIcon(
      elementWithId.replace("card-", ""),
      onRouteHome.value,
      "add",
      "remove"
    );
    return;
  }

  // FEAT REMOVE BECAUSE ALREADY CALL WITH THE CLICK ON ROW COMPONENT
  // on touch TAP
  /* if (defineTouchY === 0 && defineTouchX === 0) {
    // get the first parent with an id
    let cardDetails: Cards;

    if (elementWithId.includes("delete-")) {
      // if id includes swipe = so it's a click on delete block
      cardDetails = idCard(elementWithId.replace("delete-", "")) as Cards;
      doOnClickDelete(cardDetails.title, cardDetails.id, false);
      return;
    }
    if (elementWithId.includes("remember-")) {
      // if id includes swipe = so it's a click on delete block
      cardDetails = idCard(elementWithId.replace("remember-", "")) as Cards;
      doOnClickDelete(cardDetails.title, cardDetails.id, true);
      return;
    }
    if (elementWithId.includes("card-")) {
      // if on home route
      if (onRouteHome.value) {
        cardDetails = idCard(elementWithId.replace("card-", "")) as Cards;
        return navigateTo(
          localePath({
            name: "card-id",
            params: { id: cardDetails.title },
          })
        );
      } else {
        // if on id route
        // common with row click
        document
          .getElementById(`delete-${elementWithId.replace("card-", "")}`)
          ?.classList.add("hide");
        document
          .getElementById(`remember-${elementWithId.replace("card-", "")}`)
          ?.classList.add("hide");
        useTextToPlay(
          event,
          parseInt(elementWithId.replace("card-", "")),
          emit
        );
        return;
      }
    }
  } */
};

interface Cards {
  createOn: number;
  id: number;
  lastUpdate: number;
  title: string;
}
</script>

<style lang="scss" scoped>
.container-swipe-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
