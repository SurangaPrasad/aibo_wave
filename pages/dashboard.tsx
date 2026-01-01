'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import LeftNavigation from '@/components/dashboard/LeftNavigation'
import Profile from '@/components/dashboard/Profile'
import Applications from '@/components/dashboard/Applications'
import Events from '@/components/dashboard/Events'
import Overview from '@/components/dashboard/Overview'
import Settings from '@/components/dashboard/Settings'
import { Menu, X } from 'lucide-react'

type SectionType = 'profile' | 'applications' | 'events' | 'overview' | 'settings'

const DashboardPage = () => {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [activeSection, setActiveSection] = useState<SectionType>('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/')
    }
  }, [isLoading, isAuthenticated, router])

  // Close mobile menu when section changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [activeSection])

  if (isLoading || (!isAuthenticated && isLoading)) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />
      case 'applications':
        return user.is_superuser ? <Applications /> : <Overview />
      case 'events':
        return user.is_superuser ? <Events /> : <Overview />
      case 'overview':
        return <Overview />
      case 'settings':
        return <Settings />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <LeftNavigation
          activeSection={activeSection}
          onSectionChange={(section) => setActiveSection(section as SectionType)}
        />
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <LeftNavigation
              activeSection={activeSection}
              onSectionChange={(section) => setActiveSection(section as SectionType)}
              isMobile={true}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                {user?.is_superuser ? 'Admin Panel' : 'Member Area'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '👤'
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
