import hbs from "./login.hbs";
import * as css from "./login.module.scss";
import { routeTo } from "../../utils";

export function LoginPage(root) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-login");
  form.onsubmit = (e) => {
    e.preventDefault();
  };

  const signUpBtn = document.querySelector("#sign-up-btn");
  signUpBtn.onclick = () => {
    routeTo("/register");
  };

  const loginBtn = document.querySelector("#sign-in-btn");
  loginBtn.onclick = () => {
    routeTo("/chat");
  };
}
