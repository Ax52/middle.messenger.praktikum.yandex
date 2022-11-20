import hbs from "./register.hbs";
import css from "./register.module.scss";
import { routeTo, validateForm } from "../../utils";

export function RegisterPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-register");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = async (e) => {
      try {
        await validateForm(e);
        // routeTo("/");
      } catch (err: unknown) {
        console.error("Error with register form: ", err);
      }
    };
  }

  const cancelBtn = document.querySelector("#cancel-btn");
  if (cancelBtn instanceof HTMLElement) {
    cancelBtn.onclick = () => {
      routeTo("/");
    };
  }
}
