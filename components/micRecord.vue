<template>
  <div>
    {{ record }}
    <Icon
      @touchstart="startDrag"
      @touchend="endDrag"
      name="mdi:microphone"
      size="64px"
      color="red"
    />
  </div>
</template>

<script>
import { useTranslation } from "@/composables/translation";
import soundStart from "@/assets/sound/start.wav";
import soundStop from "@/assets/sound/stop.wav";
export default {
  setup() {
    const cardsStore = useCardsStore();
    const record = ref(false);
    const route = useRoute();

    const { isSupported, isListening, isFinal, result, start, stop } =
      useSpeechRecognition({
        lang: cardsStore.languages.from,
        interimResults: true,
        continuous: true,
      });

    const playSound = (param, sound) => {
      record.value = param;
      let audio = new Audio(sound);
      audio.play();
    };

    const speechStart = () => {
      playSound(true, soundStart);
      /* start(); */
    };

    const speechStop = async () => {
      playSound(false, soundStop);
      /* stop(); */
      if (result) {
        console.log(result._value);
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
      speechStart,
      speechStop,
      record,
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

<style lang="scss" scoped></style>
