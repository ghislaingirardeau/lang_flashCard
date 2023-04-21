import khmerRomanization from "@/assets/khmer.json";

export async function useTranslation(text, from, to) {
  // state encapsulated and managed by the composable
  const config = useRuntimeConfig();

  /* const body = {
    q: text,
    source: from,
    target: to,
  };

  const { data, error } = await useFetch(
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
  ); */
  const body = {
    q: text,
    source: from,
    target: to,
    format: "text",
  };
  const { data, error } = await useFetch(
    "https://google-translator9.p.rapidapi.com/v2",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": config.XRAPIDAPIKEY,
        "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
      },
      body: JSON.stringify(body),
    }
  );
  if (data.value)
    return {
      text: data.value.data.translations[0].translatedText,
      error: null,
    };
  if (error.value) {
    console.log(error);
    return { text: null, error: error.value };
  }
}

export async function usePlayTranslation(to, rate) {
  const config = useRuntimeConfig();
  //DETECT LANG
  const results = await useFetch(
    "https://google-translator9.p.rapidapi.com/v2/detect",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": config.XRAPIDAPIKEY,
        "X-RapidAPI-Host": config.XRAPIDAPIGOOGLE,
      },
      body: JSON.stringify({ q: to }),
    }
  );
  let langDetected;
  if (results.data.value) {
    langDetected = results.data.value.data.detections[0][0].language;
  }
  if (results.error.value) {
    return { play: null, error: "Could not detect the lang" };
  }

  //PLAY WITH THE DETECTED LANG
  const { data, error } = await useFetch(
    `https://text-to-speech-api3.p.rapidapi.com/speak?text=${to}&lang=${langDetected}`,
    {
      method: "GET",
      key: `${to}`,
      headers: {
        "X-RapidAPI-Key": config.XRAPIDAPIKEY,
        "X-RapidAPI-Host": config.XRAPIDAPIHOSTTTS,
      },
    }
  );
  if (data.value) {
    let blobUrl = URL.createObjectURL(data.value);
    const audioElement = new Audio(blobUrl);
    audioElement.playbackRate = rate;
    audioElement.play();
    return { play: true, error: null };
  }
  if (error.value) {
    return { play: null, error: error.value };
  }
}

export function useWordPronounce(text) {
  const chars = text.split("");

  let res = [];

  for (let i in chars) {
    if (khmerRomanization[chars[i]]) {
      res.push(khmerRomanization[chars[i]]);
    }
  }
  return res.toString().replaceAll(",", "");
}
