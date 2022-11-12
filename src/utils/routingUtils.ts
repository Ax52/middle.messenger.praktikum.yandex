export function routeTo(path: string) {
  const currentUrl = window.location.origin;
  window.location.href = `${currentUrl}${path}`;
}
