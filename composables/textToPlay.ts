export function useTextToPlay(event: Event, id: number, emit: Function): void {
  let target = event.target as HTMLElement;
  let element =
    target.tagName === "DIV" ? target : (target.parentNode! as HTMLElement);

  let side = (element as HTMLElement).className.includes("text-left")
    ? "left"
    : "right";

  emit("onTapPlay", {
    id,
    side,
  });
}

interface Element extends EventTarget {
  target: HTMLElement;
}
