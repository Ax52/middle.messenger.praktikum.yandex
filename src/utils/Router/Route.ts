export class Route {
  #path: string;

  #component: () => void;

  constructor(path: string, component: () => void) {
    this.#path = path;
    this.#component = component;
  }

  navigate(path: string) {
    if (this.match(path)) {
      this.#path = path;
      this.render();
    }
  }

  match(path: string) {
    return path === this.#path;
  }

  render() {
    this.#component();
  }
}
