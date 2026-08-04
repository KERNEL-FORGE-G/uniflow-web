const USE_API = import.meta.env.VITE_USE_API === 'true'
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

export function isApiEnabled() {
  return USE_API
}

export function getApiBase() {
  return API_BASE
}

/** Simule une latence réseau en mode mock. */
export async function delay<T>(value: T, ms = 180): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, ms))
  return value
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`)
  }
  return res.json() as Promise<T>
}
