import hbs from "./emptyDialog.hbs";
import * as css from "./emptyDialog.module.scss";

export function EmptyDialog(root) {
  // render
  root.innerHTML = hbs({ css });
}
