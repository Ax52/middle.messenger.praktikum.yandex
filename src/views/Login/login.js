import hbs from "./login.hbs";
import * as css from "./login.module.scss";

export function LoginPage(root) {
  // render
  root.innerHTML = hbs({ css });

  // event listeners
  const form = document.querySelector("#form-login");

  form.onsubmit = (e) => {
    e.preventDefault();
  };
}
