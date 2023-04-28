<template>
  <div class="block_swipe_card" :class="classCol">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  col: {
    required: true,
    type: Number,
  },
});
const classCol = computed(() => {
  return `my-col-${props.col}`;
});
</script>

<style lang="scss">
.my-col-12 {
  width: 100%;
}
.my-col-10 {
  width: 83.33%;
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
