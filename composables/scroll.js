export function useScrollTo() {
  document.querySelector(".el-main").scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

export function useFindEltId(el) {
  if (el.id) return el.id;
  while (el) {
    el = el.parentNode;
    if (el.id) return el.id;
  }
  return null;
}

export function useGetMainHeightScroll(onRouteHome) {
  return onRouteHome
    ? document.querySelector(".container-swipe").clientHeight -
        document.querySelector(".el-main").clientHeight +
        60 // the height of block add card
    : document.querySelector(".container-swipe").clientHeight -
        document.querySelector(".el-main").clientHeight;
}
