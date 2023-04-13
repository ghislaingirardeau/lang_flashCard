<template>
  <div
    class="block_swipe"
    :id="`card-${idClass.id}`"
    :class="[defineRoute ? 'block_swipe_home' : 'block_swipe_id']"
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
  margin: 0px;
  width: 100%;
  border-bottom: 1px solid white;
  &_home {
    margin: 10px 5px;
    width: 45%;
    background-color: $colorFourth;
    border: 1px solid rgba($colorThird, 0.6);
    border-radius: 20px 10px;
    box-shadow: rgba($colorThird, 0.4) 0px 2px 4px,
      rgba($colorThird, 0.3) 0px 7px 13px -3px,
      rgba($colorThird, 0.5) 0px -3px 0px inset;
  }
  &_id {
    margin: 8px 5px;
    width: 95%;
    background-color: $colorFourth;
    border-radius: 5px 0px 0px 10px;
    box-shadow: rgba($colorThird, 0.2) 0px 0px 0px 2px,
      rgba($colorThird, 0.65) 0px 4px 6px -1px,
      rgba($colorSecondary, 0.08) 0px 1px 0px inset;
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
    padding: 3px 3px;
    &-hide {
      border-left: 2px solid $colorFith;
      background-color: $colorPrimary;
      border-radius: 70% 0% 0% 40%;
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
