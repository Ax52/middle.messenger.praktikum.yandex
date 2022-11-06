import hbs from "./chat.hbs";
import * as css from "./chat.module.scss";
import Sidebar from "./Components/Sidebar";
import Dialog from "./Components/Dialog";
import EmptyDialog from "./Components/EmptyDialog";
import Settings from "./Components/Settings";

export function ChatPage(root) {
  const location = window.location.pathname.replace("/chat", "");

  // render
  root.innerHTML = hbs({ css });

  // <=== child render ===>
  const sBarNode = document.querySelector("#sidebar");
  const viewNode = document.querySelector("#view");

  // render sidebar
  Sidebar(sBarNode);
  // render mainscreen
  switch (location) {
    case "/settings":
      Settings(viewNode);
      break;
    case "/":
    case "":
      EmptyDialog(viewNode);
      break;
    default:
      Dialog(viewNode);
      break;
  }
}
