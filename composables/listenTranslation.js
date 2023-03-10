export async function usePlayTranslation(to, lang) {
  /* const { speak, status, isPlaying, isSupported, error } =
      useSpeechSynthesis(to, {
        lang: cardsStore.languages.to,
        pitch: 1,
        rate: 0.5,
        volume: 1,
      });
    speak(); */
  const config = useRuntimeConfig();
  const { data } = await useFetch(
    `https://text-to-speech-api3.p.rapidapi.com/speak?text=${to}&lang=${lang.slice(
      0,
      2
    )}`,
    {
      method: "GET",
      key: `${to}`,
      headers: {
        "X-RapidAPI-Key": config.XRAPIDAPIKEY,
        "X-RapidAPI-Host": config.XRAPIDAPIHOSTTTS,
      },
    }
  );
  let blobUrl = URL.createObjectURL(data.value);
  const audioElement = new Audio(blobUrl);
  audioElement.playbackRate = 0.8;
  audioElement.play();
}
