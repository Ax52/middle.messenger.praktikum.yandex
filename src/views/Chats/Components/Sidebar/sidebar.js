import hbs from "./sidebar.hbs";
import * as css from "./sidebar.module.scss";
import { generateId } from "~/src/utils";
import Handlebars from "handlebars";

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

export function Sidebar(root, selectedChatId) {
  // register helpers
  Handlebars.registerHelper("isChatSelected", (v) => {
    const pathArr = window.location.pathname.split("/");
    let chatId = pathArr[1] === "chat" ? pathArr[2] : undefined;
    return v === chatId || v === selectedChatId;
  });

  // render
  root.innerHTML = hbs({ css, chatsArr });

  // event listeners
  const settingsBtn = document.querySelector("#settings-btn");
  settingsBtn.onclick = () => {
    const currentUrl = window.location.origin;
    window.location = `${currentUrl}/chat/settings`;
  };

  const chats = document.querySelectorAll(".item-chat-bar");
  chats.forEach((chat) => {
    const id = chat.dataset.id;
    chat.onclick = () => {
      Sidebar(root, id);
      window.location.href = `${window.location.origin}/chat/${id}`;
    };
  });
}
