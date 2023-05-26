export function useFindEltId(el: HTMLElement): null | string {
  if (el.id) return el.id;
  while (el) {
    el = el.parentNode as HTMLElement;
    if (el.id) return el.id;
  }
  return null;
}
