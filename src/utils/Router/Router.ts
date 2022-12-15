import { Route } from "./Route";

export type TPathsArr = [string, () => void][];

export class Router {
  // <=== NOTE: Private fields ===>

  static #routes: Route[] = [];

  static #history = window.history;

  static get #page404() {
    return this.#getRoute("404");
  }

  static #getRoute(path: string) {
    return this.#routes.find((r) => r.match(path));
  }

  static #onRoute(path: string) {
    const route = this.#getRoute(path);
    if (!route) {
      if (this.#page404) {
        this.#page404.render();
      }
      console.error("Invalid route:\n", path);
      return;
    }

    route.render();
  }

  // <=== END ===>

  static start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget) {
        const target = event.currentTarget as Window;
        this.#onRoute(target.location.pathname);
      }
    };

    this.#onRoute(window.location.pathname);
  }

  static use(path: string | TPathsArr, component?: () => void) {
    const register = (_path: string, _component: () => void) => {
      const route = new Route(_path, _component);
      this.#routes.push(route);
    };
    if (typeof path === "string" && !!component) {
      register(path, component);
    } else if (Array.isArray(path)) {
      path.forEach(([_path, _component]) => {
        register(_path, _component);
      });
      this.start();
    }
    return this;
  }

  static go(path: string) {
    this.#history.pushState({}, "", path);
    this.#onRoute(path);
  }

  static back() {
    this.#history.back();
  }

  static forward() {
    this.#history.forward();
  }

  static showPage500() {
    const page = this.#getRoute("500");
    if (page) {
      page.render();
    }
    console.warn("Server error");
  }
}
