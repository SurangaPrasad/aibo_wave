
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LogIn, LogOut, LayoutDashboard, UserPlus, ShoppingCart, Store } from 'lucide-react'
import AuthModal from '@/components/auth/AuthModal'
import { useAuth } from '@/contexts/AuthContext'
import { useCartStore } from '@/store/cartStore'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | null>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()
  const totalCartItems = useCartStore((s) => s.getTotalItems())
  const router = useRouter()
  const isVendor = user?.role === 'vendor'

  const isActive = (href: string) => {
    if (!router) return false
    if (href === '/') return router.pathname === '/'
    return router.pathname === href || router.pathname.startsWith(href)
  }

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

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!profileRef.current) return
      if (!(e.target instanceof Node)) return
      if (!profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/societies', label: 'Societies' },
    { href: '/gallery', label: 'Gallery' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
        <Link href="/" className="flex items-center text-2xl font-bold text-black shrink-0">
          {/* Desktop Logo */}
          <img
            src="/aibow-logo.png"
            alt="AIBO Wave Logo"
            className="hidden md:block w-[360px] h-auto"
            loading="eager"
          />
          {/* Mobile Logo */}
          <img
            src="/artboard-logo.png"
            alt="AIBO Wave Logo"
            className="md:hidden w-[40px] h-auto"
            loading="eager"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50 px-1 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${isActive(link.href) ? 'bg-white text-primary border-gray-200 shadow-sm' : 'text-gray-600 border-transparent hover:text-primary hover:bg-white/70'} border text-sm font-medium rounded-full px-3 py-1.5 transition-all whitespace-nowrap`}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              href="/events"
              className={`${isActive('/events') ? 'bg-white text-primary border-gray-200 shadow-sm' : 'text-gray-600 border-transparent hover:text-primary hover:bg-white/70'} border text-sm font-medium rounded-full px-3 py-1.5 transition-all whitespace-nowrap`}
            >
              Events
            </Link>
          )}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-1.5 py-1">

          <Link
            href="/marketplace"
            title="Marketplace"
            aria-label="Marketplace"
            className={`p-2 rounded-full border transition-colors ${isActive('/marketplace') ? 'border-wave-orange bg-wave-orange/10 text-wave-orange' : 'border-transparent text-gray-600 hover:text-primary hover:bg-gray-50'}`}
          >
            <Store className="w-4 h-4" />
          </Link>

          <Link
            href="/cart"
            title="Cart"
            aria-label="Cart"
            className={`relative p-2 rounded-full border transition-colors ${isActive('/cart') ? 'border-wave-orange bg-wave-orange/10 text-wave-orange' : 'border-transparent text-gray-600 hover:text-primary hover:bg-gray-50'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            {hasMounted && totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-wave-orange text-white text-[10px] leading-[18px] text-center font-semibold">
                {totalCartItems > 99 ? '99+' : totalCartItems}
              </span>
            )}
          </Link>
          </div>

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-accent hover:bg-accent/90 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition-colors whitespace-nowrap"
                  aria-label="Open login"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="border border-accent text-accent hover:bg-accent/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition-colors whitespace-nowrap"
                  aria-label="Open sign up"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setIsProfileOpen((s) => !s)}
                    className="w-9 h-9 rounded-full overflow-hidden border border-border"
                    aria-label="Open profile menu"
                  >
                    <img
                      src={user?.profile_picture || '/default-avatar.svg'}
                      alt={user?.full_name || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border overflow-hidden z-50">
                      {isVendor && (
                        <Link
                          href="/seller"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Seller Dashboard
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={async () => {
                          setIsProfileOpen(false)
                          await handleLogout()
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-gray-200 bg-white space-y-1.5"
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl">
          <nav className="flex flex-col py-4 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${isActive(link.href) ? 'mx-2 px-4 py-2.5 bg-gray-50 text-primary font-semibold rounded-xl' : 'mx-2 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary rounded-xl'} transition-colors`}
                onClick={closeMenus}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <Link
                  href="/events"
                  className="mx-2 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary rounded-xl transition-colors"
                  onClick={closeMenus}
                >
                  Events
                </Link>
                {isVendor && (
                  <Link
                    href="/seller"
                    className="mx-2 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary rounded-xl transition-colors"
                    onClick={closeMenus}
                  >
                    Seller Dashboard
                  </Link>
                )}
              </>
            )}

            <Link
              href="/cart"
              className="mx-2 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary rounded-xl transition-colors flex items-center gap-2"
              onClick={closeMenus}
            >
              <ShoppingCart className="w-4 h-4" />
              Cart {totalCartItems > 0 ? `(${totalCartItems})` : ''}
            </Link>

            <Link
              href="/marketplace"
              className="mx-2 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary rounded-xl transition-colors flex items-center gap-2"
              onClick={closeMenus}
            >
              <Store className="w-4 h-4" />
              Marketplace
            </Link>

            {!isAuthenticated ? (
              <div className="flex flex-col gap-3 px-4 mt-3">
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 justify-center transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="border border-accent text-accent hover:bg-accent/10 px-4 py-2.5 rounded-xl flex items-center gap-2 justify-center transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-4 mt-3">
                <Link
                  href="/dashboard"
                  className="bg-gray-900 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 justify-center transition-colors"
                  onClick={closeMenus}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                {isVendor && (
                  <Link
                    href="/seller"
                    className="bg-wave-orange text-white px-4 py-2.5 rounded-xl flex items-center gap-2 justify-center transition-colors"
                    onClick={closeMenus}
                  >
                    <Store className="w-4 h-4" />
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl flex items-center gap-2 justify-center transition-colors"
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
