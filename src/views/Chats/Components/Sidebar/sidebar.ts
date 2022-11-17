import Handlebars from "handlebars";
import { /* generateId, */ routeTo } from "../../../../utils";
import hbs from "./sidebar.hbs";
import css from "./sidebar.module.scss";

const chatsArr = [
  {
    // id: generateId(),
    id: "11961667656899418",
    username: "Sergio",
    preview:
      "Hi! Did you saw new movie? It's really interesting movie about dolphins with...",
    unread: true,
  },
  {
    // id: generateId(),
    id: "34751667656875167",
    username: "Hannah",
    preview:
      "Hi! Did you saw new movie? It's really interesting movie about dolphins with...",
    unread: true,
  },
  {
    // id: generateId(),
    id: "89491667656899418",
    username: "Eric",
    preview:
      "Hi! Did you saw new movie? It's really interesting movie about dolphins with...",
    unread: false,
  },
];

export function Sidebar(root: HTMLElement, selectedChatId?: string) {
  // register helpers
  Handlebars.registerHelper("isChatSelected", (v) => {
    const pathArr = window.location.pathname.split("/");
    const chatId = pathArr[1] === "chat" ? pathArr[2] : undefined;
    return v === chatId || v === selectedChatId;
  });

  // render
  root.innerHTML = hbs({ css, chatsArr });

  // event listeners
  const settingsBtn = document.querySelector("#settings-btn");
  if (settingsBtn instanceof HTMLElement) {
    settingsBtn.onclick = () => {
      routeTo("/chat/settings");
    };
  }

  const chats: NodeListOf<HTMLElement> =
    document.querySelectorAll(".item-chat-bar");
  if (chats) {
    chats.forEach((chat) => {
      const { id } = chat.dataset;
      chat.onclick = () => {
        Sidebar(root, id);
        routeTo(`/chat/${id}`);
      };
    });
  }

  const searchForm = document.querySelector("#search-dialog");
  if (searchForm instanceof HTMLFormElement) {
    searchForm.onsubmit = (e) => {
      e.preventDefault();
    };
  }
}
