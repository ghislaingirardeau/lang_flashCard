<template>
  <div
    class="container-swipe"
    @touchstart.prevent="startDrag"
    @touchend.prevent="endDrag"
    @touchmove.prevent="scrollElement"
    :class="{ 'container-swipe-flex': defineRoute }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const scrollStartX = ref(null);
    const scrollStartY = ref(0);
    const scrollEnd = ref(0);
    const cardsStore = useCardsStore();
    const localePath = useLocalePath();
    const route = useRoute();

    const defineRoute = computed(() => {
      return route.params.id ? false : true;
    });

    const idCard = (id) => {
      return route.params.id
        ? cardsStore.cardItems[route.params.id].find(
            (e) => e.id === parseInt(id)
          )
        : cardsStore.cards.find((e) => e.id === parseInt(id));
    };

    const doOnTap = (param) => {
      // if TAP touch come from home
      if (param.title)
        return navigateTo(
          localePath({
            name: "card-id",
            params: { id: param.title },
          })
        );
      // if TAP touch come from route id
      if (param.to) {
        emit("onTapPlay", {
          id: param.id,
          to: param.to,
        });
      }
    };

    const doOnClickDelete = (param, id) => {
      param
        ? cardsStore.removeCard(param, id)
        : cardsStore.removeItem(route.params.id, id);
    };

    return {
      scrollStartX,
      scrollEnd,
      scrollStartY,
      idCard,
      doOnTap,
      doOnClickDelete,
      defineRoute,
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
      const findUpEltId = (el) => {
        if (el.id) return el.id;
        while (el) {
          el = el.parentNode;
          if (el.id) return el.id;
        }
        return null;
      };
      let elementWithId = findUpEltId(event.target);

      // set scrollend = so when swipe again, it start from where it ended
      let newScroll =
        this.scrollEnd + (event.changedTouches[0].clientY - this.scrollStartY);
      if (newScroll < 0) {
        this.scrollEnd = 0;
      } else if (
        newScroll > document.querySelector(".container-swipe").clientHeight
      ) {
        this.scrollEnd =
          document.querySelector(".container-swipe").clientHeight;
      } else {
        this.scrollEnd = newScroll;
      }

      // si tu scroll sur un coté : hide or unhide the delete option
      if (defineTouchX > 50 && (defineTouchY > -50 || defineTouchY < 50)) {
        document
          .getElementById(`swipe-${elementWithId.replace("card-", "")}`)
          ?.classList.add("hide");
        return;
      }
      if (defineTouchX < -50 && (defineTouchY > -50 || defineTouchY < 50)) {
        document
          .getElementById(`swipe-${elementWithId.replace("card-", "")}`)
          ?.classList.remove("hide");
        return;
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
          // if no swipe but an id, click en the row
          cardDetails = this.idCard(elementWithId.replace("card-", ""));
          this.doOnTap(cardDetails);
          return;
        }
      }
    },
    scrollElement(event) {
      const defineTouchY = event.changedTouches[0].clientY - this.scrollStartY;
      const defineTouchX = event.changedTouches[0].clientX - this.scrollStartX;
      // if scrollY long enough detected
      if (
        (defineTouchY < -10 || defineTouchY > 10) &&
        (defineTouchX > -50 || defineTouchX < 50)
      ) {
        document.querySelector(".el-main").scroll(
          0,
          this.scrollEnd + (event.changedTouches[0].clientY - this.scrollStartY) // position it ended + dynamic scroll - depart position of the scroll
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
