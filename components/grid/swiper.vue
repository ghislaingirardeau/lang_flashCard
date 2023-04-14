<template>
  <div
    class="container-swipe container-swipe-flex"
    @touchstart.prevent="startDrag"
    @touchend.prevent="endDrag"
    @touchmove.prevent="scrollElement"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const scrollStartX = ref(null);
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
        ? cardsStore.cardItems[route.params.id].find(
            (e) => e.id === parseInt(id)
          )
        : cardsStore.cards.find((e) => e.id === parseInt(id));
    };

    const doOnClickDelete = (param, id) => {
      param
        ? cardsStore.removeCard(param, id)
        : cardsStore.removeItem(route.params.id, id);
    };

    onMounted(() => {
      useScrollTo("auto");
    });

    return {
      scrollStartX,
      scrollEndY,
      scrollStartY,
      idCard,
      doOnClickDelete,
      onRouteHome,
      localePath,
    };
  },
  methods: {
    startDrag(event) {
      this.scrollStartX = event.changedTouches[0].clientX;
      this.scrollStartY = event.changedTouches[0].clientY;
    },
    endDrag(event) {
      const defineTouchX = event.changedTouches[0].clientX - this.scrollStartX;
      const defineTouchY = event.changedTouches[0].clientY - this.scrollStartY;

      // get id to find the elements
      let elementWithId = useFindEltId(event.target);
      // set scrollendY = so when swipe again, it start from where it ended
      // stop counting when the scroll is over the main container
      if (defineTouchX > -50 && defineTouchX < 50) {
        let newScroll =
          this.scrollEndY +
          (event.changedTouches[0].clientY - this.scrollStartY);
        if (newScroll < 0) {
          this.scrollEndY = 0;
        } else if (newScroll > useGetMainHeightScroll(this.onRouteHome)) {
          this.scrollEndY = useGetMainHeightScroll(this.onRouteHome);
        } else {
          this.scrollEndY = newScroll;
        }
      }

      // on touch TAP
      if (defineTouchY === 0 && defineTouchX === 0) {
        // get the first parent with an id
        let cardDetails;

        if (elementWithId.includes("swipe-")) {
          // if id includes swipe = so it's a click on delete block
          cardDetails = this.idCard(elementWithId.replace("swipe-", ""));
          this.doOnClickDelete(cardDetails.title, cardDetails.id);
          return;
        }
        if (elementWithId.includes("card-")) {
          // if on home route
          if (this.onRouteHome) {
            cardDetails = this.idCard(elementWithId.replace("card-", ""));
            return navigateTo(
              this.localePath({
                name: "card-id",
                params: { id: cardDetails.title },
              })
            );
          } else {
            // if on id route
            let textToTranslate =
              event.target.tagName === "DIV"
                ? event.target
                : event.target.parentNode;

            let side = textToTranslate.className.includes("text-left")
              ? "left"
              : "right";

            const index = textToTranslate.innerText.indexOf("\n");
            index === -1
              ? (textToTranslate = textToTranslate.innerText)
              : (textToTranslate = textToTranslate.innerText.slice(0, index));

            this.$emit("onTapPlay", {
              id: parseInt(elementWithId.replace("card-", "")),
              textToTranslate,
              side,
            });
            return;
          }
        }
      }
    },
    scrollElement(event) {
      const defineTouchY = event.changedTouches[0].clientY - this.scrollStartY;
      const defineTouchX = event.changedTouches[0].clientX - this.scrollStartX;
      // if scrollY long enough detected

      let elementWithId = useFindEltId(event.target);

      // si tu scroll sur un coté : hide or unhide the delete option et tu arretes la fonction
      if (defineTouchX > 50) {
        document
          .getElementById(`swipe-${elementWithId.replace("card-", "")}`)
          ?.classList.add("hide");
        return;
      }
      if (defineTouchX < -50) {
        document
          .getElementById(`swipe-${elementWithId.replace("card-", "")}`)
          ?.classList.remove("hide");
        return;
      }

      // scroll vertical
      if (
        (defineTouchY < -10 || defineTouchY > 10) &&
        (defineTouchX > -50 || defineTouchX < 50)
      ) {
        document.querySelector(".el-main").scroll(
          0,
          this.scrollEndY +
            (event.changedTouches[0].clientY - this.scrollStartY) // position it ended + dynamic scroll - depart position of the scroll
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-swipe-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
