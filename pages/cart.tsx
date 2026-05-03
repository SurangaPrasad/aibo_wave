import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const CartPage: NextPage = () => {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)
  const getTotalItems = useCartStore((s) => s.getTotalItems)
  const getTotalPrice = useCartStore((s) => s.getTotalPrice)

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <>
      <Head>
        <title>Cart | Aibo Wave</title>
        <meta name="description" content="View and manage your marketplace cart." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-wave-dark">Your Cart</h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Clear cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-700">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-1">Add products from the marketplace to get started.</p>
              <Link
                href="/marketplace"
                className="inline-block mt-5 px-5 py-2.5 rounded-xl bg-wave-orange text-white text-sm font-medium hover:bg-amber-600 transition-colors"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.product_id} className="p-4 sm:p-5 flex gap-4">
                      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : null}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-wave-dark truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Vendor: {item.vendor_name ?? item.vendor_id}</p>
                        <p className="text-sm text-gray-700 mt-2">${Number(item.price).toFixed(2)} each</p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                              className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50"
                              aria-label={`Decrease quantity for ${item.name}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                              className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50"
                              aria-label={`Increase quantity for ${item.name}`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-wave-dark">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product_id)}
                              className="text-gray-400 hover:text-red-600"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <aside className="bg-white rounded-2xl border border-gray-100 p-5 h-fit">
                <h2 className="text-base font-semibold text-wave-dark mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-wave-dark pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full mt-5 px-4 py-2.5 rounded-xl bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
                  title="Checkout flow coming soon"
                >
                  Checkout (Coming soon)
                </button>

                <Link
                  href="/marketplace"
                  className="block text-center mt-3 text-sm text-wave-orange hover:underline"
                >
                  Continue shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartPage
