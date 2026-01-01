'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type NavigationItem = {
  id: string
  label: string
  icon: string
  adminOnly?: boolean
}

type LeftNavigationProps = {
  activeSection: string
  onSectionChange: (section: string) => void
  isMobile?: boolean
  onClose?: () => void
}

const LeftNavigation = ({ activeSection, onSectionChange, isMobile = false, onClose }: LeftNavigationProps) => {
  const { user } = useAuth()

  const navigationItems: NavigationItem[] = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'applications', label: 'Applications', icon: '📋', adminOnly: true },
    { id: 'events', label: 'Events', icon: '🎉', adminOnly: true },
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  const filteredItems = navigationItems.filter(
    (item) => !item.adminOnly || user?.is_superuser
  )

  return (
    <div className={`${isMobile ? 'w-full h-full' : 'w-64'} bg-white border-r border-border h-full p-6 relative`}>
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {user?.is_superuser ? 'Admin Panel' : 'Member Area'}
        </p>
      </div>

      <nav className="space-y-2">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeSection === item.id
                ? 'bg-accent text-accent-foreground font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg">
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
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.full_name || user?.user_name}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftNavigation
