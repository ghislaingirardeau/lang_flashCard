<template>
  <div
    class="container-swipe container-swipe-flex"
    @touchstart.prevent="startDrag"
    @touchend.prevent="endDrag"
    @touchmove.passive="scrollElement"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const emit = defineEmits();
const scrollStartX = ref(0);
const scrollStartY = ref(0);
const scrollEndY = ref(0);
const cardsStore = useCardsStore();
const localePath = useLocalePath();
const route = useRoute();

const onRouteHome = computed(() => {
  return route.params.id ? false : true;
});

const idCard = (id) => {
  return route.params.id
    ? cardsStore.cardItems[route.params.id].find((e) => e.id === parseInt(id))
    : cardsStore.cards.find((e) => e.id === parseInt(id));
};

const doOnClickDelete = (param, id, remember) => {
  param
    ? cardsStore.removeCard(param, id)
    : cardsStore.removeItem(route.params.id, id, remember);
};

const startDrag = (event) => {
  scrollStartX.value = event.changedTouches[0].clientX;
  scrollStartY.value = event.changedTouches[0].clientY;
};
const endDrag = (event) => {
  const defineTouchX = event.changedTouches[0].clientX - scrollStartX.value;
  const defineTouchY = event.changedTouches[0].clientY - scrollStartY.value;

  // get id to find the elements
  let elementWithId = useFindEltId(event.target);
  // set scrollendY = so when swipe again, it start from where it ended
  // stop counting when the scroll is over the main container
  if (defineTouchX > -50 && defineTouchX < 50) {
    let newScroll =
      scrollEndY.value + (event.changedTouches[0].clientY - scrollStartY.value);
    if (newScroll < 0) {
      scrollEndY.value = 0;
    } else if (newScroll > useGetMainHeightScroll(onRouteHome.value)) {
      scrollEndY.value = useGetMainHeightScroll(onRouteHome.value);
    } else {
      scrollEndY.value = newScroll;
    }
  }

  // on touch TAP
  if (defineTouchY === 0 && defineTouchX === 0) {
    // get the first parent with an id
    let cardDetails;

    if (elementWithId.includes("delete-")) {
      // if id includes swipe = so it's a click on delete block
      cardDetails = idCard(elementWithId.replace("delete-", ""));
      doOnClickDelete(cardDetails.title, cardDetails.id, false);
      return;
    }
    if (elementWithId.includes("remember-")) {
      // if id includes swipe = so it's a click on delete block
      cardDetails = idCard(elementWithId.replace("remember-", ""));
      doOnClickDelete(cardDetails.title, cardDetails.id, true);
      return;
    }
    if (elementWithId.includes("card-")) {
      // if on home route
      if (onRouteHome.value) {
        cardDetails = idCard(elementWithId.replace("card-", ""));
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
  }
};

const scrollElement = (event) => {
  const defineTouchY = event.changedTouches[0].clientY - scrollStartY.value;
  const defineTouchX = event.changedTouches[0].clientX - scrollStartX.value;
  // if scrollY long enough detected

  let elementWithId = useFindEltId(event.target);

  // si tu scroll sur un coté : hide or unhide the delete option et tu arretes la fonction
  if (defineTouchX > 50) {
    console.log("hide");
    useAnimDeleteIcon(
      elementWithId.replace("card-", ""),
      onRouteHome.value,
      "add",
      "remove"
    );
    return;
  }
  if (defineTouchX < -50) {
    console.log("show");
    useAnimDeleteIcon(
      elementWithId.replace("card-", ""),
      onRouteHome.value,
      "remove",
      "add"
    );
    return;
  }

  // scroll vertical
  if (
    (defineTouchY < -10 || defineTouchY > 10) &&
    (defineTouchX > -50 || defineTouchX < 50)
  ) {
    document.querySelector(".el-main").scroll(
      0,
      scrollEndY.value + (event.changedTouches[0].clientY - scrollStartY.value) // position it ended + dynamic scroll - depart position of the scroll
    );
  }
};

onMounted(() => {
  useScrollTo("auto");
});
</script>

<style lang="scss" scoped>
.container-swipe-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
