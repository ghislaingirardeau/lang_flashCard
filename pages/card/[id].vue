<template>
  <div class="id_container">
    <GridSwiper @onTapPlay="playSound">
      <TransitionGroup name="slide">
        <GridMyRow
          v-for="item in loadCard"
          :key="item.id"
          :idClass="item"
          append="trash-can-outline"
        >
          <GridMyCol :col="4"> {{ item.from }} </GridMyCol>
          <GridMyCol
            :col="loader === item.id ? 6 : 8"
            style="word-break: break-all"
            ><span>{{ item.to }} </span>
            <span class="block_swipe_card-text">{{
              langTo === "km" ? useWordPronounce(item.to) : ""
            }}</span></GridMyCol
          >
          <GridMyCol :col="2" v-if="loader === item.id">
            <TheLoader size="44px" />
          </GridMyCol>
        </GridMyRow>
      </TransitionGroup>
    </GridSwiper>
    <Transition name="fade" mode="out-in">
      <div v-show="showPlay" @click="playAllSound" class="btn-play-all">
        <TheLoader v-if="loader === 1" size="44px" color="#000814" />
        <Icon v-else name="mdi:play-outline" size="54px" color="#000814" />
      </div>
    </Transition>
  </div>
</template>

<script>
import {
  usePlayTranslation,
  useWordPronounce,
} from "@/composables/translation";

export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();
    const loader = ref(0);
    const showPlay = ref(false);

    const langTo = computed(() => {
      return cardsStore.langTo;
    });

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playSound = async (payload) => {
      // get languages of speechsynthesis
      if (cardsStore.langAvailable.length === 0) {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        cardsStore.loadLang(voices.map((e) => e.lang));
      }
      // to check if lang is supported by speechsynthesis = faster
      if (cardsStore.langAvailable.includes(cardsStore.languages.to)) {
        console.log(payload, cardsStore.languages.to);
        const speech = useSpeechSynthesis(payload.to, {
          lang: cardsStore.languages.to,
          pitch: 1,
          rate: cardsStore.languages.rate,
          volume: 1,
        });
        speech.speak();
      } else {
        payload.id ? (loader.value = payload.id) : (loader.value = 1);
        const { play } = await usePlayTranslation(
          payload.to,
          cardsStore.languages.to,
          cardsStore.languages.rate
        );
        try {
          play ? (loader.value = 0) : null;
        } catch (error) {
          console.log(error);
          loader.value = 0;
        }
      }
    };

    const playAllSound = async () => {
      const allText = loadCard.value
        .map((e) => e.to)
        .toString()
        .replace(",", " ");

      playSound({ to: allText });
    };

    onMounted(() => {
      setTimeout(() => {
        showPlay.value = true;
      }, 800);
    });

    onBeforeRouteLeave(() => {
      showPlay.value = false;
    });

    return {
      loadCard,
      playSound,
      loader,
      playAllSound,
      showPlay,
      langTo,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px;
}
.el-row {
  align-items: center;
  border-bottom: 2px solid $colorThird;
  width: 100%;
}
.el-col {
  text-align: center;
  padding: 10px;
  transition: all 0.4s ease;
}

.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: $colorThird;
}
.id_container {
  height: 100%;
  position: relative;
}
.btn-play-all {
  position: fixed;
  bottom: calc(var(--footer-height) - 35px);
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid lighten($colorPrimary, 20%);
  background-color: $colorPrimary;
  border-radius: 50% 40% 0% 40%;
  width: 60px;
  height: 60px;
  z-index: 100;
}
</style>
