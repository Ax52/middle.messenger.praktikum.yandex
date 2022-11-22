import { EventBus } from "../EventBus";

type TEvent = {
  event: string;
  targetId: string;
  callback: (e?: Event) => void;
};

/* eslint-disable @typescript-eslint/no-empty-function */
export abstract class Component<TState = unknown> {
  #events = {
    init: "init",
    cdm: "componentDidMount",
    cr: "componentRender",
  } as const;

  #root?: HTMLElement;

  state?: TState;

  #props?: Record<string, unknown>;

  #eventBus: () => EventBus;

  constructor(root?: HTMLElement, props?: Record<string, unknown>) {
    const eventBus: EventBus = new EventBus(root);
    this.#root = root;
    this.#props = props;
    this.state = this.init() as unknown as TState;
    this.#eventBus = () => eventBus;

    this.#registerEvents(eventBus);

    eventBus.emit(this.#events.init);
  }

  #registerEvents(eventBus: EventBus) {
    eventBus.on(this.#events.init, this.#init.bind(this), true);
    eventBus.on(this.#events.cdm, this.#componentDidMount.bind(this), true);
    eventBus.on(this.#events.cr, this.#render.bind(this), true);
  }

  #init() {
    this.init();
    this.#eventBus().emit(this.#events.cr);
    const eventsArr: TEvent[] | undefined =
      (this.#props?.listeners as TEvent[]) ??
      (this.addEvents() as unknown as TEvent[]);

    if (!eventsArr?.length) {
      return;
    }

    eventsArr.forEach(({ event, targetId, callback }) => {
      const cb = <T>(e: T) => {
        const ev = e as SubmitEvent;
        if (ev?.target === document.querySelector(targetId)) {
          callback(ev);
        }
      };
      this.#eventBus().on(event, cb);
    });
  }

  init() {}

  #componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  #render() {
    const block = this.render();
    if (this.#root) {
      this.#root.innerHTML = block;
    }
    this.#eventBus().emit(this.#events.cdm);
  }

  render() {
    return "";
  }

  addEvents() {}

  setState(newData: TState | ((oldState?: TState) => TState)) {
    if (newData instanceof Function) {
      Object.assign(this.state ?? {}, newData(this.state));
    } else {
      Object.assign(this.state ?? {}, newData);
    }
    this.#eventBus().emit(this.#events.cr);
  }
}
