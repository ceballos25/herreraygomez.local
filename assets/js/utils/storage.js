export function getJSON(key, storage = localStorage) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setJSON(key, value, storage = localStorage) {
  storage.setItem(key, JSON.stringify(value));
}

export function remove(key, storage = localStorage) {
  storage.removeItem(key);
}
