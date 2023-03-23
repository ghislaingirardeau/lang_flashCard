<template>
  <div>
    <div
      @touchstart.prevent="startDrag($event)"
      @touchend.prevent="endDrag($event)"
      class="block-test"
    ></div>
    <div>{{ touch }}</div>
    <button @click="startDrag">play</button>
    <div ref="el" class="block-swipe" @touchstart="swipe">Swipe here</div>
  </div>
</template>

<script>
import soundStart from "@/assets/sound/start.wav";
import soundStop from "@/assets/sound/stop.wav";
export default {
  setup() {
    const el = ref(null);
    const recognition = reactive(null);
    const touch = ref(false);
    const touchBeg = ref(null);
    const swipe = (e) => {
      const { isSwiping, direction, lengthX } = useSwipe(e.target);
      console.log(isSwiping, direction, lengthX);
    };
    return {
      el,
      recognition,
      /* isSwiping,
      direction,
      lengthX, */
      touch,
      swipe,
    };
  },
  methods: {
    startDrag($event) {
      this.touchBeg = $event.changedTouches[0].clientX;
    },
    endDrag($event) {
      console.log($event.changedTouches[0].clientX - this.touchBeg);
    },
  },
};
</script>

<style lang="scss" scoped>
.block-test {
  background-color: red;
  width: 300px;
  height: 200px;
}
.block-swipe {
  background-color: rgb(0, 119, 255);
  width: 100%;
  height: 80px;
}
</style>
