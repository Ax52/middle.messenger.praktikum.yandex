import hbs from "./errorPage.hbs";
import css from "./errorPage.module.scss";

interface IErrorPage {
  root: HTMLElement;
  code: string;
  caption: string;
}

function ErrorPage({ root, code, caption }: IErrorPage): void {
  // render
  root.innerHTML = hbs({ css, code, caption });

  // event listeners
  const btn = document.querySelector("#go-back");
  if (btn instanceof HTMLElement) {
    btn.onclick = () => {
      window.history.back();
    };
  }
}

export function Page404(root: HTMLElement) {
  // constants
  const code = "404";
  const caption = "This page doesn't exist";

  ErrorPage({ root, code, caption });
}

export function Page500(root: HTMLElement) {
  // constants
  const code = "500";
  const caption = "We will fixit!";

  ErrorPage({ root, code, caption });
}
