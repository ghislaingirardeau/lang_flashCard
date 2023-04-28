<template>
  <Icon name="mdi:loading" :size="size" :color="color" id="load--rotate" />
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
  },
  size: {
    required: true,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
#load--rotate {
  animation: rotate 1s both infinite;
}
@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotateZ(360deg);
    opacity: 0;
  }
}
</style>
