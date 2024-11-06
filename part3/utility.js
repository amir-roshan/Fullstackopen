export function generateUniqueId() {
  const randomPart = Math.random().toString(36).substring(2, 8);
  const timestamp = Date.now().toString(36).slice(-4);

  return `${randomPart}${timestamp}`;
}
