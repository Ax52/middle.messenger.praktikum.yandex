import hbs from "./login.hbs";
import css from "./login.module.scss";
import { routeTo, validateForm } from "../../utils";

import { Button } from "../../Components";

export function LoginPage(root: HTMLElement) {
  const test = new Button(root, {
    text: "Go to chat",
    id: "simeBtn23",
    clx: [css["outlined-btn"]],
    listeners: [
      {
        event: "click",
        callback: () => {
          routeTo("/chat");
        },
      },
    ],
  });

  // render
  root.innerHTML = hbs({
    css,
    test: test.render(),
  });

  // event listeners
  const form = document.querySelector("#form-login");
  if (form instanceof HTMLFormElement) {
    form.onsubmit = async (e) => {
      try {
        await validateForm(e);
        // routeTo("/chat");
      } catch (err: unknown) {
        console.error("Error with login form: ", err);
      }
    };
  }

  const signUpBtn = document.querySelector("#sign-up-btn");
  if (signUpBtn instanceof HTMLElement) {
    signUpBtn.onclick = () => {
      routeTo("/register");
    };
  }
}
