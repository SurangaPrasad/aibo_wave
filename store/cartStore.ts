import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, VendorCart } from '@/types/marketplace'

const GUEST_CART_OWNER = 'guest'

const normalizeCartOwner = (ownerId?: string | null) => ownerId?.trim() || GUEST_CART_OWNER

const getActiveItems = (state: Pick<CartState, 'items' | 'cartsByOwner' | 'activeOwnerId'>) =>
  state.cartsByOwner?.[state.activeOwnerId] ?? state.items ?? []

/**
 * Cart store with per-vendor grouping.
 *
 * Multi-vendor checkout requires shipping to be calculated separately for each
 * vendor, so items are always grouped by vendor_id when needed.
 */

type CartState = {
  items: CartItem[]
  cartsByOwner: Record<string, CartItem[]>
  activeOwnerId: string
  setActiveOwner: (ownerId?: string | null) => void

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
      cartsByOwner: {
        [GUEST_CART_OWNER]: [],
      },
      activeOwnerId: GUEST_CART_OWNER,

      setActiveOwner: (ownerId) =>
        set((state) => {
          const nextOwnerId = normalizeCartOwner(ownerId)
          const cartsByOwner = state.cartsByOwner ?? { [GUEST_CART_OWNER]: state.items ?? [] }

          return {
            activeOwnerId: nextOwnerId,
            cartsByOwner,
            items: cartsByOwner[nextOwnerId] ?? [],
          }
        }),

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
          const activeOwnerId = state.activeOwnerId ?? GUEST_CART_OWNER
          const currentItems = getActiveItems(state)
          const existing = currentItems.find((i) => i.product_id === incoming.product_id)

          const nextItems = existing
            ? currentItems.map((i) =>
                i.product_id === incoming.product_id
                  ? { ...i, quantity: i.quantity + incoming.quantity }
                  : i
              )
            : [...currentItems, incoming]

          if (existing) {
            return {
              items: nextItems,
              cartsByOwner: {
                ...(state.cartsByOwner ?? {}),
                [activeOwnerId]: nextItems,
              },
            }
          }
          return {
            items: nextItems,
            cartsByOwner: {
              ...(state.cartsByOwner ?? {}),
              [activeOwnerId]: nextItems,
            },
          }
        }),

      removeItem: (product_id) =>
        set((state) => {
          const activeOwnerId = state.activeOwnerId ?? GUEST_CART_OWNER
          const nextItems = getActiveItems(state).filter((i) => i.product_id !== product_id)

          return {
            items: nextItems,
            cartsByOwner: {
              ...(state.cartsByOwner ?? {}),
              [activeOwnerId]: nextItems,
            },
          }
        }),

      updateQuantity: (product_id, quantity) =>
        set((state) => {
          const activeOwnerId = state.activeOwnerId ?? GUEST_CART_OWNER
          const currentItems = getActiveItems(state)
          if (quantity <= 0) {
            const nextItems = currentItems.filter((i) => i.product_id !== product_id)
            return {
              items: nextItems,
              cartsByOwner: {
                ...(state.cartsByOwner ?? {}),
                [activeOwnerId]: nextItems,
              },
            }
          }
          const nextItems = currentItems.map((i) =>
            i.product_id === product_id ? { ...i, quantity } : i
          )
          return {
            items: nextItems,
            cartsByOwner: {
              ...(state.cartsByOwner ?? {}),
              [activeOwnerId]: nextItems,
            },
          }
        }),

      clearVendorCart: (vendor_id) =>
        set((state) => {
          const activeOwnerId = state.activeOwnerId ?? GUEST_CART_OWNER
          const nextItems = getActiveItems(state).filter((i) => i.vendor_id !== vendor_id)

          return {
            items: nextItems,
            cartsByOwner: {
              ...(state.cartsByOwner ?? {}),
              [activeOwnerId]: nextItems,
            },
          }
        }),

      clearCart: () =>
        set((state) => {
          const activeOwnerId = state.activeOwnerId ?? GUEST_CART_OWNER
          return {
            items: [],
            cartsByOwner: {
              ...(state.cartsByOwner ?? {}),
              [activeOwnerId]: [],
            },
          }
        }),
    }),
    {
      name: 'aibo-cart',
      version: 2,
      migrate: (persistedState: unknown, version) => {
        const state = (persistedState ?? {}) as Partial<CartState>
        if (version < 2) {
          const legacyItems = Array.isArray(state.items) ? state.items : []
          return {
            ...state,
            items: legacyItems,
            cartsByOwner: {
              [GUEST_CART_OWNER]: legacyItems,
            },
            activeOwnerId: GUEST_CART_OWNER,
          }
        }

        return {
          ...state,
          items: Array.isArray(state.items) ? state.items : [],
          cartsByOwner: state.cartsByOwner ?? { [GUEST_CART_OWNER]: Array.isArray(state.items) ? state.items : [] },
          activeOwnerId: state.activeOwnerId ?? GUEST_CART_OWNER,
        }
      },
    }
  )
)
