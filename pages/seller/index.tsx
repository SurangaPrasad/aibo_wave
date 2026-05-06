import type { NextPage } from 'next'
import Link from 'next/link'
import SellerLayout from '@/components/seller/SellerLayout'
import { useAuth } from '@/contexts/AuthContext'
import { Package, ShoppingBag, Wallet, TrendingUp } from 'lucide-react'

const StatCard = ({
  label,
  value,
  icon: Icon,
  sub,
}: {
  label: string
  value: string | number
  icon: React.ElementType
  sub?: string
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
    <div className="p-3 bg-wave-orange/10 rounded-xl shrink-0">
      <Icon className="w-5 h-5 text-wave-orange" />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-wave-dark mt-0.5">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
)

const SellerOverviewPage: NextPage = () => {
  const { user } = useAuth()

  return (
    <SellerLayout title="Overview">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-wave-dark">
          Welcome back, {user?.first_name || user?.user_name} 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s a snapshot of your store today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Products" value="—" icon={Package} sub="Manage in My Products" />
        <StatCard label="Pending Orders" value="—" icon={ShoppingBag} sub="Manage in Orders" />
        <StatCard label="Total Revenue" value="—" icon={TrendingUp} sub="All time" />
        <StatCard label="Pending Balance" value="—" icon={Wallet} sub="Available to withdraw" />
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/seller/products"
            className="px-4 py-2 bg-wave-orange text-white text-sm font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            + Add Product
          </Link>
          <Link
            href="/seller/orders"
            className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            View Orders
          </Link>
          <Link
            href="/seller/withdrawals"
            className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Withdraw Earnings
          </Link>
        </div>
      </div>
    </SellerLayout>
  )
}

export default SellerOverviewPage
