<template>
  <div class="mic-block">
    <div class="mic-circle">
      <Icon
        @touchstart="startDrag"
        @touchend="endDrag"
        name="mdi:microphone"
        size="84px"
        color="red"
      />
    </div>
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
      if (result._value) {
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

<style lang="scss" scoped>
.mic-block {
  text-align: center;
}
.mic-circle {
  display: inline-block;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: relative;
  border: 2px solid red;
}
.mic-circle::after {
  content: "";
  opacity: 0;
  position: absolute;
  left: 0px;
  z-index: -1;
  background-color: #ce9504;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  transform: scaleX(1) scaleY(1);
  transition: all 0.5s ease-in-out;
}
.mic-circle:active::after {
  transform: scaleX(1.3) scaleY(1.3);
  opacity: 0.5;
}
</style>
