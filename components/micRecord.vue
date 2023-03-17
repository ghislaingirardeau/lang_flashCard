<template>
  <div class="mic-block">
    <div v-if="loading" class="loader" v-loading="loading"></div>
    <div v-else class="mic-circle">
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

    /* const speechStop = async () => {
      console.log(transcriptResult.value);
      loading.value = true;
      const { text } = await useTranslation(
        transcriptResult.value,
        cardsStore.languages.from,
        cardsStore.languages.to
      );
      if (text) {
        cardsStore.addNewItem(route.params.id, {
          id: Date.now(),
          from: transcriptResult.value,
          to: text,
          pronouce: "xxx",
        });
      } else {
        alert("translation does not work");
      }
      loading.value = false;
    }; */
    return {
      loading,
      recognition,
      cardsStore,
      useTranslation,
      route,
    };
  },
  methods: {
    startDrag() {
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
      };
    },
    endDrag() {
      this.recognition.stop();
    },
  },
};
</script>

<style lang="scss" scoped>
.mic-block {
  text-align: center;
}
/* .mic-circle {
  display: inline-block;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: relative;
  border: 2px solid $btnColor;
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
} */
.loader {
  display: inline-block;
  width: 90px;
  height: 90px;
}
</style>
