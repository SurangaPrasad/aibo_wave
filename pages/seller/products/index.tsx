'use client'

import type { NextPage } from 'next'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import SellerLayout from '@/components/seller/SellerLayout'
import { Package, Plus, Pencil, Trash2, ImageIcon, AlertCircle, RefreshCw } from 'lucide-react'
import type { Product } from '@/types/marketplace'
import { toast } from 'react-toastify'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

// ── Page ──────────────────────────────────────────────────────────────────────

const SellerProductsPage: NextPage = () => {
  const router = useRouter()
  const { accessToken } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    if (!accessToken) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/marketplace/products/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) throw new Error('Failed to load products')
      const json = await res.json()
      const results = json?.data?.results ?? json?.results ?? []
      setProducts(results.map((p: any) => ({ ...p, id: p._id ?? p.id })))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    try {
      const res = await fetch(`${API_BASE}/marketplace/products/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) throw new Error('Delete failed')
      setProducts((prev) => prev.filter((p) => p.id !== id))
      toast.success('Product deleted.')
    } catch {
      toast.error('Failed to delete product.')
    }
  }

  return (
    <SellerLayout title="My Products">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={() => router.push('/seller/products/new')}
          className="flex items-center gap-2 bg-wave-orange hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-wave-orange border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center py-16 text-gray-400 gap-3">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-1.5 text-sm text-wave-orange hover:underline"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="flex flex-col items-center py-20 text-gray-400 gap-3">
          <Package className="w-12 h-12" />
          <p className="text-sm font-medium">No products yet</p>
          <p className="text-xs">Click &quot;Add Product&quot; to list your first item.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Product
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
                  Category
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Price
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                  Stock
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                        {product.images?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-wave-dark truncate max-w-[160px]">
                          {product.name}
                        </p>
                        {!product.is_active && (
                          <span className="text-xs text-red-500">Inactive</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 capitalize hidden sm:table-cell">
                    {product.category || '—'}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-wave-dark">
                    {(product as any).has_sizes
                      ? <span className="text-xs text-gray-400">Varies</span>
                      : `$${Number(product.price).toFixed(2)}`}
                  </td>
                  <td className="px-5 py-4 text-right text-gray-500 hidden md:table-cell">
                    {product.stock}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => router.push(`/seller/products/new?edit=${product.id}`)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-wave-dark transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default SellerProductsPage

