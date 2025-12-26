
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogIn, LogOut, LayoutDashboard, UserPlus } from 'lucide-react'
import AuthModal from '@/components/auth/AuthModal'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | null>(null)
  const { isAuthenticated, logout } = useAuth()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMenus = () => {
    setIsMobileMenuOpen(false)
  }

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode)
    closeMenus()
  }

  const handleLogout = async () => {
    await logout()
    closeMenus()
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/societies', label: 'Societies' },
    { href: '/apply', label: 'Apply' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl font-bold text-black">
          {/* Desktop Logo */}
          <img
            src="/aibow-logo.png"
            alt="AIBO Wave Logo"
            className="-ml-12 hidden md:block w-[600px] h-auto"
            loading="eager"
          />
          {/* Mobile Logo */}
          <img
            src="/artboard-logo.png"
            alt="AIBO Wave Logo"
            className="md:hidden w-[50px] h-auto"
            loading="eager"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              href="/events"
              className="text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Events
            </Link>
          )}

          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal('login')}
                className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="border border-accent text-accent hover:bg-accent/10 px-4 py-2 rounded-md flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-8 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors"
                onClick={closeMenus}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                href="/events"
                className="px-8 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors"
                onClick={closeMenus}
              >
                Events
              </Link>
            )}

            {!isAuthenticated ? (
              <div className="flex flex-col gap-3 px-8 mt-3">
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="border border-accent text-accent hover:bg-accent/10 px-4 py-2 rounded-md flex items-center gap-2 justify-center transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-8 mt-3">
                <Link
                  href="/dashboard"
                  className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center transition-colors"
                  onClick={closeMenus}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 justify-center transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      <AuthModal
        mode={authModalMode ?? 'login'}
        isOpen={Boolean(authModalMode)}
        onClose={() => setAuthModalMode(null)}
        onSwitchMode={setAuthModalMode}
      />
    </header>
  )
}

export default Header
