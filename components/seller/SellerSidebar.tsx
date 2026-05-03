'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Wallet,
  Settings,
  X,
  LogOut,
  Store,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const NAV_ITEMS = [
  { href: '/seller', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/seller/products', label: 'My Products', icon: Package, exact: false },
  { href: '/seller/orders', label: 'Orders', icon: ShoppingBag, exact: false },
  { href: '/seller/withdrawals', label: 'Withdrawals', icon: Wallet, exact: false },
  { href: '/seller/settings', label: 'Settings', icon: Settings, exact: false },
]

type Props = {
  onClose?: () => void
  isMobile?: boolean
}

export default function SellerSidebar({ onClose, isMobile = false }: Props) {
  const { pathname } = useRouter()
  const { user, logout } = useAuth()

  const isActive = (item: (typeof NAV_ITEMS)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <div
      className={`${
        isMobile ? 'w-full' : 'w-64'
      } bg-wave-dark text-white h-full flex flex-col select-none`}
    >
      {/* Brand */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5 text-wave-orange shrink-0" />
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium leading-none">
              Seller
            </p>
            <h2 className="text-base font-bold text-white leading-tight">Dashboard</h2>
          </div>
        </div>

        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User chip */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-wave-orange flex items-center justify-center text-sm font-bold shrink-0 uppercase">
            {user?.user_name?.[0] ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{user?.user_name ?? 'Seller'}</p>
            <p className="text-xs text-white/40 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? onClose : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-wave-orange text-white'
                  : 'text-white/65 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-white/10 pt-4">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/65 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Log out
        </button>
      </div>
    </div>
  )
}
