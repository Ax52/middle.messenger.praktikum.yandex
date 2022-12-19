import { ChatApi } from "../../API";
import { Popup } from "../Popup";

export type TPathsArr = [string, () => void, boolean][];

export class Router {
  // <=== NOTE: Private fields ===>

  static #routes: TPathsArr = [];

  static #root: HTMLElement;

  static #history = window.history;

  static get #page404() {
    return this.#getRoute("404").route;
  }

  static #getRoute(path: string) {
    const route = this.#routes.find(([r]) => r === path);
    return { route: route?.[1], isPrivate: route?.[2] ?? true };
  }

  static async #onRoute(path: string) {
    const { route, isPrivate } = this.#getRoute(path);

    if (!route) {
      this.#page404?.();

      console.error("Invalid route:\n", path);
      return;
    }

    // NOTE: handle private routes
    if (!isPrivate) {
      route();
    } else {
      const access = await this.#checkAccess();
      if (access) {
        route();
      } else {
        this.go("/");
        Popup("To view this page you need to login first", "warn");
      }
    }
  }

  static async #checkAccess() {
    const access = await ChatApi.checkAccess();
    return access;
  }

  // <=== END ===>

  static async start(root: HTMLElement) {
    this.#root = root;

    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget) {
        const target = event.currentTarget as Window;
        this.#onRoute(target.location.pathname);
      }
    };

    this.#onRoute(window.location.pathname);
  }

  static use(
    path: string | TPathsArr,
    component?: () => void,
    isPrivate = false,
  ) {
    const register = (
      _path: string,
      _component: () => void,
      _isPrivate: boolean,
    ) => {
      this.#routes.push([_path, _component, _isPrivate]);
    };

    if (typeof path === "string" && !!component) {
      register(path, component, isPrivate);
      return this;
    }

    if (Array.isArray(path)) {
      path.forEach(([_path, _component, _isPrivate]) => {
        register(_path, _component, _isPrivate);
      });
    }
    return this;
  }

  static go(path: string) {
    const pathWOHash = path.split("#")[0];
    this.#history.pushState({}, "", path);
    this.#onRoute(pathWOHash ?? "");
  }

  static back() {
    this.#history.back();
  }

  static forward() {
    this.#history.forward();
  }

  static showPage500() {
    const { route: page } = this.#getRoute("500");

    page?.();

    console.warn("Server error");
  }
}
