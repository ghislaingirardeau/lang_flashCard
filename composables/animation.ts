export function useBeforeLeave(event: Element, home: boolean): void {
  const { marginLeft, marginTop, width, height } =
    window.getComputedStyle(event);
  const swipeBlock: HTMLElement = document.querySelector(".el-main")!;

  let element = event as HTMLElement;

  const getTopPosition = home
    ? element.offsetTop
    : element.offsetTop - swipeBlock.scrollTop;
  element.style.left = `${element.offsetLeft - parseFloat(marginLeft)}px`;
  element.style.top = `${getTopPosition - parseFloat(marginTop)}px`;
  element.style.width = width;
  element.style.height = height;
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

export function useAnimSwitchArrow(event: Event) {
  let keyframes = [
    {
      opacity: 0,
      transform: "rotateZ(20deg)",
      offset: 0.5,
    },
  ];
  const target = event.target as HTMLElement;
  let element =
    target.nodeName === "svg" ? target : (target.parentNode as HTMLElement);

  element.animate(keyframes, {
    duration: 400,
    fill: "forwards",
  });
}

interface IMyObj {
  add: string;
  remove: string;
}
