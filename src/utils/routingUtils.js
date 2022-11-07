export function routeTo(path) {
  const currentUrl = window.location.origin;
  window.location = `${currentUrl}${path}`;
}
