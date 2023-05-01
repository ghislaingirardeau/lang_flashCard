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
            <LazyTheLoader size="44px" />
          </GridMyCol>
          <GridMyCol :col="loader === item.id ? 5 : 6" class="text-left">
            {{ item.from }}
            <span class="block_swipe_card-text">{{
              helpPronouce ? useWordPronounce(item.from) : ""
            }}</span>
          </GridMyCol>
          <GridMyCol
            :col="loader === item.id ? 5 : 6"
            class="text-right"
            style="word-break: break-all"
            >{{ item.to }}
            <span class="block_swipe_card-text">{{
              helpPronouce ? useWordPronounce(item.to) : ""
            }}</span></GridMyCol
          >
          <GridMyCol
            :col="2"
            v-if="loader === item.id && sideLoader === 'right'"
          >
            <LazyTheLoader size="44px" />
          </GridMyCol>
        </GridMyRow>
      </TransitionGroup>
    </GridSwiper>
  </div>
</template>

<script setup>
const route = useRoute();
useHead({
  titleTemplate: `Card-${route.params.id}`, // %s GET THE TITLE AND ADD THIS
});

const cardsStore = useCardsStore();
const loader = ref(0);
const sideLoader = ref(null);

const helpPronouce = computed(() => {
  return cardsStore.langFrom === "KM" || cardsStore.langTo === "KM"
    ? true
    : false;
});

const loadCard = computed(() => {
  return cardsStore.cardItems[route.params.id];
});

const playSound = async (payload) => {
  // envoie en params le payload de childNode emit onTap + le loader créer
  sideLoader.value = payload.side;
  const { play, error } = await usePlayTranslation(
    payload.textToTranslate,
    cardsStore.languages.rate,
    payload.lang,
    loader,
    payload.id
  );
  if (play) {
    loader.value = 0;
  }
  if (error) {
    loader.value = 0;
    alert(error);
  }
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
