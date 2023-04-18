<template>
  <div class="id_container">
    <GridSwiper @onTapPlay="playSound">
      <TransitionGroup name="slide" @before-leave="useBeforeLeave">
        <GridMyRow
          v-for="item in loadCard"
          :key="item.id"
          :idClass="item"
          append="mdi:trash-can-outline"
          @onTapPlay="playSound"
        >
          <GridMyCol
            :col="2"
            v-if="loader === item.id && sideLoader === 'left'"
          >
            <TheLoader size="44px" />
          </GridMyCol>
          <GridMyCol :col="loader === item.id ? 5 : 6" class="text-left">
            {{ item.from }}
          </GridMyCol>
          <GridMyCol
            :col="loader === item.id ? 5 : 6"
            class="text-right"
            style="word-break: break-all"
            >{{ item.to }}
            <span class="block_swipe_card-text">{{
              langTo === "KM" ? useWordPronounce(item.to) : ""
            }}</span></GridMyCol
          >
          <GridMyCol
            :col="2"
            v-if="loader === item.id && sideLoader === 'right'"
          >
            <TheLoader size="44px" />
          </GridMyCol>
        </GridMyRow>
      </TransitionGroup>
    </GridSwiper>
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();
    const loader = ref(0);
    const sideLoader = ref(null);

    const langTo = computed(() => {
      return cardsStore.langTo;
    });

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playSound = async (payload) => {
      // envoie en params le payload de childNode emit onTap + le loader créer
      loader.value = payload.id;
      sideLoader.value = payload.side;
      const { play, error } = await usePlayTranslation(
        payload.textToTranslate,
        cardsStore.languages.rate
      );
      if (play) {
        loader.value = 0;
      }
      if (error) {
        loader.value = 0;
        alert(error);
      }
    };

    return {
      loadCard,
      playSound,
      loader,
      langTo,
      sideLoader,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px;
}

.text-left {
  border-right: 1px dashed $colorThird;
}
.id_container {
  height: 100%;
}
</style>
