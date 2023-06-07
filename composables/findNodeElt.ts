export function useFindEltId(el: HTMLElement): null | string {
  if (el.id) return el.id;
  while (el) {
    el = el.parentNode as HTMLElement;
    if (el.id) return el.id;
  }
  return null;
}

export function testSum(a: number, b: number): number {
  return a + b;
}
