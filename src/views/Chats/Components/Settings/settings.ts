import hbs from "./settings.hbs";
import css from "./settings.module.scss";
import { routeTo } from "../../../../utils";

export function SettingsPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-settings");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = (e) => {
      e.preventDefault();
    };
  }

  const cancelBtn = document.querySelector("#cancel-btn");
  if (cancelBtn instanceof HTMLElement) {
    cancelBtn.onclick = () => {
      routeTo("/chat");
    };
  }

  const saveBtn = document.querySelector("#save-btn");
  if (saveBtn instanceof HTMLElement) {
    saveBtn.onclick = () => {
      routeTo("/chat");
    };
  }

  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn instanceof HTMLElement) {
    logoutBtn.onclick = () => {
      routeTo("/");
    };
  }
}
