// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TCallback = <T>(args?: T | any) => void;

export class EventBus {
  listeners: { [key: string]: TCallback[] };

  elem?: HTMLElement;

  constructor(element?: HTMLElement) {
    this.listeners = {};
    this.elem = element;
  }

  addEvent(event: string, callback: TCallback) {
    if (this.elem) {
      this.elem.addEventListener(event, callback);
    }
  }

  removeEvent(event: string, callback: TCallback) {
    if (this.elem) {
      this.elem.removeEventListener(event, callback);
    }
  }

  on(event: string, callback: TCallback, hidden = false) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    if (Array.isArray(this.listeners[event])) {
      this.listeners[event]?.push(callback);
    }
    if (!hidden) {
      this.addEvent(event, callback);
    }
  }

  off(event: string, callback: TCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.removeEvent(event, callback);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.listeners[event] = this.listeners[event]!.filter(
      (listener: TCallback) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event]?.forEach((listener) => {
      listener(...args);
    });
  }
}
