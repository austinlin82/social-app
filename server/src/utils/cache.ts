type Entry<T> = { value: T; exp: number };
const store = new Map<string, Entry<any>>();
const DEFAULT_TTL = 60_000;

export function get<T>(k: string): T | null {
  const e = store.get(k);
  if (!e) return null;
  if (Date.now() > e.exp) { store.delete(k); return null; }
  return e.value as T;
}
export function set<T>(k: string, v: T, ttl=DEFAULT_TTL) {
  store.set(k, { value: v, exp: Date.now() + ttl });
}
