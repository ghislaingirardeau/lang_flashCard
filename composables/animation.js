export function useBeforeLeave(el) {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);
  const swipeBlock = document.querySelector(".el-main");
  const getTopPosition = el.offsetTop - swipeBlock.scrollTop;
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
  el.style.top = `${getTopPosition - parseFloat(marginTop, 10)}px`;
  el.style.width = width;
  el.style.height = height;
}

export function useAnimDeleteIcon(id, home, fct1, fct2) {
  document.getElementById(`delete-${id}`)?.classList[fct1]("hide");

  home
    ? document
        .getElementById(`delete-${id}`)
        ?.firstChild?.classList[fct2]("anim-delete-leave")
    : document.getElementById(`remember-${id}`)?.classList[fct1]("hide");
}
