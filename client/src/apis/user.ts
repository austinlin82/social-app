import type { User } from '../utils/schemas'

const BASE = 'http://localhost:4000/api'

export async function fetchProfile(): Promise<User> {
  const res = await fetch(`${BASE}/profile`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data as User
}

export async function fetchUsers(page = 1, results = 20): Promise<User[]> {
  const params = new URLSearchParams({ page: String(page), results: String(results) })
  const res = await fetch(`${BASE}/users?` + params.toString())
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  // server may return { results: User[]; page: number } or directly User[]
  if (Array.isArray(data)) return data as User[]
  if (data && Array.isArray((data as any).results)) return (data as any).results as User[]
  return []
}
