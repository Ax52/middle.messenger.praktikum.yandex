import hbs from "./register.hbs";
import * as css from "./register.module.scss";

export function RegisterPage(root) {
  // render
  root.innerHTML = hbs({ css });

  //event listeners
  const form = document.querySelector("#form-register");

  form.onsubmit = (e) => {
    e.preventDefault();
  };
}
