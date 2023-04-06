import { usePlayTranslation } from "@/composables/translation";

export async function usePlaySound(loader, payload) {
  const cardsStore = useCardsStore();
  // get all languages of speechsynthesis and store it
  if (cardsStore.langAvailable.length === 0) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    cardsStore.loadLang(voices.map((e) => e.lang));
  }
  // to check if lang is supported by speechsynthesis = faster No loader because too fast
  if (payload && cardsStore.langAvailable.includes(cardsStore.languages.to)) {
    const speech = useSpeechSynthesis(payload.to, {
      lang: cardsStore.languages.to,
      pitch: 1,
      rate: cardsStore.languages.rate,
      volume: 1,
    });
    return speech.speak();
  }
  // if it's not a lang available in SpeechSynthesis, fetch with usePlayTranslation
  if (payload) {
    payload.id ? (loader.value = payload.id) : (loader.value = 1);
    const { play } = await usePlayTranslation(
      payload.to,
      cardsStore.languages.to,
      cardsStore.languages.rate
    );
    try {
      play ? (loader.value = 0) : null;
    } catch (error) {
      console.log(error);
      loader.value = 0;
    }
  }
}
