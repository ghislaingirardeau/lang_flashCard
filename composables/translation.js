import khmerRomanization from "@/assets/khmer.json";

const playBlobResponse = (value, rate) => {
  let blobUrl = URL.createObjectURL(value);
  const audioElement = new Audio(blobUrl);
  audioElement.playbackRate = rate;
  audioElement.play();
};

export async function useTranslation(text, from, to) {
  // state encapsulated and managed by the composable
  const config = useRuntimeConfig();

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
        "X-RapidAPI-Key": config.public.XRAPIDAPIKEY,
        "X-RapidAPI-Host": config.public.XRAPIDAPIGOOGLE,
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

export async function usePlayTranslation(to, rate, lang, loader, id) {
  const config = useRuntimeConfig();

  let langDetected = lang ? lang : null;

  if (!langDetected) {
    //DETECT LANG
    const { data: currenLang, error } = await useFetch(
      "https://google-translator9.p.rapidapi.com/v2/detect",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": config.public.XRAPIDAPIKEY,
          "X-RapidAPI-Host": config.public.XRAPIDAPIGOOGLE,
        },
        body: JSON.stringify({ q: to }),
      }
    );
    if (currenLang.value) {
      langDetected = currenLang.value.data.detections[0][0].language;
    }
    if (error.value) {
      return { play: null, error: "Could not detect the lang" };
    }
  }

  // CHECK IF DATA INSIDE THE CACHE & PLAY IT IF SO
  const cacheResponse = await caches.match(
    `https://text-to-speech-api3.p.rapidapi.com/speak?text=${to}&lang=${langDetected}`
  );
  if (
    cacheResponse &&
    cacheResponse.status === 200 &&
    cacheResponse.ok === true
  ) {
    //GET CACHE ELEMENT
    const blob = await cacheResponse.blob();
    playBlobResponse(blob, rate);
    return { play: true, error: null };
  }

  //IF NOT IN CACHE, FETCH, STORE in CACHE & PLAY
  loader.value = id;
  const result = await fetch(
    `https://text-to-speech-api3.p.rapidapi.com/speak?text=${to}&lang=${langDetected}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": config.public.XRAPIDAPIKEY,
        "X-RapidAPI-Host": config.public.XRAPIDAPIHOSTTTS,
      },
    }
  );
  if (result.ok === true) {
    const cache = await caches.open("flashCardCache");
    cache.put(
      `https://text-to-speech-api3.p.rapidapi.com/speak?text=${to}&lang=${langDetected}`,
      result.clone()
    );
    const blob = await result.blob();
    playBlobResponse(blob, rate);
    return { play: true, error: null };
  }
  /* if (data.value) {
    console.log("play with fetch", data.value);
    playBlobResponse(data.value, rate);
    return { play: true, error: null };
  }
  if (error.value) {
    return { play: null, error: error.value };
  } */
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
