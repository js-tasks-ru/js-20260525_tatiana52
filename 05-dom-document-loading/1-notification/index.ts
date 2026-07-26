import { createElement } from "../../shared/utils/create-element";

interface Options {
  duration?: number;
  type?: "success" | "error";
}

export default class NotificationMessage {
  static activeNotification?: NotificationMessage;

  element?: HTMLElement;
  message: string;
  duration: number;
  type: "success" | "error";
  timerId?: ReturnType<typeof setTimeout>;

  constructor(message: string, {
    duration = 2000,
    type = "success"
  }: Options = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">${this.message}</div>
        </div>
      </div>
    `;
  }

  render() {
    this.element = createElement(this.template);
  }

  show(target: HTMLElement = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }

    NotificationMessage.activeNotification = this;
    target.append(this.element!);

    this.timerId = setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();

    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    if (NotificationMessage.activeNotification === this) {
      NotificationMessage.activeNotification = undefined;
    }

    this.element = undefined;
  }
}
