export function useScrollTo(behave: "auto" | "smooth"): void {
  document.querySelector(".el-main")?.scroll({
    top: 0,
    left: 0,
    behavior: behave,
  });
}

export function useGetMainHeightScroll(onRouteHome: boolean): number {
  return onRouteHome
    ? document.querySelector(".container-swipe")!.clientHeight -
        document.querySelector(".el-main")!.clientHeight +
        60 // the height of block add card
    : document.querySelector(".container-swipe")!.clientHeight -
        document.querySelector(".el-main")!.clientHeight;
}
