import Handlebars from "handlebars";
import { ChatApi } from "../../../../API";
import {
  Router,
  validateForm,
  getChatId,
  Component,
  Popup,
  storage,
} from "../../../../utils";
import hbs from "./sidebar.hbs";
import css from "./sidebar.module.scss";

interface IMessage {
  avatar: null | string;
  created_by: number;
  id: number;
  last_message: null | string;
  title: string;
  unread_count: number;
}

export class Sidebar extends Component<IMessage[]> {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    super(root, {
      listeners: [
        {
          event: "submit",
          targetId: "#search-dialog",
          callback: (e: SubmitEvent) => this.handleSearch(e),
        },
        {
          event: "click",
          targetId: "#new-dialog",
          callback: () => this.createNewDialog(),
        },
        {
          event: "click",
          targetId: "#settings-btn",
          callback: () => Router.go("/settings"),
        },
        {
          event: "click",
          targetId: ".item-chat-bar",
          callback: (e: Event) => this.chooseChat(e),
        },
        {
          event: "click",
          targetId: "#del-chat",
          callback: (e: Event) => this.deleteChat(e),
        },
      ],
    });
    this.root = root;
  }

  override init() {
    // register helpers
    Handlebars.registerHelper("isChatSelected", (v?: number | string) => {
      const chatId = getChatId();
      if (typeof v === "number") {
        return v.toString() === chatId;
      }
      if (typeof v === "string") {
        return v === chatId;
      }
      return false;
    });
    Handlebars.registerHelper("isUnread", (v) => v > 0);
    this.refreshChats();

    return storage.get("chats") ?? [];
  }

  async refreshChats() {
    try {
      const list = (await ChatApi.getChats()) as IMessage[];
      this.setState(list);
      storage.save("chats", list);
    } catch (err) {
      if (typeof err === "string") {
        Popup(err, "warn");
      } else if (err instanceof Error) {
        Popup(err.message, "warn");
      } else {
        console.error("Failed to refresh chats: ", err);
      }
    }
  }

  async handleSearch(e: SubmitEvent) {
    try {
      await validateForm(e);
      // filterDialogs();
    } catch (err: unknown) {
      console.error("Error with search form: ", err);
    }
  }

  async createNewDialog() {
    // eslint-disable-next-line no-alert
    const chatTitle = prompt("Enter chat title");
    if (chatTitle) {
      try {
        const { id: chatId } = await ChatApi.createChat(chatTitle);
        await this.refreshChats();
        Router.go(`/messenger/dialog#${chatId}`);
      } catch (err) {
        console.error("failed to create new dialog: ", err);
      }
    }
  }

  chooseChat(e: Event) {
    const { id } = (e.target as HTMLElement).dataset;
    Router.go(`/messenger/dialog#${id}`);
  }

  async deleteChat(e: Event) {
    const agreed = window.confirm("Are you sure?");
    const { id } = (e.target as HTMLElement).dataset;
    if (!agreed || !id) return;
    try {
      await ChatApi.deleteChat(+id);
      this.refreshChats();
    } catch (err) {
      console.error("Failed to delete dialog: ", err);
    }
  }

  override render() {
    return hbs({ css, chatsArr: this.state ?? "" });
  }
}
