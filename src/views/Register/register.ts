import hbs from "./register.hbs";
import css from "./register.module.scss";
import { Router, validateForm, Popup } from "../../utils";
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
        const registerResult = await ChatApi.register(formObject);
        console.log("register: ", registerResult);
        Router.go("/messages");
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
      Router.go("/");
    };
  }
}
