import fetch from "node-fetch";
import { User } from "../models/User";
import { get, set } from "../utils/cache";

function normalizeUser(raw: any): User {
  const { login, name, email, phone, picture, location } = raw || {};
  const fullName = [name?.first, name?.last].filter(Boolean).join(" ");
  const loc = [location?.city, location?.state, location?.country].filter(Boolean).join(", ");
  const address = [
    location?.street?.number, location?.street?.name,
    location?.city, location?.state, location?.postcode, location?.country
  ].filter(Boolean).join(", ");
  return {
    id: login?.uuid, name: fullName, email,
    phone, picture: picture?.large ?? picture?.medium,
    location: loc, address
  };
}

export async function getProfile(): Promise<User> {
  const cacheKey = "profile";
  const cached = get<User>(cacheKey);
  if (cached) return cached;

  const res = await fetch("https://randomuser.me/api/?results=1");
  if (!res.ok) throw new Error("Upstream error");
  const data: any = await res.json();
  const user = normalizeUser(data.results?.[0]);
  set(cacheKey, user);
  return user;
}

export async function getUsers(page=1, results=20): Promise<{results:User[]; page:number}> {
  const key = `users:${page}:${results}`;
  const cached = get<{results:User[]; page:number}>(key);
  if (cached) return cached;

  const url = `https://randomuser.me/api/?results=${results}&page=${page}&seed=takehome`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Upstream error");
  const data: any = await res.json();
  const out = { results: (data.results ?? []).map(normalizeUser), page };
  set(key, out);
  return out;
}
