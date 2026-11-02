export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const EASE_OUT: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

/** Smooth-scroll to a section id, leaving room for the floating navbar. */
export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top, behavior });
  return true;
}
