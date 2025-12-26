'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  mode: 'login' | 'signup'
  isOpen: boolean
  onClose: () => void
  onSwitchMode: (mode: 'login' | 'signup') => void
}

const initialLoginState = {
  email: '',
  password: '',
}

const initialRegisterState = {
  email: '',
  user_name: '',
  mobile_number: '',
  password: '',
  password_confirm: '',
  first_name: '',
  last_name: '',
  city: '',
  country: '',
}

const fieldClassName =
  'w-full px-4 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-sm'

export default function AuthModal({ mode, isOpen, onClose, onSwitchMode }: AuthModalProps) {
  const { login, register } = useAuth()
  const [loginData, setLoginData] = useState(initialLoginState)
  const [registerData, setRegisterData] = useState(initialRegisterState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (mode === 'login') {
      setLoginData((prev) => ({ ...prev, [name]: value }))
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (mode === 'login') {
        await login(loginData)
      } else {
        await register(registerData)
      }
      setLoginData(initialLoginState)
      setRegisterData(initialRegisterState)
      onClose()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const switchLabel = mode === 'login' ? 'Need an account?' : 'Already have an account?'
  const switchCta = mode === 'login' ? 'Sign up' : 'Log in'
  const modalTitle = mode === 'login' ? 'Welcome Back' : 'Join AIBO Wave'
  const submitLabel = isSubmitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <header className="flex items-center justify-between px-8 py-6 border-b border-border bg-white">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {mode === 'login' ? 'Member access' : 'Create account'}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight">{modalTitle}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {mode === 'signup' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={registerData.first_name}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className={fieldClassName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={registerData.last_name}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className={fieldClassName}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={mode === 'login' ? loginData.email : registerData.email}
              onChange={handleInputChange}
              required
              placeholder="you@example.com"
              className={fieldClassName}
            />
          </div>

          {mode === 'signup' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  name="user_name"
                  value={registerData.user_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Choose a username"
                  className={fieldClassName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={registerData.mobile_number}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. +358 40 123 4567"
                  className={fieldClassName}
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className={mode === 'signup' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'grid grid-cols-1 gap-4'}>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={registerData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className={fieldClassName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={registerData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className={fieldClassName}
                />
              </div>
            </div>
          )}

          <div className={mode === 'signup' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'grid grid-cols-1 gap-4'}>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={mode === 'login' ? loginData.password : registerData.password}
                onChange={handleInputChange}
                required
                placeholder={mode === 'login' ? 'Your password' : 'Choose a strong password'}
                className={fieldClassName}
              />
            </div>
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirm"
                  value={registerData.password_confirm}
                  onChange={handleInputChange}
                  required
                  placeholder="Repeat password"
                  className={fieldClassName}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent/90 text-lg disabled:opacity-50 disabled:cursor-not-allowed py-4"
          >
            {submitLabel}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {switchLabel}{' '}
            <button
              type="button"
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary font-semibold hover:underline"
            >
              {switchCta}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
