<template>
  <div
    class="block_swipe"
    :id="`card-${idClass.id}`"
    :class="[onRouteHome ? 'block_swipe_home' : 'block_swipe_id']"
    :style="{ width: rowWidth }"
    @click="onCardClick"
    @mouseover="onCardHover(true)"
    @mouseleave="onCardHover(false)"
  >
    <slot></slot>
    <div
      :id="`swipe-${idClass.id}`"
      class="block_swipe_card hide"
      :class="{
        'block_swipe_card-hide-bis': onRouteHome,
        'block_swipe_card-hide': !onRouteHome,
      }"
    >
      <Icon
        :name="`${append}`"
        size="34px"
        :class="{ 'anim-delete-enter': onRouteHome }"
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
    append: {
      required: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const localePath = useLocalePath();
    const cardsStore = useCardsStore();
    const breakpoints = useBreakpoints({
      lg: 800,
    });
    const onRouteHome = computed(() => {
      return route.params.id ? false : true;
    });

    const rowWidth = computed(() => {
      if (onRouteHome.value) {
        return breakpoints.smallerOrEqual("lg").value ? "45%" : "30%";
      } else {
        return breakpoints.smallerOrEqual("lg").value ? "95%" : "45%";
      }
    });
    console.log(rowWidth.value);
    const onCardClick = (event) => {
      let elementWithId = useFindEltId(event.target);
      if (onRouteHome.value) {
        return elementWithId.includes("swipe-")
          ? cardsStore.removeCard(props.idClass.title, props.idClass.id)
          : navigateTo(
              localePath({
                name: "card-id",
                params: { id: props.idClass.title },
              })
            );
      } else {
        // common with swiper touch
        return elementWithId.includes("swipe-")
          ? cardsStore.removeItem(route.params.id, props.idClass.id)
          : useTextToPlay(event, props.idClass.id, emit, cardsStore.languages);
      }
    };
    const onCardHover = (param) => {
      param
        ? useAnimDeleteIcon(
            props.idClass.id,
            onRouteHome.value,
            "remove",
            "add"
          )
        : useAnimDeleteIcon(
            props.idClass.id,
            onRouteHome.value,
            "add",
            "remove"
          );
    };

    return { onRouteHome, onCardClick, onCardHover, rowWidth };
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
    background-color: $colorFourth;
    border: 1px solid rgba($colorThird, 0.6);
    border-radius: 20px 10px;
    box-shadow: rgba($colorThird, 0.4) 0px 2px 4px,
      rgba($colorThird, 0.3) 0px 7px 13px -3px,
      rgba($colorThird, 0.5) 0px -3px 0px inset;
  }
  &_id {
    margin: 8px 5px;
    background-color: $colorFourth;
    border-radius: 5px 0px 0px 10px;
    box-shadow: rgba($colorThird, 0.2) 0px 0px 0px 2px,
      rgba($colorThird, 0.65) 0px 4px 6px -1px,
      rgba($colorSecondary, 0.08) 0px 1px 0px inset;
  }
  &_card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
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
      width: 16.66%;
      & > svg {
        color: $colorFourth;
      }
    }
    &-hide-bis {
      width: 25%;
      overflow: hidden;
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
  width: 0px;
  opacity: 0;
  padding: 0px;
  border: 0px;
  overflow: hidden;
}
.anim-delete-enter {
  opacity: 0;
  transform: rotateZ(0deg);
  transition: all 0.5s;
}
.anim-delete-leave {
  opacity: 1;
  transform: rotateZ(-90deg);
}
</style>
