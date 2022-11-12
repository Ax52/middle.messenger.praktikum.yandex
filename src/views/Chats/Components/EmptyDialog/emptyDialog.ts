import hbs from "./emptyDialog.hbs";
import css from "./emptyDialog.module.scss";

export function EmptyDialog(root: HTMLElement) {
  // render
  root.innerHTML = hbs({ css });
}
