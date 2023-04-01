<template>
  <div
    class="container-swipe"
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
    const scrollEnd = ref(0);
    const cardsStore = useCardsStore();
    const localePath = useLocalePath();
    const route = useRoute();

    const idCard = (id) => {
      return route.params.id
        ? cardsStore.cardItems[route.params.id].find((e) => e.id === id)
        : cardsStore.cards.find((e) => e.id === id);
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
      let eltId = event.target.parentNode.id;

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
      if (defineTouchX > 30 && (defineTouchY > -20 || defineTouchY < 20)) {
        document.getElementById(`swipe-${eltId}`)?.classList.add("hide");
        return;
      }
      if (defineTouchX < -30 && (defineTouchY > -20 || defineTouchY < 20)) {
        document.getElementById(`swipe-${eltId}`)?.classList.remove("hide");
        return;
      }

      // on touch TAP
      if (defineTouchY === 0 && defineTouchX === 0) {
        const getTarget = event.target.nodeName;
        let eltAsParam;
        // fetch che title & id of the parentElement depending the target element
        const getElementDetail = (target) => {
          let id = parseInt(target.id.replace("swipe-", ""));
          eltAsParam = this.idCard(id).title;
          return [eltAsParam, id];
        };
        if (getTarget === "svg") {
          this.doOnClickDelete(...getElementDetail(event.target.parentNode));
        } else if (getTarget === "path") {
          this.doOnClickDelete(
            ...getElementDetail(event.target.parentNode.parentNode)
          );
        } else if (event.target.id.includes("swipe-")) {
          this.doOnClickDelete(...getElementDetail(event.target));
        } else {
          event.target.id
            ? (eltAsParam = this.idCard(parseInt(event.target.id)))
            : (eltAsParam = this.idCard(parseInt(eltId)));
          this.doOnTap(eltAsParam);
        }
      }
    },
    scrollElement(event) {
      const defineTouchY = event.changedTouches[0].clientY - this.scrollStartY;
      // if scrollY long enough detected
      if (defineTouchY < -10 || defineTouchY > 10) {
        document.querySelector(".el-main").scroll(
          0,
          this.scrollEnd + (event.changedTouches[0].clientY - this.scrollStartY) // position it ended + dynamic scroll - depart position of the scroll
        );
      }
    },
  },
};
</script>

<style lang="scss"></style>
