export function useSetRootCss() {
  const r: HTMLElement = document.querySelector(":root")!;
  (navigator.maxTouchPoints || "ontouchstart" in document.documentElement) && r
    ? r.style.setProperty("--device-cursor", "none")
    : r.style.setProperty("--device-cursor", "pointer");
}
