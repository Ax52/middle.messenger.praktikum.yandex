import hbs from "./errorPage.hbs";
import * as css from "./errorPage.module.scss";

function ErrorPage({ root, code, caption }) {
  // render
  root.innerHTML = hbs({ css, code, caption });

  // event listeners
  const btn = document.querySelector("#go-back");
  btn.onclick = () => {
    window.history.back();
  };
}

export function Page404(root) {
  // constants
  const code = "404";
  const caption = "This page doesn't exist";

  ErrorPage({ root, code, caption });
}

export function Page500(root) {
  // constants
  const code = "500";
  const caption = "We will fixit!";

  ErrorPage({ root, code, caption });
}
