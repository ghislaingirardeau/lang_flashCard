import khmerRomanization from "@/assets/khmer.json";

const playBlobResponse = (value: Blob, rate: number) => {
  let blobUrl = URL.createObjectURL(value);
  const audioElement = new Audio(blobUrl);
  audioElement.playbackRate = rate;
  audioElement.play();
};

export async function useTranslation(text: string, from: string, to: string) {
  // state encapsulated and managed by the composable
  const config = useRuntimeConfig();

  // GOOGLE TRANSLATOR MAX 1000 CALL PER MONTH
  const body = {
    q: text,
    source: from,
    target: to,
    format: "text",
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": config.public.XRAPIDAPIKEY,
      "X-RapidAPI-Host": config.public.XRAPIDAPIGOOGLE,
    },
    body: JSON.stringify(body),
  };
  const { data, error } = await useFetch<APIBody>(
    "https://google-translator9.p.rapidapi.com/v2",
    options as object
  );
  if (data.value && navigator.onLine)
    return {
      text: data.value.data.translations[0].translatedText as string,
      error: null,
    };
  else {
    console.log(error);
    return {
      text: null,
      error: navigator.onLine
        ? error.value?.data.message
        : ("You are not connected to internet" as string),
    };
  }

  // TRANSLO MAX 500 000 CHARACTERS PER MONTHS
  /* const url = "https://translo.p.rapidapi.com/api/v3/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": config.public.XRAPIDAPIKEY,
      "X-RapidAPI-Host": config.public.TRANSLO,
    },
    body: new URLSearchParams({
      from: from,
      to: to,
      text: text,
    }),
  };
  const { data, error } = await useFetch<APIBody>(url, options as object);
  if (data.value)
    return {
      text: data.value.translated_text,
      error: null,
    };
  if (error.value) {
    console.log(error);
    return { text: null, error: error.value };
  } */
}

export async function usePlayTranslation(
  to: string,
  rate: number,
  lang: string,
  loader: Ref<number>,
  id: number
) {
  const config = useRuntimeConfig();

  let langDetected = lang ? lang : undefined;

  if (!langDetected) {
    //DETECT LANG
    const { data: currenLang, error } = await useFetch<
      DataT,
      Error,
      string,
      "post" | "get"
    >("https://google-translator9.p.rapidapi.com/v2/detect", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": config.public.XRAPIDAPIKEY,
        "X-RapidAPI-Host": config.public.XRAPIDAPIGOOGLE,
      },
      body: JSON.stringify({ q: to }),
    });
    if (currenLang.value) {
      langDetected = currenLang.value.data.detections[0][0].language;
    }
    if (error.value) {
      return { play: false, error: "Could not detect the lang" };
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
  try {
    loader ? (loader.value = id) : null;
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
    if (result.ok === true && navigator.onLine) {
      const cache = await caches.open("flashCardCache");
      cache.put(
        `https://text-to-speech-api3.p.rapidapi.com/speak?text=${to}&lang=${langDetected}`,
        result.clone()
      );
      const blob = await result.blob();
      playBlobResponse(blob, rate);
      return { play: true, error: null };
    }
  } catch (error) {
    console.log(error);
    return {
      play: false,
      error: navigator.onLine
        ? "Api is not available"
        : "Your are not connected",
    };
  }
}

export function useWordPronounce(text: string) {
  const chars = text.split("");

  let res = [];

  for (let i in chars) {
    if (khmerRomanization[chars[i] as keyof typeof khmerRomanization] as any) {
      res.push(khmerRomanization[chars[i] as keyof typeof khmerRomanization]);
    }
  }
  return res.toString().replaceAll(",", "");
}

interface APIBody {
  [key: string]: any;
}

interface DataT {
  data: {
    detections: [[{ language: string }]];
  };
}

// if want to be more clear than APIBody
interface DataFetch {
  data: {
    translations: [
      {
        translatedText: string;
      }
    ];
  };
}
