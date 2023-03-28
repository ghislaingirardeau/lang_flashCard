<template>
  <div class="container_swipe">
    <div ref="el" class="block_swipe" id="myblock_swipe" @click="doDelete">
      <slot></slot>
      <div
        :id="idClass"
        class="block_swipe_card block_swipe_card-sm block_swipe_card-hide"
        @click="doDelete"
      ></div>
    </div>
    <!-- <div :id="idClass" class="anim-icon" @click="doDelete">delete</div> -->
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
      /* onSwipeStart(e) {
        if (lengthX.value === 0) {
          console.log(isSwiping.value);
        }
      }, */
      onSwipeEnd(e, direction) {
        if (lengthX.value < -50) {
          /* e.target.style.width = `100%`; */
          document
            .getElementById(props.idClass)
            .classList.add("block_swipe_card-hide");
          console.log(document.getElementById(props.idClass));
          return;
        }
        if (lengthX.value > 50) {
          /* e.target.style.width = `80%`; */
          document
            .getElementById(props.idClass)
            .classList.remove("block_swipe_card-hide");
          console.log(document.getElementById(props.idClass));
          return;
        }
        if (lengthX.value > -50 && lengthX.value < 50) {
          console.log("go to the route");
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
    &-sm {
      width: 25%;
    }
    &-md {
      width: 50%;
    }
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
