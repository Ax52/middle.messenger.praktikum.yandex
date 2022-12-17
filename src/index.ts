import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import ChatPage from "./views/Chats";
import { Page404, Page500 } from "./views/ErrorPages";
import { Router, TPathsArr } from "./utils";
import "./index.scss";

const root = document.querySelector("#root");

if (root instanceof HTMLElement) {
  const routes: TPathsArr = [
    ["/", () => LoginPage(root), false],
    ["/login", () => LoginPage(root), false],
    ["/sign-up", () => RegisterPage(root), false],
    ["/messenger", () => ChatPage(root, "nochat"), true],
    ["/messenger/dialog", () => ChatPage(root, "chat"), true],
    ["/settings", () => ChatPage(root, "settings"), true],
    ["404", () => Page404(root), false],
    ["500", () => Page500(root), false],
  ];
  Router.use(routes);
  Router.start(root);
}
