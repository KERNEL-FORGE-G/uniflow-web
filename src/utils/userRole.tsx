import { useState, createContext, useContext } from 'react'

export type Role = 'student' | 'delegate' | 'teacher' | 'admin'

export interface UserProfile {
  name: string
  roleLabel: string
  email: string
  avatar?: string
  status: 'En ligne' | 'Hors ligne' | 'Synchro...'
  filiere?: string
  role?: string
  phone?: string
  address?: string
  level?: string
}

export const usersByRole: Record<Role, UserProfile> = {
  student: {
    name: 'Emma Martin',
    roleLabel: 'Étudiante - L2 Info',
    email: 'emma.martin@uniflow.edu',
    status: 'En ligne',
    filiere: 'L2 Info - Informatique',
  },
  delegate: {
    name: 'Lucas Dubois',
    roleLabel: 'Délégué - L2 Info',
    email: 'lucas.dubois@uniflow.edu',
    status: 'En ligne',
    filiere: 'L2 Info - Informatique',
  },
  teacher: {
    name: 'Pr. Kamga',
    roleLabel: 'Enseignant - Informatique',
    email: 'kamga@uniflow.edu',
    status: 'En ligne',
  },
  admin: {
    name: 'Administrateur',
    roleLabel: 'Super Admin',
    email: 'admin@uniflow.edu',
    status: 'En ligne',
  },
}

interface RoleContextProps {
  currentRole: Role
  setCurrentRole: (role: Role) => void
  currentUser: UserProfile
  isOfflineMode: boolean
  setIsOfflineMode: (offline: boolean) => void
  language: 'FR' | 'EN'
  setLanguage: (lang: 'FR' | 'EN') => void
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem('uniflow_role')
    return (saved as Role) || 'student'
  })

  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(() => {
    return localStorage.getItem('uniflow_offline') === 'true'
  })

  const [language, setLanguage] = useState<'FR' | 'EN'>(() => {
    return (localStorage.getItem('uniflow_lang') as 'FR' | 'EN') || 'FR'
  })

  const setCurrentRole = (role: Role) => {
    setRoleState(role)
    localStorage.setItem('uniflow_role', role)
  }

  const toggleOffline = (offline: boolean) => {
    setIsOfflineMode(offline)
    localStorage.setItem('uniflow_offline', String(offline))
  }

  const toggleLanguage = (lang: 'FR' | 'EN') => {
    setLanguage(lang)
    localStorage.setItem('uniflow_lang', lang)
  }

  const currentUser = usersByRole[currentRole]

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        isOfflineMode,
        setIsOfflineMode: toggleOffline,
        language,
        setLanguage: toggleLanguage,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useUserRole must be used within a RoleProvider')
  }
  return context
}
