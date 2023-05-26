export function useTextToPlay(
  event: Element,
  id: number,
  emit: Function
): void {
  let element: HTMLElement =
    event.target.tagName === "DIV"
      ? event.target!
      : (event.target.parentNode! as HTMLElement);

  let side = element.className.includes("text-left") ? "left" : "right";

  emit("onTapPlay", {
    id,
    side,
  });
}

interface Element extends EventTarget {
  target: HTMLElement;
}
