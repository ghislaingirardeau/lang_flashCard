<template>
  <div
    class="block_swipe"
    :id="`card-${idClass.id}`"
    :class="{ 'block_swipe-display': defineRoute }"
  >
    <slot></slot>
    <div
      :id="`swipe-${idClass.id}`"
      class="block_swipe_card my-col-2 hide"
      :class="{
        'block_swipe_card-hide-bis': defineRoute,
        'block_swipe_card-hide': !defineRoute,
      }"
    >
      <Icon :name="`${append}`" size="34px" />
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
    const route = useRoute();
    const defineRoute = computed(() => {
      return route.params.id ? false : true;
    });
    return { defineRoute };
  },
};
</script>

<style lang="scss">
.block_swipe {
  display: flex;
  min-height: 60px;
  margin: 0px;
  width: 100%;
  border-bottom: 1px solid white;
  &-display {
    margin: 10px 5px;
    width: 45%;
    background-color: $colorFourth;
    border: 1px solid $colorThird;
    border-radius: 20px 10px;
    box-shadow: rgba($colorThird, 0.4) 0px 2px 4px,
      rgba($colorThird, 0.3) 0px 7px 13px -3px,
      rgba($colorThird, 0.5) 0px -3px 0px inset;
  }
  &_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    text-align: center;
    font-size: 16px;
    transition: all 0.5s ease;
    padding: 0px 5px;
    word-break: break-all;
    &-hide {
      border: 2px solid $colorPrimary;
      background-color: $colorPrimary;
      border-radius: 70% 0% 0% 40%;
      height: 50px;
      & > svg {
        color: $colorFourth;
      }
    }
    &-hide-bis {
      height: 50px;
      & > svg {
        color: $colorPrimary;
      }
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
}
</style>
