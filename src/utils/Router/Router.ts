export type TPathsArr = [string, () => void][];

export class Router {
  // <=== NOTE: Private fields ===>

  static #routes: [string, () => void][] = [];

  static #history = window.history;

  static get #page404() {
    return this.#getRoute("404");
  }

  static #getRoute(path: string) {
    const route = this.#routes.find(([r]) => r === path);
    return route?.[1];
  }

  static #onRoute(path: string) {
    const route = this.#getRoute(path);
    if (!route) {
      if (this.#page404) {
        this.#page404();
      }
      console.error("Invalid route:\n", path);
      return;
    }

    route();
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
      this.#routes.push([_path, _component]);
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
      page();
    }
    console.warn("Server error");
  }
}
