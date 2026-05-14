'use client'

import type { NextPage } from 'next'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SellerLayout from '@/components/seller/SellerLayout'
import { ShoppingBag, AlertCircle, RefreshCw } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

type OrderStatus = 'processing' | 'ready_to_ship' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled'

type SubOrder = {
  id: string
  order_id: string
  buyer_name?: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: OrderStatus
  created_at: string
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  processing: 'bg-yellow-100 text-yellow-700',
  ready_to_ship: 'bg-blue-100 text-blue-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  out_for_delivery: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const SellerOrdersPage: NextPage = () => {
  const { accessToken } = useAuth()
  const [orders, setOrders] = useState<SubOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchOrders = useCallback(async () => {
    if (!accessToken) {
      setOrders([])
      setError(null)
      setLoading(false)
      return
    }

    const requestId = ++requestIdRef.current
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/marketplace/vendor/orders/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controller.signal,
      })

      if (!res.ok) {
        let message = 'Failed to load orders'
        if (res.status === 401) message = 'Session expired. Please sign in again.'
        throw new Error(message)
      }

      const data = await res.json().catch(() => ({}))

      if (requestId !== requestIdRef.current) return

      setOrders(Array.isArray(data.data) ? data.data : [])
      setError(null)
    } catch (err) {
      if (controller.signal.aborted || requestId !== requestIdRef.current) return

      setOrders([])
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      if (requestId !== requestIdRef.current) return
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    fetchOrders()

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [fetchOrders])

  return (
    <SellerLayout title="Orders">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-wave-orange border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center py-16 gap-3 text-gray-400">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 text-sm text-wave-orange hover:underline"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center py-20 text-gray-400 gap-3">
          <ShoppingBag className="w-12 h-12" />
          <p className="text-sm font-medium">No orders yet</p>
          <p className="text-xs">New orders from buyers will appear here.</p>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Order ID
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
                  Date
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-gray-600">
                    #{order.id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-wave-dark">
                    ${Number(order.total).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SellerLayout>
  )
}

export default SellerOrdersPage
