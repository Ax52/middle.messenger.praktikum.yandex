import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import ChatPage from "./views/Chats";
import { Page404, Page500 } from "./views/ErrorPages";
import "./index.scss";

const root = document.querySelector("#root");

const location = window.location.pathname.split("/")[1];

switch (location) {
  case "":
  case "login":
    LoginPage(root);
    break;
  case "register":
    RegisterPage(root);
    break;
  case "chat":
    ChatPage(root);
    break;
  default:
    Page404(root);
    break;
}
