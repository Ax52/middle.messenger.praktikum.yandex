import hbs from "./register.hbs";
import css from "./register.module.scss";
import { routeTo } from "../../utils";

export function RegisterPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-register");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = (e) => {
      e.preventDefault();
    };
  }

  const cancelBtn = document.querySelector("#cancel-btn");
  if (cancelBtn instanceof HTMLElement) {
    cancelBtn.onclick = () => {
      routeTo("/");
    };
  }

  const registerBtn = document.querySelector("#register-btn");
  if (registerBtn instanceof HTMLElement) {
    registerBtn.onclick = () => {
      routeTo("/");
    };
  }
}
