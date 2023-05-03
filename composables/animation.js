export function useBeforeLeave(el) {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
  el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
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
