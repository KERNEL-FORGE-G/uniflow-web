import { useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input, Label } from '../../components/ui/Input'
import { useAuth } from '../../auth/AuthContext'

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('emma.martin@uniflow.edu')
  const [password, setPassword] = useState('demo')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const from = (location.state as { from?: string } | null)?.from
  const defaultPath = user?.role === 'admin' ? '/admin' : '/app'

  if (isAuthenticated) {
    return <Navigate to={from ?? defaultPath} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const next = await login(email, password)
      navigate(from ?? (next.role === 'admin' ? '/admin' : '/app'), { replace: true })
    } catch {
      setError('Connexion impossible. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/assets/UniFlow_Logo_Principal.png" alt="UniFlow" className="mx-auto h-12 w-auto" />
          <h1 className="mt-4 text-2xl font-bold text-text">Connexion</h1>
          <p className="mt-1 text-sm text-muted">Mode démo — utilisez un email mock</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="emma.martin@uniflow.edu"
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>
        <div className="mt-4 rounded-lg bg-bg p-3 text-xs text-muted">
          <p className="font-medium text-text">Comptes démo</p>
          <p>emma.martin@uniflow.edu (étudiant)</p>
          <p>admin@uniflow.edu (admin)</p>
          <p>martin@uniflow.edu (enseignant)</p>
          <p>lucas.dubois@uniflow.edu (délégué)</p>
        </div>
        <p className="mt-4 text-center text-sm">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </Card>
    </div>
  )
}
