'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Package } from 'lucide-react'
import { toast } from 'react-toastify'
import type { Product } from '@/types/marketplace'
import { useCartStore } from '@/store/cartStore'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const items = useCartStore((s) => s.items)
  const inCart = items.find((i) => i.product_id === product.id)

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      vendor_id: product.vendor_id,
      vendor_name: product.vendor_name,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
    })
    toast.success(`"${product.name}" added to cart`)
  }

  const primaryImage = product.images?.[0]
  const outOfStock = product.stock === 0

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <Link href={`/marketplace/${product.id}`} className="absolute inset-0" aria-label={`View ${product.name}`}>
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
              <Package className="w-12 h-12" />
            </div>
          )}
        </Link>

        {outOfStock && (
          <span className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
            Out of stock
          </span>
        )}

        {inCart && (
          <span className="absolute top-2 right-2 bg-wave-orange text-white text-xs font-semibold px-2 py-1 rounded-full">
            In cart ×{inCart.quantity}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {product.category && (
          <span className="text-xs font-medium text-wave-orange uppercase tracking-wide">
            {product.category}
          </span>
        )}

        <Link href={`/marketplace/${product.id}`} className="mt-1 text-sm font-semibold text-wave-dark line-clamp-2 flex-1 hover:text-wave-orange transition-colors">
          {product.name}
        </Link>

        {product.vendor_name && (
          <p className="text-xs text-gray-400 mt-0.5">by {product.vendor_name}</p>
        )}

        {product.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-wave-dark">
            ${Number(product.price).toFixed(2)}
          </span>

          <div className="flex items-center gap-2">
            <Link
              href={`/marketplace/${product.id}`}
              className="text-xs font-medium text-gray-600 hover:text-wave-orange transition-colors"
            >
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex items-center gap-1.5 bg-wave-orange hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              {inCart ? 'Add more' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
