<template>
  <div :class="className">
    <img src="@/assets/arrow_up.svg" alt="" :class="className + '-arrowup'" />
    <div :class="className + '-contentUp'">
      <slot name="contentUp"></slot>
    </div>
    <div :class="className + '-contentDown'">
      <slot name="contentDown"></slot>
    </div>
    <img src="@/assets/arrow4.svg" alt="" :class="className + '-arrowdown'" />
  </div>
</template>

<script setup>
const props = defineProps({
  className: {
    required: true,
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
