import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, setTokens, clearTokens, type LoginPayload, type RegisterPayload, type BackendUser, ApiError } from '@/lib/api'
import { useUserRole } from '@/utils/userRole'
import type { Role } from '@/utils/userRole'

// Mapper le rôle backend → rôle frontend
function mapRole(backendRole: string): Role {
  switch (backendRole) {
    case 'ETUDIANT':    return 'student'
    case 'DELEGUE':     return 'delegate'
    case 'ENSEIGNANT':  return 'teacher'
    case 'ADMIN':       return 'admin'
    default:            return 'student'
  }
}

export function useAuth() {
  const navigate = useNavigate()
  const { setCurrentRole } = useUserRole()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authApi.login(payload)
      setTokens(data.accessToken, data.refreshToken)
      // Persister les infos utilisateur
      localStorage.setItem('uniflow_user', JSON.stringify(data.user))
      const role = mapRole(data.user.role)
      setCurrentRole(role)
      // Rediriger selon le rôle
      if (role === 'admin') navigate('/admin')
      else navigate('/app')
      return data
    } catch (err) {
      const msg = err instanceof ApiError
        ? err.message
        : 'Erreur de connexion. Vérifiez vos identifiants.'
      setError(msg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [navigate, setCurrentRole])

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authApi.register(payload)
      setTokens(data.accessToken, data.refreshToken)
      localStorage.setItem('uniflow_user', JSON.stringify(data.user))
      const role = mapRole(data.user.role)
      setCurrentRole(role)
      navigate('/app')
      return data
    } catch (err) {
      const msg = err instanceof ApiError
        ? err.message
        : 'Erreur lors de l\'inscription.'
      setError(msg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [navigate, setCurrentRole])

  const logout = useCallback(() => {
    clearTokens()
    setCurrentRole('student')
    navigate('/login')
  }, [navigate, setCurrentRole])

  const getCurrentUser = useCallback((): BackendUser | null => {
    const raw = localStorage.getItem('uniflow_user')
    if (!raw) return null
    try { return JSON.parse(raw) } catch { return null }
  }, [])

  const isAuthenticated = useCallback((): boolean => {
    return !!localStorage.getItem('uniflow_access_token')
  }, [])

  return { login, register, logout, getCurrentUser, isAuthenticated, loading, error, setError }
}
