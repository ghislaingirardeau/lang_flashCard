<template>
  <div class="block_swipe" :id="`${idClass.id}`">
    <slot></slot>
    <div
      :id="`swipe-${idClass.id}`"
      class="block_swipe_card my-col-2 block_swipe_card-hide hide"
    >
      <Icon
        name="mdi:trash-can-outline"
        size="34px"
        class="block_swipe_card-icon"
      />
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
  },
  setup(props) {
    return {};
  },
};
</script>

<style lang="scss">
.block_swipe {
  display: flex;
  width: 100%;
  min-height: 60px;
  border-bottom: 1px solid white;
  &_card {
    min-height: 60px;
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
