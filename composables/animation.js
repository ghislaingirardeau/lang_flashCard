export function useBeforeLeave(event, home) {
  const { marginLeft, marginTop, width, height } =
    window.getComputedStyle(event);
  const swipeBlock = document.querySelector(".el-main");

  const getTopPosition = home
    ? event.offsetTop
    : event.offsetTop - swipeBlock.scrollTop;
  console.log(event.offsetTop, swipeBlock.scrollTop, getTopPosition);
  event.style.left = `${event.offsetLeft - parseFloat(marginLeft, 10)}px`;
  event.style.top = `${getTopPosition - parseFloat(marginTop, 10)}px`;
  event.style.width = width;
  event.style.height = height;
}

export function useAnimDeleteIcon(id, home, fct1, fct2) {
  document.getElementById(`delete-${id}`)?.classList[fct1]("hide");

  home
    ? document
        .getElementById(`delete-${id}`)
        ?.firstChild?.classList[fct2]("anim-delete-leave")
    : document.getElementById(`remember-${id}`)?.classList[fct1]("hide");
}
