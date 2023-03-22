export async function usePlayTranslation(to, lang, rate) {
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
  audioElement.playbackRate = rate;
  audioElement.play();
  return { play: true };
}
