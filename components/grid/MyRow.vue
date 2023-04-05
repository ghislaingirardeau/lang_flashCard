<template>
  <div class="block_swipe" :id="`${idClass.id}`">
    <slot></slot>
    <div
      :id="`swipe-${idClass.id}`"
      class="block_swipe_card my-col-2 block_swipe_card-hide hide"
    >
      <Icon :name="`mdi:${append}`" size="34px" class="block_swipe_card-icon" />
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
    append: {
      required: true,
      type: String,
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    text-align: center;
    font-size: 20px;
    transition: all 0.5s ease;
    padding: 0px 5px;
    &-hide {
      border: 2px solid $colorPrimary;
      background-color: $colorPrimary;
      border-radius: 70% 0% 0% 40%;
      height: 50px;
      /* transform: translateX(0); */
    }
    &-icon {
      color: $colorFourth;
    }
    &-text {
      font-size: 12px;
    }
  }
}
.hide {
  width: 0%;
  overflow: hidden;
  opacity: 0;
  /* transform: translateX(50px); */
}
</style>
