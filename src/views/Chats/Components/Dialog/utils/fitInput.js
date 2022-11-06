import * as css from "../dialog.module.scss";

export function fitInput() {
  const view = document.querySelector(`.${css.window}`);
  const input = document.querySelector(`.${css["message-input"]}>input`);
  input.style.width = `${view.clientWidth - 40}px`;
}
