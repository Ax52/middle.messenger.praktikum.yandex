import hbs from "./chat.hbs";
import css from "./chat.module.scss";
import Sidebar from "./Components/Sidebar";
import Dialog from "./Components/Dialog";
import EmptyDialog from "./Components/EmptyDialog";
import Settings from "./Components/Settings";

enum TView {
  chat = "chat",
  nochat = "nochat",
  settings = "settings",
}

export function ChatPage(root: HTMLElement, view?: keyof typeof TView) {
  // render
  root.innerHTML = hbs({ css });

  // <=== child render ===>
  const sBarNode = document.querySelector("#sidebar");
  const viewNode = document.querySelector("#view");

  // render sidebar
  if (sBarNode instanceof HTMLElement) {
    Sidebar(sBarNode);
  }

  // render main window
  if (viewNode instanceof HTMLElement) {
    switch (view) {
      case "chat":
        new Dialog(viewNode);
        break;
      case "settings":
        Settings(viewNode);
        break;
      case "nochat":
      default:
        EmptyDialog(viewNode);
        break;
    }
  }
}
