<template>
  <div class="block_swipe_card" :class="classCol">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    col: {
      required: true,
      type: Number,
    },
  },
  computed: {
    classCol() {
      return `my-col-${this.col}`;
    },
  },
};
</script>

<style lang="scss">
.my-col-12 {
  width: 100%;
}
.my-col-8 {
  width: 66.66%;
}
.my-col-6 {
  width: 50%;
}
.my-col-5 {
  width: 41.66%;
}
.my-col-4 {
  width: 33.33%;
}
.my-col-3 {
  width: 25%;
}
.my-col-2 {
  width: 16.66%;
}
</style>
