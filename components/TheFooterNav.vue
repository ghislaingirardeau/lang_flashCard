<template>
  <div class="container_footer_nav">
    <div class="footer_nav_btn footer_nav_btn-radius-left">
      <Icon
        name="material-symbols:keyboard-alt-outline"
        size="44px"
        color="#000814"
      />
    </div>
    <MicRecord />
    <div
      class="footer_nav_btn footer_nav_btn-radius-right"
      @click="playAllSound"
    >
      <TheLoader v-if="loader === 1" size="44px" color="#000814" />
      <Icon v-else name="mdi:play-outline" size="54px" color="#000814" />
    </div>
  </div>
</template>

<script>
import { usePlaySound } from "~~/composables/playSound";
export default {
  setup() {
    const route = useRoute();
    const loader = ref(0);
    const cardsStore = useCardsStore();
    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playAllSound = async () => {
      const allText = loadCard.value
        .map((e) => e.to)
        .toString()
        .replace(",", " ");

      usePlaySound(loader, { to: allText });
    };
    return { loader, playAllSound };
  },
};
</script>

<style lang="scss" scoped>
.container_footer_nav {
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: flex-end;
}
.footer_nav_btn {
  border: 2px solid lighten($colorPrimary, 20%);
  background-color: $colorPrimary;

  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-radius-left {
    border-radius: 40% 50% 40% 0%;
  }
  &-radius-right {
    border-radius: 50% 40% 0% 40%;
    & > svg {
      margin-left: 5px;
    }
  }
}
</style>
