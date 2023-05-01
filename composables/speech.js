export function useTextToPlay(event, id, emit, language) {
  let textToTranslate =
    event.target.tagName === "DIV" ? event.target : event.target.parentNode;

  let side = textToTranslate.className.includes("text-left") ? "left" : "right";

  let lang = textToTranslate.className.includes("text-left")
    ? language.from.slice(0, 2)
    : language.to.slice(0, 2);

  const index = textToTranslate.innerText.indexOf("\n");
  index === -1
    ? (textToTranslate = textToTranslate.innerText)
    : (textToTranslate = textToTranslate.innerText.slice(0, index));

  emit("onTapPlay", {
    id,
    textToTranslate,
    side,
    lang,
  });
}
