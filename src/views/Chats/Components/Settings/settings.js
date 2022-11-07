import hbs from "./settings.hbs";
import * as css from "./settings.module.scss";
import { routeTo } from "~/src/utils";

export function SettingsPage(root) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-settings");
  form.onsubmit = (e) => {
    e.preventDefault();
  };

  const cancelBtn = document.querySelector("#cancel-btn");
  cancelBtn.onclick = () => {
    routeTo("/chat");
  };

  const saveBtn = document.querySelector("#save-btn");
  saveBtn.onclick = () => {
    routeTo("/chat");
  };

  const logoutBtn = document.querySelector("#logout-btn");
  logoutBtn.onclick = () => {
    routeTo("/");
  };
}
