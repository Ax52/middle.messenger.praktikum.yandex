import hbs from "./register.hbs";
import css from "./register.module.scss";
import { Router, validateForm, Popup, routes } from "../../utils";
import { ChatApi } from "../../API";

export function RegisterPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-register");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = async (e) => {
      try {
        const formObject = await validateForm(e);
        await ChatApi.register(formObject);
        Router.go(routes.messenger);
      } catch (err) {
        const text = "Error with register form: ";
        console.error(text, err);
        if (typeof err === "string") {
          Popup(err ?? text, "error");
        }
      }
    };
  }

  const cancelBtn = document.querySelector("#cancel-btn");
  if (cancelBtn instanceof HTMLElement) {
    cancelBtn.onclick = () => {
      Router.go(routes.loginShort);
    };
  }
}
