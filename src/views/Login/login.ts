import hbs from "./login.hbs";
import css from "./login.module.scss";
import { routeTo, validateForm } from "../../utils";

export function LoginPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-login");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = async (e) => {
      try {
        await validateForm(e);
        // routeTo("/chat");
      } catch (err: unknown) {
        console.error("Error with login form: ", err);
      }
    };
  }

  const signUpBtn = document.querySelector("#sign-up-btn");
  if (signUpBtn instanceof HTMLElement) {
    signUpBtn.onclick = () => {
      routeTo("/register");
    };
  }
}
