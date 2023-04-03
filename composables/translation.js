import khmerRomanization from "@/assets/khmer.json";

export async function useTranslation(text, from, to) {
  // state encapsulated and managed by the composable
  const config = useRuntimeConfig();

  const body = {
    q: text,
    source: from,
    target: to,
  };

  const { data } = await useFetch(
    "https://deep-translate1.p.rapidapi.com/language/translate/v2",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": config.XRAPIDAPIKEY,
        "X-RapidAPI-Host": config.XRAPIDAPIHOST,
      },
      body: JSON.stringify(body),
    }
  );
  return { text: data._rawValue.data.translations.translatedText };
}

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

export function useWordPronounce(text) {
  const chars = text.split("");

  let res = [];

  for (let i in chars) {
    if (khmerRomanization[chars[i]]) {
      res.push(khmerRomanization[chars[i]]);
    }
  }
  return res.toString();
}

/* export function useTest(loader) {
  // ref has to be imported
  loader.value = 1;
  setTimeout(() => {
    loader.value = 0;
  }, 1000);
} */
