export function useTextToPlay(event, id, emit) {
  let textToTranslate =
    event.target.tagName === "DIV" ? event.target : event.target.parentNode;

  let side = textToTranslate.className.includes("text-left") ? "left" : "right";

  const index = textToTranslate.innerText.indexOf("\n");
  index === -1
    ? (textToTranslate = textToTranslate.innerText)
    : (textToTranslate = textToTranslate.innerText.slice(0, index));

  emit("onTapPlay", {
    id: id,
    textToTranslate,
    side,
  });
}
