import hbs from "./settings.hbs";
import css from "./settings.module.scss";
import { Popup, Router, routes } from "../../../../utils";
import { FormHandler } from "./utils";
import { ChatApi } from "../../../../API";

export function SettingsPage(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-settings");
  if (form instanceof HTMLFormElement) {
    new FormHandler(form, css);
  }

  const cancelBtn = document.querySelector("#cancel-btn");
  if (cancelBtn instanceof HTMLElement) {
    cancelBtn.onclick = () => {
      Router.go(routes.messenger);
    };
  }

  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn instanceof HTMLElement) {
    logoutBtn.onclick = async () => {
      try {
        await ChatApi.logout();
        Router.go(routes.loginShort);
      } catch (err) {
        if (typeof err === "string") {
          Popup(err, "error");
        } else {
          console.error("Logout failed:", err);
        }
      }
    };
  }
}
