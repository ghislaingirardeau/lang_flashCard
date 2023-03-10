<template>
  <div>
    {{ route.params.id }}
    <div v-for="item in loadCard" :key="item.id">
      <span> from {{ item.from }} </span>
      <Icon
        name="mdi:volume-high"
        size="34px"
        color="red"
        @click="usePlayTranslation(item.to, langTo)"
      />
      <span> to {{ item.to }} </span>
    </div>
    <div>
      <el-button type="primary" @click="speechStart">talk</el-button>
      <el-button type="primary" @click="speechStop">stop</el-button>
    </div>
    <div>{{ record }}</div>

    <Icon name="mdi:microphone" size="64px" color="red" id="mic-element" />
  </div>
</template>

<script>
import { useTranslation } from "../../composables/translation";
import { usePlayTranslation } from "../../composables/listenTranslation";
export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();

    const record = ref(false);

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const langTo = computed(() => {
      return cardsStore.languages.to;
    });

    const { isSupported, isListening, isFinal, result, start, stop } =
      useSpeechRecognition({
        lang: cardsStore.languages.from,
        interimResults: true,
        continuous: true,
      });

    const speechStart = () => {
      start();
      record.value = true;
    };
    const speechStop = async () => {
      record.value = false;
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
    onMounted(() => {
      const elt = document.getElementById("mic-element");
      console.log(elt);
      /* elt.addEventListener("touchstart", speechStart);
      elt.addEventListener("touchend", speechStop); */
    });

    return {
      route,
      loadCard,
      playTranslation,
      speechStart,
      speechStop,
      record,
      langTo,
      usePlayTranslation,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px;
}
</style>
