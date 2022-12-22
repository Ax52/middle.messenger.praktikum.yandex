import hbs from "./login.hbs";
import css from "./login.module.scss";
import { Router, validateForm, Popup, routes } from "../../utils";
import { ChatApi } from "../../API";

export function LoginPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-login");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = async (e) => {
      try {
        const formData = await validateForm(e);
        await ChatApi.login(formData);
        Router.go(routes.messenger);
      } catch (err: unknown) {
        if (typeof err === "string") {
          Popup(err, "error");
        }
        console.error("Error with login form: ", err);
      }
    };
  }

  const signUpBtn = document.querySelector("#sign-up-btn");
  if (signUpBtn instanceof HTMLElement) {
    signUpBtn.onclick = () => {
      Router.go(routes.register);
    };
  }
}
