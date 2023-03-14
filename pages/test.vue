<template>
  <div>
    <div @touchstart="startDrag" @touchend="endDrag" class="block-test"></div>
    <div>{{ touch }}</div>
    <button @click="startDrag">play</button>
    <div ref="el" class="block-swipe">Swipe here</div>
    <div>{{ lengthX }} {{ direction }}</div>
  </div>
</template>

<script>
import soundStart from "@/assets/sound/start.wav";
import soundStop from "@/assets/sound/stop.wav";
export default {
  setup() {
    const el = ref(null);
    const { isSwiping, direction, lengthX } = useSwipe(el);
    const touch = ref(false);
    return {
      el,
      isSwiping,
      direction,
      lengthX,
      touch,
    };
  },
  methods: {
    startDrag() {
      this.touch = true;
    },
    endDrag() {
      this.touch = false;
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
