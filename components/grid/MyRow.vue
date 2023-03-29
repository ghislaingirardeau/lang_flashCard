<template>
  <div class="container_swipe">
    <div ref="el" class="block_swipe" @click="doDelete">
      <slot></slot>
      <div
        :id="idClass"
        class="block_swipe_card my-col-3 block_swipe_card-hide"
        style="background-color: yellow"
        @click="doDelete"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idClass: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const el = ref(null);
    const { isSwiping, direction, lengthX } = useSwipe(el, {
      passive: false,
      threshold: 0,
      onSwipeEnd(e, direction) {
        if (lengthX.value < -50) {
          document
            .getElementById(props.idClass)
            .classList.add("block_swipe_card-hide");
          return;
        }
        if (lengthX.value > 50) {
          document
            .getElementById(props.idClass)
            .classList.remove("block_swipe_card-hide");
          return;
        }
        if (
          lengthX.value > -50 &&
          lengthX.value < 50 &&
          !e.target.getAttribute("id")
        ) {
          console.log("go from the rest of box without swipe");
        }
        if (
          lengthX.value > -50 &&
          lengthX.value < 50 &&
          e.target.getAttribute("id")
        ) {
          console.log("get click from hiding box");
        }
      },
    });

    return { el, isSwiping, direction, lengthX };
  },
  methods: {
    doDelete() {
      console.log("delete");
    },
  },
};
</script>

<style lang="scss">
.container_swipe {
  position: relative;
}
.block_swipe {
  display: flex;
  width: 100%;
  height: 80px;
  background-color: red;
  &_card {
    border: 1px solid grey;

    height: 100%;
    transition: all 0.5s ease;
    &-hide {
      width: 0%;
    }
  }
}
.anim-icon {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 0%;
  height: 80px;
  background-color: rgb(246, 255, 0);
  transition: all 0.5s ease;
}
</style>
