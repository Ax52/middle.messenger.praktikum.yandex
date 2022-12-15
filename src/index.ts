import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import ChatPage from "./views/Chats";
import { Page404, Page500 } from "./views/ErrorPages";
import { Router, TPathsArr } from "./utils";
import "./index.scss";

const root = document.querySelector("#root");

if (root instanceof HTMLElement) {
  const routes: TPathsArr = [
    ["/", () => LoginPage(root)],
    ["/login", () => LoginPage(root)],
    ["/sign-up", () => RegisterPage(root)],
    ["/messenger", () => ChatPage(root, "nochat")],
    ["/messenger/dialog", () => ChatPage(root, "chat")],
    ["/settings", () => ChatPage(root, "settings")],
    ["404", () => Page404(root)],
    ["500", () => Page500(root)],
  ];
  Router.use(routes);
}
