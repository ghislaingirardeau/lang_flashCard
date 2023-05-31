<template>
  <div class="id_container">
    <GridSwiper @onTapPlay="playSound">
      <TransitionGroup
        name="slide"
        @before-leave="useBeforeLeave($event, true)"
      >
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

<script setup lang="ts">
const route = useRoute();
useHead({
  titleTemplate: `Card-${route.params.id}`, // %s GET THE TITLE AND ADD THIS
});
const { t } = useI18n();
const cardsStore = useCardsStore();
const loader = ref(0);
const sideLoader = ref("");

const helpPronouce = computed(() => {
  return cardsStore.langFrom === "KM" || cardsStore.langTo === "KM"
    ? true
    : false;
});

const loadCard = computed(() => {
  return route.params.id === t("home.lastAdd")
    ? cardsStore.lastAdded
    : cardsStore.cardItems[route.params.id as string];
});

const playSound = async (payload: PlaySound) => {
  console.log(payload);
  // envoie en params le payload de childNode emit onTap + le loader créer
  const itemId =
    route.params.id === t("home.lastAdd")
      ? (cardsStore.lastAdded.find((e) => e.id == payload.id) as Item)
      : (cardsStore.cardItems[route.params.id as string].find(
          (e) => e.id == payload.id
        ) as Item);

  let text = payload.side === "left" ? itemId.from : itemId.to;

  let lang = payload.side === "left" ? itemId.langFrom : itemId.langTo;

  sideLoader.value = payload.side;
  const { play, error } = (await usePlayTranslation(
    text,
    cardsStore.languages.rate,
    lang,
    loader,
    payload.id
  )) as PlayResponse;
  if (play) {
    loader.value = 0;
  }
  if (error) {
    loader.value = 0;
    alert(error);
  }
};

interface PlaySound {
  id: number;
  side: string;
}

interface PlayResponse {
  play: boolean;
  error: string | null;
}

interface Item {
  from: string;
  id: number;
  langFrom: string;
  langTo: string;
  pronouce: string;
  to: string;
}
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
