import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, VendorCart } from '@/types/marketplace'

/**
 * Cart store with per-vendor grouping.
 *
 * Multi-vendor checkout requires shipping to be calculated separately for each
 * vendor, so items are always grouped by vendor_id when needed.
 */

type CartState = {
  items: CartItem[]

  // ── Derived helpers ─────────────────────────────────────────────────────────
  /** Items grouped by vendor_id, with per-vendor subtotals attached. */
  getVendorCarts: () => VendorCart[]
  /** Total number of individual units in the cart. */
  getTotalItems: () => number
  /** Grand total price across all vendors. */
  getTotalPrice: () => number
  /** Subtotal for a single vendor. */
  getVendorSubtotal: (vendor_id: string) => number

  // ── Mutations ────────────────────────────────────────────────────────────────
  /**
   * Add an item. If the product is already in the cart, increments its
   * quantity rather than creating a duplicate line.
   */
  addItem: (item: CartItem) => void
  /** Remove a product line entirely. */
  removeItem: (product_id: string) => void
  /**
   * Set an exact quantity. Passing 0 or below removes the item instead of
   * storing a zero-quantity line.
   */
  updateQuantity: (product_id: string, quantity: number) => void
  /** Remove all items belonging to a single vendor (e.g. after checkout). */
  clearVendorCart: (vendor_id: string) => void
  /** Empty the entire cart. */
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ── Derived ─────────────────────────────────────────────────────────────

      getVendorCarts: () => {
        const grouped = get().items.reduce<Record<string, CartItem[]>>((acc, item) => {
          if (!acc[item.vendor_id]) acc[item.vendor_id] = []
          acc[item.vendor_id].push(item)
          return acc
        }, {})

        return Object.entries(grouped).map(([vendor_id, items]) => ({
          vendor_id,
          vendor_name: items[0]?.vendor_name,
          items,
          subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }))
      },

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getVendorSubtotal: (vendor_id) =>
        get()
          .items.filter((i) => i.vendor_id === vendor_id)
          .reduce((sum, item) => sum + item.price * item.quantity, 0),

      // ── Mutations ────────────────────────────────────────────────────────────

      addItem: (incoming) =>
        set((state) => {
          const existing = state.items.find((i) => i.product_id === incoming.product_id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product_id === incoming.product_id
                  ? { ...i, quantity: i.quantity + incoming.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, incoming] }
        }),

      removeItem: (product_id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product_id !== product_id),
        })),

      updateQuantity: (product_id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.product_id !== product_id) }
          }
          return {
            items: state.items.map((i) =>
              i.product_id === product_id ? { ...i, quantity } : i
            ),
          }
        }),

      clearVendorCart: (vendor_id) =>
        set((state) => ({
          items: state.items.filter((i) => i.vendor_id !== vendor_id),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'aibo-cart' }
  )
)
