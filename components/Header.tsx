'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogIn } from 'lucide-react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/silent-echo', label: 'Silent Echo' },
    { href: '/societies', label: 'Societies' },
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
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors whitespace-nowrap">
            <LogIn className="w-4 h-4" />
            Login
          </button>
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="mx-8 mt-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center transition-colors">
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
