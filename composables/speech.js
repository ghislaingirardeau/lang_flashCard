export function useTextToPlay(event, id, emit) {
  let element =
    event.target.tagName === "DIV" ? event.target : event.target.parentNode;

  let side = element.className.includes("text-left") ? "left" : "right";

  emit("onTapPlay", {
    id,
    side,
  });
}
