<template>
  <div class="mic-block">
    <LazyTheLoader v-if="loading" size="80px" />
    <div v-else class="mic-circle">
      <Icon
        @touchstart.prevent="startDrag"
        @touchend.prevent="endDrag"
        @mousedown="startDrag"
        @mouseup="endDrag"
        name="mdi:microphone"
        size="84px"
        class="icon_mic-color"
      />
    </div>
  </div>
</template>

<script setup>
const cardsStore = useCardsStore();
const recognition = reactive({});
const loading = ref(false);
const route = useRoute();
const micAnimation = reactive({});
const micAnimationDuration = ref(1000);

const startDrag = async () => {
  const mic = document.querySelector(".mic-circle");
  const micframes = new KeyframeEffect(
    mic,
    [
      /* { transform: "scale(1)" },  */ {
        transform: "scale(1.3)",
        opacity: 0.5,
        offset: 0.5,
      },
    ],
    {
      duration: micAnimationDuration.value,
      pseudoElement: "::after",
      iterations: 10,
      fill: "both",
    }
  );
  micAnimation.value = new Animation(micframes, document.timeline);
  micAnimation.value.play();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition.value = new SpeechRecognition();
  recognition.value.continuous = false;
  recognition.value.lang = cardsStore.languages.from;
  recognition.value.interimResults = false;
  recognition.value.maxAlternatives = 1;
  recognition.value.start();
  recognition.value.onresult = async (event) => {
    recognition.value.stop();
    let transcriptResult = event.results[0][0].transcript;
    loading.value = true;
    const { text, error } = await useTranslation(
      transcriptResult,
      cardsStore.languages.from,
      cardsStore.languages.to
    );
    if (text) {
      cardsStore.addNewItem(route.params.id, {
        id: Date.now(),
        from: transcriptResult,
        to: text,
        pronouce: "xxx",
      });
      useScrollTo("smooth");
    } else {
      alert("Error from API, reload", error);
    }
    loading.value = false;
  };
};

const endDrag = () => {
  recognition.value.stop();
  loading.value = false;
  micAnimation.value.reverse();

  const getTime = () => {
    if (micAnimation.value.currentTime < micAnimationDuration.value)
      return micAnimation.value.currentTime;
    if (micAnimation.value.currentTime > micAnimationDuration.value) {
      while (micAnimation.value.currentTime > micAnimationDuration.value) {
        micAnimation.value.currentTime -= micAnimationDuration.value;
      }
      return micAnimation.value.currentTime;
    }
  };

  setTimeout(() => {
    micAnimation.value.pause();
  }, getTime());
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
  z-index: 10 !important;
  border: 2px solid darken($color: $colorThird, $amount: 20%);
}

.mic-circle::after {
  content: "";
  position: absolute;
  left: 0px;
  background-color: $colorPrimary;
  width: 90px;
  height: 90px;
  z-index: -1;
  border-radius: 50%;
}
.icon_mic-color {
  color: $colorSecondary;
}
</style>
