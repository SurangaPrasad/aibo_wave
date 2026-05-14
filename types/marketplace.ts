export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  vendor_id: string
  vendor_name?: string
  images: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ProductListResponse = {
  count: number
  page: number
  page_size: number
  results: Product[]
}

export type CartItem = {
  product_id: string
  vendor_id: string
  vendor_name?: string
  name: string
  price: number
  quantity: number
  image?: string
}

/** One vendor's slice of the cart, ready for per-vendor shipping calculation. */
export type VendorCart = {
  vendor_id: string
  vendor_name?: string
  items: CartItem[]
  subtotal: number
}
