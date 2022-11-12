export function generateId() {
  return `${Math.round(Math.random() * 10_000)}${Date.now()}`;
}
