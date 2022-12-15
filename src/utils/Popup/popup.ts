import css from "./popup.module.scss";

enum TSeverity {
  success = "success",
  warn = "warn",
  error = "error",
}

export function Popup(
  root: HTMLElement,
  text: string,
  severity: keyof typeof TSeverity = "error",
  duration = 7000,
) {
  const popupDiv = document.createElement("div");
  popupDiv.classList.add(css.popup ?? "", css[severity] ?? "");
  popupDiv.textContent = text;
  root.appendChild(popupDiv);
  setTimeout(() => popupDiv.remove(), duration);
}
