import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react'
import type { Role, User } from '../types'
import { login as loginService, register as registerService } from '../services'

const STORAGE_KEY = 'uniflow.auth.user'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  register: (name: string, email: string, password: string) => Promise<User>
  logout: () => void
  hasRole: (...roles: Role[]) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser())

  const persist = useCallback((next: User | null) => {
    setUser(next)
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const next = await loginService(email, password)
      persist(next)
      return next
    },
    [persist],
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const next = await registerService(name, email, password)
      persist(next)
      return next
    },
    [persist],
  )

  const logout = useCallback(() => {
    persist(null)
  }, [persist])

  const hasRole = useCallback(
    (...roles: Role[]) => (user ? roles.includes(user.role) : false),
    [user],
  )

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      hasRole,
    }),
    [user, login, register, logout, hasRole],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
