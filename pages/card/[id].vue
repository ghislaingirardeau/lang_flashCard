<template>
  <div>
    <el-row
      v-for="item in loadCard"
      :key="item.id"
      justify="space-between"
      align="center"
    >
      <el-col :span="7">
        <span class="loadCard-text"> {{ item.from }} </span></el-col
      >
      <el-col :span="7">
        <Icon
          name="mdi:volume-high"
          size="34px"
          color="red"
          @click="usePlayTranslation(item.to, langTo)"
      /></el-col>
      <el-col :span="7">
        <span> {{ item.to }} </span></el-col
      >
    </el-row>
    <!-- <div v-for="item in loadCard" :key="item.id">
      <span> {{ item.from }} </span>
      <Icon
        name="mdi:volume-high"
        size="34px"
        color="red"
        @click="usePlayTranslation(item.to, langTo)"
      />
      <span> {{ item.to }} </span>
    </div> -->
    <div>{{ record }}</div>

    <div>
      <Icon
        @touchstart="startDrag"
        @touchend="endDrag"
        name="mdi:microphone"
        size="64px"
        color="red"
      />
    </div>
  </div>
</template>

<script>
import { useTranslation } from "../../composables/translation";
import { usePlayTranslation } from "../../composables/listenTranslation";
import soundStart from "@/assets/sound/start.wav";
import soundStop from "@/assets/sound/stop.wav";
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
      let audio = new Audio(soundStart);
      audio.play();
    };
    const speechStop = async () => {
      record.value = false;
      let audio = new Audio(soundStop);
      audio.play();
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
      speechStart,
      speechStop,
      record,
      langTo,
      usePlayTranslation,
    };
  },
  methods: {
    startDrag() {
      this.speechStart();
    },
    endDrag() {
      this.speechStop();
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px;
}
.el-row {
  margin-bottom: 10px;
  align-items: center;
  border: 2px solid red;
}
.el-col {
  text-align: center;
  padding: 10px;
}
</style>
