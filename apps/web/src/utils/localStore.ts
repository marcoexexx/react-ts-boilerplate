export function getLocalStore<T extends any>(key: string): undefined | T {
  const raw = localStorage.getItem(key);
  if (raw) return JSON.parse(raw);
}

export function setLocalStore<T>(key: string, data: T): T {
  const raw = JSON.stringify(data);
  localStorage.setItem(key, raw);
  return data;
}
