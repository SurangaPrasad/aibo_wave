'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import { toast } from 'react-toastify'

const ACCESS_TOKEN_KEY = 'aibo_access_token'
const REFRESH_TOKEN_KEY = 'aibo_refresh_token'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

type AuthUser = {
  id: string
  email: string
  user_name: string
  mobile_number?: string
  first_name?: string
  last_name?: string
  full_name?: string
  city?: string
  country?: string
  profile_picture?: string
  bio?: string
  date_joined?: string
  last_login?: string
  is_superuser?: boolean
  is_staff?: boolean
  is_active?: boolean
}

type LoginPayload = {
  email: string
  password: string
}

type RegistrationPayload = {
  email: string
  user_name: string
  mobile_number: string
  password: string
  password_confirm: string
  first_name?: string
  last_name?: string
  city?: string
  country?: string
}

type AuthContextValue = {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegistrationPayload) => Promise<void>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const persistSession = useCallback((userData: AuthUser, access: string, refresh: string) => {
    setUser(userData)
    setAccessToken(access)
    setRefreshToken(refresh)
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, access)
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    }
  }, [])

  const clearSession = useCallback(() => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  }, [])

  const fetchProfile = useCallback(async (tokenOverride?: string): Promise<void> => {
    const authToken = tokenOverride ?? accessToken
    if (!authToken) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data) {
        throw new Error(data?.message || 'Unable to fetch profile')
      }

      setUser(data)
    } catch (error) {
      console.error('Profile fetch failed:', error)
      clearSession()
    }
  }, [accessToken, clearSession])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const storedAccess = localStorage.getItem(ACCESS_TOKEN_KEY)
    const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY)

    if (storedAccess && storedRefresh) {
      setAccessToken(storedAccess)
      setRefreshToken(storedRefresh)
      fetchProfile(storedAccess).finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [fetchProfile])

  const handleAuthResponse = useCallback(
    async (response: Response) => {
      const payload = await response.json().catch(() => null)
      if (!response.ok || !payload) {
        const message = payload?.message || 'Authentication request failed'
        throw new Error(message)
      }
      const userData = payload.data?.user as AuthUser
      const refresh = payload.data?.tokens?.refresh as string
      const access = payload.data?.tokens?.access as string

      if (!userData || !refresh || !access) {
        throw new Error('Malformed authentication response')
      }

      persistSession(userData, access, refresh)
    },
    [persistSession]
  )

  const login = useCallback(
    async (credentials: LoginPayload) => {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      await handleAuthResponse(response)
      toast.success('Logged in successfully')
    },
    [handleAuthResponse]
  )

  const register = useCallback(
    async (payload: RegistrationPayload) => {
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      await handleAuthResponse(response)
      toast.success('Account created successfully')
    },
    [handleAuthResponse]
  )

  const logout = useCallback(async () => {
    try {
      if (refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({ refresh: refreshToken }),
        })
      }
    } catch (error) {
      console.error('Logout failed, clearing session anyway:', error)
    } finally {
      clearSession()
      toast.info('Logged out')
    }
  }, [accessToken, refreshToken, clearSession])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      login,
      register,
      logout,
      refreshProfile: () => fetchProfile(),
    }),
    [user, accessToken, refreshToken, isLoading, login, register, logout, fetchProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
