<template>
  <div>
    {{ route.params.id }}
    <div v-for="item in loadCard" :key="item.id">
      <span> from {{ item.from }} </span>
      <Icon
        name="mdi:volume-high"
        size="34px"
        color="red"
        @click="playTranslation(item.to)"
      />
      <span> to {{ item.to }} </span>
    </div>
    <div>
      <el-button type="primary" @click="speechStart">talk</el-button>
      <el-button type="primary" @click="speechStop">stop</el-button>
    </div>
  </div>
</template>

<script>
import { useTranslation } from "../../composables/translation";
export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playTranslation = async (to) => {
      /* const { speak, status, isPlaying, isSupported, error } =
        useSpeechSynthesis(to, {
          lang: cardsStore.languages.to,
          pitch: 1,
          rate: 0.5,
          volume: 1,
        });
      speak(); */
      const config = useRuntimeConfig();
      const { data } = await useFetch(
        `https://text-to-speech-api3.p.rapidapi.com/speak?text=${to}&lang=${cardsStore.languages.to.slice(
          0,
          2
        )}`,
        {
          method: "GET",
          key: `${to}`,
          headers: {
            "X-RapidAPI-Key": config.XRAPIDAPIKEY,
            "X-RapidAPI-Host": config.XRAPIDAPIHOSTTTS,
          },
        }
      );
      let blobUrl = URL.createObjectURL(data.value);
      const audioElement = new Audio(blobUrl);
      audioElement.playbackRate = 0.6;
      audioElement.play();
    };

    const { isSupported, isListening, isFinal, result, start, stop } =
      useSpeechRecognition({
        lang: cardsStore.languages.from,
        interimResults: true,
        continuous: true,
      });

    const speechStart = () => {
      start();
    };
    const speechStop = async () => {
      stop();
      if (result) {
        const { text } = await useTranslation(
          result._value,
          cardsStore.languages.from,
          cardsStore.languages.to
        );
        cardsStore.addNewItem(route.params.id, {
          id: Date.now(),
          from: result._value,
          to: text,
          pronouce: "xxx",
        });
      }
    };

    return {
      route,
      loadCard,
      playTranslation,
      speechStart,
      speechStop,
    };
  },
};
</script>

<style lang="scss" scoped></style>
