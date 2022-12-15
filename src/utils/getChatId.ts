export function getChatId() {
  return window.location.hash.replace("#", "");
}
