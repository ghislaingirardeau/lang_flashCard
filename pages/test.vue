<template>
  <div class="swiper">
    <div v-for="i in array" class="block">{{ i }}</div>
  </div>
</template>

<script setup>
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<style lang="scss" scoped>
.swiper {
  height: 1800px;
  width: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.block {
  height: 150px;
  width: 80%;
  background-color: blue;
  margin-block: 10px;
}
</style>
