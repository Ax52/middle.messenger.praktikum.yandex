import hbs from "./settings.hbs";
import css from "./settings.module.scss";
import { Popup, Router, validateForm } from "../../../../utils";
import { ChatApi } from "../../../../API";

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
    logoutBtn.onclick = async () => {
      try {
        await ChatApi.logout();
        Router.go("/");
      } catch (err) {
        if (typeof err === "string") {
          Popup(root, err, "error");
        } else {
          console.error("Logout failed:", err);
        }
      }
    };
  }
}
