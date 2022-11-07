import hbs from "./register.hbs";
import * as css from "./register.module.scss";
import { routeTo } from "../../utils";

export function RegisterPage(root) {
  // render
  root.innerHTML = hbs({ css });

  //event listeners
  const form = document.querySelector("#form-register");
  form.onsubmit = (e) => {
    e.preventDefault();
  };

  const cancelBtn = document.querySelector("#cancel-btn");
  cancelBtn.onclick = () => {
    routeTo("/");
  };

  const registerBtn = document.querySelector("#register-btn");
  registerBtn.onclick = () => {
    routeTo("/");
  };
}
