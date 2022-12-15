import hbs from "./settings.hbs";
import css from "./settings.module.scss";
import { Router, validateForm } from "../../../../utils";

export function SettingsPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-settings");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = async (e) => {
      try {
        await validateForm(e);
        // saveNewSettings();
      } catch (err: unknown) {
        console.error("Error with settings form: ", err);
      }
    };
  }

  const cancelBtn = document.querySelector("#cancel-btn");
  if (cancelBtn instanceof HTMLElement) {
    cancelBtn.onclick = () => {
      Router.go("/messenger");
    };
  }

  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn instanceof HTMLElement) {
    logoutBtn.onclick = () => {
      Router.go("/");
    };
  }
}
