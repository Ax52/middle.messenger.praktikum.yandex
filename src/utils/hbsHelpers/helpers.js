// eslint-disable-next-line @typescript-eslint/no-var-requires
const Handlebars = require("handlebars");

Handlebars.registerHelper("isChatSelected", (v) => {
  const chatId = window.location.hash.replace("#", "");
  if (typeof v === "number") {
    return v.toString() === chatId;
  }
  if (typeof v === "string") {
    return v === chatId;
  }
  return false;
});

Handlebars.registerHelper("isUnread", (v) => v > 0);

Handlebars.registerHelper("isYourMessage", (v) => v !== "you");

module.exports = Handlebars;
