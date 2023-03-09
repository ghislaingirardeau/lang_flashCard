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
