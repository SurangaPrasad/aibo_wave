'use client'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, type ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import SellerSidebar from './SellerSidebar'

type Props = {
  title?: string
  children: ReactNode
}

/**
 * Shared layout for all /seller/* pages.
 *
 * - Redirects unauthenticated visitors to the home page.
 * - Renders a persistent desktop sidebar and a slide-in mobile drawer.
 * - Exposes a sticky top bar with the current page title.
 */
export default function SellerLayout({ title = 'Seller Dashboard', children }: Props) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [router.pathname])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-wave-orange border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <>
      <Head>
        <title>{title} | Aibo Wave Seller</title>
      </Head>

      {/* Full-viewport shell — intentionally breaks out of the site <Layout> scroll context */}
      <div className="fixed inset-0 flex overflow-hidden bg-gray-50">
        {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
        <aside className="hidden md:flex shrink-0 h-full shadow-lg z-10">
          <SellerSidebar />
        </aside>

        {/* ── Mobile overlay ────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* ── Mobile slide-in sidebar ───────────────────────────────────────── */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-hidden={!mobileOpen}
        >
          <SellerSidebar isMobile onClose={() => setMobileOpen(false)} />
        </aside>

        {/* ── Main content area ─────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-3 shrink-0 z-10">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-base font-semibold text-wave-dark truncate">{title}</h1>
          </header>

          {/* Scrollable page content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </>
  )
}
