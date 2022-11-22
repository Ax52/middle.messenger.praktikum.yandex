import hbs from "./chat.hbs";
import css from "./chat.module.scss";
import Sidebar from "./Components/Sidebar";
import Dialog from "./Components/Dialog";
import EmptyDialog from "./Components/EmptyDialog";
import Settings from "./Components/Settings";

export function ChatPage(root: HTMLElement) {
  const location = window.location.pathname.replace("/chat", "");

  // render
  root.innerHTML = hbs({ css });

  // <=== child render ===>
  const sBarNode = document.querySelector("#sidebar");
  const viewNode = document.querySelector("#view");

  // render sidebar
  if (sBarNode instanceof HTMLElement) {
    Sidebar(sBarNode);
  }
  // render mainscreen
  if (viewNode instanceof HTMLElement) {
    switch (location) {
      case "/settings":
        Settings(viewNode);
        break;
      case "/":
      case "":
        EmptyDialog(viewNode);
        break;
      default:
        new Dialog(viewNode);
        break;
    }
  }
}
