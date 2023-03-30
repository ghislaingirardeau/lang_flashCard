<template>
  <div class="container_swipe">
    <!-- to prevent touch selecting text -->
    <div
      class="block_swipe"
      @touchstart.prevent="startDrag"
      @touchend.prevent="endDrag"
      @touchmove.prevent="scrollElement"
    >
      <slot></slot>
      <div
        :id="idClass.id"
        class="block_swipe_card my-col-2 block_swipe_card-hide hide"
      >
        <Icon
          name="mdi:trash-can-outline"
          size="34px"
          class="block_swipe_card-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idClass: {
      required: true,
      type: Object,
    },
    doOnTap: {
      type: Function,
    },
  },
  setup(props) {
    const route = useRoute();
    const cardsStore = useCardsStore();
    // Refactor do on click for props function !
    const doOnClickDelete = (title, id) => {
      "createOn" in props.idClass
        ? cardsStore.removeCard(title, id)
        : cardsStore.removeItem(route.params.id, id);
    };
    const touchBeg = ref(null);
    const touchEnd = ref(null);

    return { touchBeg, touchEnd, doOnClickDelete };
  },
  methods: {
    startDrag(event) {
      this.touchBeg = event.changedTouches[0].clientX;
      this.touchEnd = event.changedTouches[0].clientY;
    },
    endDrag(event) {
      const defineTouchX = event.changedTouches[0].clientX - this.touchBeg;
      const defineTouchY = event.changedTouches[0].clientY - this.touchEnd;
      let getTarget = event.target.nodeName;

      if (defineTouchX > 30) {
        document.getElementById(this.idClass.id).classList.add("hide");
        return;
      }
      if (defineTouchX < -30) {
        document.getElementById(this.idClass.id).classList.remove("hide");
        return;
      }
      if (getTarget === "svg" || getTarget === "path") {
        return this.doOnClickDelete(this.idClass.title, this.idClass.id);
      }
      if (defineTouchY === 0) {
        "createOn" in this.idClass
          ? this.$emit("doOnTap")
          : this.$emit("doOnTap", {
              id: this.idClass.id,
              to: this.idClass.to,
            });
      }
    },
    scrollElement(event) {
      const defineTouchY = event.changedTouches[0].clientY - this.touchEnd;
      if (defineTouchY < -15 || defineTouchY > 15) {
        document
          .querySelector(".el-main")
          .scrollTo(0, event.touches[0].clientY - 150);
      }
    },
  },
};
</script>

<style lang="scss">
.container_swipe {
  position: relative;
  width: 100%;
  border-bottom: 1px solid $colorThird;
  z-index: 1;
}
.block_swipe {
  display: flex;
  width: 100%;
  min-height: 60px;
  &_card {
    height: 100%;
    text-align: center;
    font-size: 20px;
    transition: all 0.5s ease;
    z-index: 10;
    &-hide {
      border: 2px solid $colorPrimary;
      border-radius: 70% 30% 40% 50%;
      height: 50px;
      margin: 3px 3px 0 0;
    }
    &-text {
      display: inline-block;
      margin-top: 15px;
    }
    &-icon {
      margin-top: 7px;
      color: $colorPrimary;
    }
  }
}
.hide {
  width: 0%;
  overflow: hidden;
  opacity: 0;
}
</style>
