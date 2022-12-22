import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import ChatPage from "./views/Chats";
import { Page404, Page500 } from "./views/ErrorPages";
import { Router, TPathsArr, routes } from "./utils";
import "./index.scss";

const root = document.querySelector("#root");

const { loginShort, login, register, messenger, dialog, settings, _404, _500 } =
  routes;

if (root instanceof HTMLElement) {
  const routesWPages: TPathsArr = [
    [loginShort, () => LoginPage(root), false],
    [login, () => LoginPage(root), false],
    [register, () => RegisterPage(root), false],
    [messenger, () => ChatPage(root, "nochat"), true],
    [dialog, () => ChatPage(root, "chat"), true],
    [settings, () => ChatPage(root, "settings"), true],
    [_404, () => Page404(root), false],
    [_500, () => Page500(root), false],
  ];
  Router.use(routesWPages);
  Router.start(root);
}
