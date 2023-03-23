<template>
  <div class="mic-block">
    <!-- <div v-if="loading" class="loader" v-loading="loading"></div> -->

    {{ loading }}
    <div class="mic-circle">
      <Icon
        @touchstart.prevent="startDrag"
        @touchend.prevent="endDrag"
        name="mdi:microphone"
        size="84px"
        color="#0ea7de"
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
    const micAnimationDuration = ref(500);

    console.log("mic mounted");

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
    startDrag() {
      this.loading = true;
      const mic = document.querySelector(".mic-circle");
      const micframes = new KeyframeEffect(
        mic,
        [{ transform: "scale(1)" }, { transform: "scale(1.2)" }],
        {
          duration: this.micAnimationDuration,
          iterations: 10,
          fill: "both",
        }
      );

      this.micAnimation = new Animation(micframes, document.timeline);
      this.micAnimation.play();
      /* const SpeechRecognition =
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
        const { text } = await this.useTranslation(
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
          alert("translation does not work");
        }
        this.loading = false;
      }; */
    },
    endDrag() {
      /* this.recognition.stop(); */
      this.loading = false;
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

      this.micAnimation.reverse();

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
  border: 2px solid $btnColor;
  background-color: #ce9504;
}
/* .mic-circle::before {
  content: "";
  opacity: 0;
  position: absolute;
  left: 0px;
  background-color: #ce9504;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  transform: scaleX(1) scaleY(1);
  transition: all 0.5s ease-in-out;
}
.mic-circle:active::before {
  transform: scaleX(1.3) scaleY(1.3);
  opacity: 0.5;
} */
.loader {
  display: inline-block;
  width: 90px;
  height: 90px;
}
</style>
