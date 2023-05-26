export function useBeforeLeave(event: HTMLElement, home: boolean): void {
  const { marginLeft, marginTop, width, height } =
    window.getComputedStyle(event);
  const swipeBlock: HTMLElement = document.querySelector(".el-main")!;

  const getTopPosition = home
    ? event.offsetTop
    : event.offsetTop - swipeBlock.scrollTop;
  console.log(event.offsetTop, swipeBlock.scrollTop, getTopPosition);
  event.style.left = `${event.offsetLeft - parseFloat(marginLeft)}px`;
  event.style.top = `${getTopPosition - parseFloat(marginTop)}px`;
  event.style.width = width;
  event.style.height = height;
}

export function useAnimDeleteIcon(
  id: string,
  home: boolean,
  fct1: string,
  fct2: string
): void {
  document
    .getElementById(`delete-${id}`)
    ?.classList[fct1 as keyof IMyObj]("hide");

  const firstChild = document.getElementById(`delete-${id}`)
    ?.firstChild as HTMLElement;

  home
    ? firstChild.classList[fct2 as keyof IMyObj]("anim-delete-leave")
    : document
        .getElementById(`remember-${id}`)
        ?.classList[fct1 as keyof IMyObj]("hide");
}

interface IMyObj {
  add: string;
  remove: string;
}

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}
