<template>
  <div class="mic-block">
    <!-- <el-button v-if="loading" type="primary" :loading="loading"
      >Loading</el-button
    > -->
    {{ recordTemp }} {{ resultRecordTemp }}
    <div v-if="loading" class="loader" v-loading="loading"></div>
    <div v-else class="mic-circle">
      <Icon
        @touchstart="startDrag"
        @touchend="endDrag"
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
    const recordTemp = ref(false);
    const loading = ref(false);
    const resultRecordTemp = ref("");
    const route = useRoute();

    const { isSupported, isListening, isFinal, result, start, stop } =
      useSpeechRecognition({
        lang: cardsStore.languages.from,
        interimResults: true,
        continuous: true,
      });

    /* DEBUG MIC ON MOBILE, DISABLE SELECT TEXT */

    const speechStart = () => {
      recordTemp.value = true;
      start();
    };

    const speechStop = async () => {
      recordTemp.value = false;
      stop();
      loading.value = true;
      resultRecordTemp.value = result.value;
      if (result.value) {
        const { text } = await useTranslation(
          result.value,
          cardsStore.languages.from,
          cardsStore.languages.to
        );
        if (text) {
          cardsStore.addNewItem(route.params.id, {
            id: Date.now(),
            from: result._value,
            to: text,
            pronouce: "xxx",
          });
        } else {
          alert("translation does not work");
        }
        loading.value = false;
      } else {
        alert("pas de valeur enregistrer");
        loading.value = false;
      }
    };
    return {
      speechStart,
      speechStop,
      recordTemp,
      resultRecordTemp,
      loading,
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
