import hbs from "./settings.hbs";
import * as css from "./settings.module.scss";

export function SettingsPage(root) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-settings");

  form.onsubmit = (e) => {
    e.preventDefault();
  };
}
