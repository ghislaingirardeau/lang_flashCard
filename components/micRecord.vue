<template>
  <div class="mic-block">
    <TheLoader v-if="loading" size="80px" color="#ffa200fd" />
    <div v-else class="mic-circle">
      <Icon
        @touchstart.prevent="startDrag"
        @touchend.prevent="endDrag"
        name="mdi:microphone"
        size="84px"
      />
    </div>
  </div>
</template>

<script>
import { useTranslation } from "@/composables/translation";
export default {
  setup() {
    const cardsStore = useCardsStore();
    const recognition = reactive({});
    const loading = ref(false);
    const route = useRoute();
    const micAnimation = reactive({});
    const micAnimationDuration = ref(1000);

    return {
      loading,
      recognition,
      cardsStore,
      useTranslation,
      route,
      micAnimation,
      micAnimationDuration,
    };
  },
  methods: {
    async startDrag() {
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
          duration: this.micAnimationDuration,
          pseudoElement: "::after",
          iterations: 10,
          fill: "both",
        }
      );
      this.micAnimation = new Animation(micframes, document.timeline);
      this.micAnimation.play();

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = this.cardsStore.languages.from;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.start();
      this.recognition.onresult = async (event) => {
        this.recognition.stop();
        let transcriptResult = event.results[0][0].transcript;
        this.loading = true;
        const { text, error } = await this.useTranslation(
          transcriptResult,
          this.cardsStore.languages.from,
          this.cardsStore.languages.to
        );
        if (text) {
          this.cardsStore.addNewItem(this.route.params.id, {
            id: Date.now(),
            from: transcriptResult,
            to: text,
            pronouce: "xxx",
          });
        } else {
          alert("Error from API", error);
        }
        this.loading = false;
      };
    },
    endDrag() {
      this.recognition.stop();
      this.loading = false;
      this.micAnimation.reverse();
      const getTime = () => {
        if (this.micAnimation.currentTime < this.micAnimationDuration)
          return this.micAnimation.currentTime;
        if (this.micAnimation.currentTime > this.micAnimationDuration) {
          while (this.micAnimation.currentTime > this.micAnimationDuration) {
            this.micAnimation.currentTime -= this.micAnimationDuration;
          }
          return this.micAnimation.currentTime;
        }
      };

      setTimeout(() => {
        this.micAnimation.pause();
      }, getTime());
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
  z-index: 10 !important;
  border: 2px solid darken($color: $colorThird, $amount: 20%);
}
svg {
  color: $colorSecondary;
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
.loader {
  display: inline-block;
  width: 90px;
  height: 90px;
  background-color: $colorFith;
}
</style>
