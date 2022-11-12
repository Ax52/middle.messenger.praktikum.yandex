import hbs from "./login.hbs";
import css from "./login.module.scss";
import { routeTo } from "../../utils";

export function LoginPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-login");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = (e) => {
      e.preventDefault();
    };
  }

  const signUpBtn = document.querySelector("#sign-up-btn");
  if (signUpBtn instanceof HTMLElement) {
    signUpBtn.onclick = () => {
      routeTo("/register");
    };
  }

  const loginBtn = document.querySelector("#sign-in-btn");
  if (loginBtn instanceof HTMLElement) {
    loginBtn.onclick = () => {
      routeTo("/chat");
    };
  }
}
