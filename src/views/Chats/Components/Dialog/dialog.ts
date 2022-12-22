import Handlebars from "handlebars";
import hbs from "./dialog.hbs";
import css from "./dialog.module.scss";
import {
  Component,
  validateForm,
  formatTime,
  TFormats,
  getChatId,
  OpenWS,
  storage,
} from "../../../../utils";
import { ChatApi } from "../../../../API";

type TState = {
  title?: string;
  messages?: Array<{
    author: string;
    time: string;
    message: string;
  }>;
};

type TWSMessage = {
  content: string;
  type: string;
  time: string;
  user_id: number;
};

export class Dialog extends Component<TState> {
  override state: TState;

  root: HTMLElement;

  dialogId: string;

  userId?: number;

  ws?: WebSocket;

  constructor(root: HTMLElement) {
    super(root);
    this.root = root;
    this.dialogId = getChatId();
    console.log(`messages_${this.dialogId}`);
    this.state = {
      title: "",
      messages: storage.get(`messages_${this.dialogId}`) ?? [],
    };

    this.#initDialog();
    this.init();

    this.setState = this.setState.bind(this);
  }

  async #updateDialogTitle() {
    try {
      const chats = await ChatApi.getChats();
      const { title } = chats.find(
        ({ id }: { id: number }) => id === Number(this.dialogId),
      );
      this.setState((prev) => (prev ? { ...prev, title } : { title }));
    } catch (err) {
      console.warn("failed to update Dialog Title");
    }
  }

  async #initUser() {
    try {
      const { id } = await ChatApi.getUser();
      this.userId = id;
    } catch (err) {
      console.error("Failed to fetch user info: ", err);
    }
  }

  async #initDialog() {
    this.#updateDialogTitle();
    this.#initUser();
    this.ws = await OpenWS({
      chatId: this.dialogId,
      onopen: this.log,
      onclose: this.handleClose,
      onmessage: this.updateMessages,
      onerror: this.log,
    });
  }

  log = (e: Event) => {
    // console.log("[log]: ", e, this);
  };

  override init() {
    // register helpers
    Handlebars.registerHelper("isYourMessage", (v) => v !== "you");
  }

  updateMessages = ({ content, type, time, user_id: id }: TWSMessage) => {
    if (type === "message") {
      const newRecord = {
        author: `${id === this.userId ? "you" : id}`,
        time: formatTime(new Date(time), TFormats.short),
        message: content,
      };
      this.setState((prev) => ({
        ...prev,
        messages: prev?.messages ? [...prev.messages, newRecord] : [newRecord],
      }));
      storage.update(`messages_${this.dialogId}`, [newRecord]);
    }
  };

  handleClose = () => {
    this.#initDialog();
  };

  async pushMessage(text: string) {
    try {
      this.ws?.send(JSON.stringify({ content: text, type: "message" }));
    } catch (err) {
      console.error("Failed to send message via WS: ", err);
    }
  }

  async handleSubmit(e: SubmitEvent) {
    const form = e.target as HTMLFormElement;
    try {
      await validateForm(e);
      this.pushMessage(form.message.value);
    } catch (err: unknown) {
      console.error("Error with message form: ", err);
    }
  }

  async addUserToChat() {
    const userId = prompt("Enter user ID");
    try {
      await ChatApi.addUserToChat(Number(userId), Number(this.dialogId));
    } catch (err) {
      console.error("failed to add user: ", err);
    }
  }

  async removeUserFromChat() {
    const userId = prompt("Enter user ID");
    try {
      await ChatApi.removeUserFromChat(Number(userId), Number(this.dialogId));
    } catch (err) {
      console.error("failed to add user: ", err);
    }
  }

  override addEvents() {
    return [
      {
        event: "submit",
        targetId: "#form-message",
        callback: (e: SubmitEvent) => {
          this.handleSubmit(e);
        },
      },
      {
        event: "click",
        targetId: "#add-user",
        callback: () => this.addUserToChat(),
      },
      {
        event: "click",
        targetId: "#del-user",
        callback: () => this.removeUserFromChat(),
      },
    ];
  }

  override render() {
    return hbs({
      css,
      title: this.state?.title ?? "Dialog",
      messages: this.state?.messages ?? [],
    });
  }
}
