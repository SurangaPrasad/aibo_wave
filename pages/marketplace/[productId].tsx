import { useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'
import type { Product } from '@/types/marketplace'
import { useCartStore } from '@/store/cartStore'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

type Props = {
  product: Product | null
  error: string | null
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const productId = typeof params?.productId === 'string' ? params.productId : ''

  if (!productId) {
    return {
      props: {
        product: null,
        error: 'Invalid product id.',
      },
    }
  }

  try {
    const res = await fetch(`${API_BASE}/marketplace/products/${productId}/`, {
      headers: { Accept: 'application/json' },
    })

    if (res.status === 404) {
      return { notFound: true }
    }

    if (!res.ok) {
      return {
        props: {
          product: null,
          error: 'Unable to load product details right now.',
        },
      }
    }

    const json = await res.json()
    const payload = json?.data ?? json

    const product: Product = {
      ...payload,
      id: payload?.id ?? payload?._id,
    }

    if (!product?.id) {
      return { notFound: true }
    }

    return {
      props: {
        product,
        error: null,
      },
    }
  } catch {
    return {
      props: {
        product: null,
        error: 'Unable to load product details right now.',
      },
    }
  }
}

const ProductDetailPage: NextPage<Props> = ({ product, error }) => {
  const addItem = useCartStore((s) => s.addItem)
  const inCart = useCartStore((s) => s.items.find((i) => i.product_id === product?.id))
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-6">{error ?? 'Product not found.'}</p>
          <Link href="/marketplace" className="text-wave-orange hover:underline font-medium">
            Back to marketplace
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images ?? []
  const hasImages = images.length > 0
  const activeImage = hasImages ? images[selectedImageIndex] : null
  const outOfStock = product.stock === 0

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      vendor_id: product.vendor_id,
      vendor_name: product.vendor_name,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: images[0],
    })

    toast.success(`"${product.name}" added to cart`)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Marketplace | Aibo Wave</title>
        <meta name="description" content={product.description || `View ${product.name} in Aibo Wave Marketplace`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-5 text-sm text-gray-500">
            <Link href="/marketplace" className="hover:text-wave-orange transition-colors">
              Marketplace
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
              <div>
                <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  {activeImage ? (
                    <Image
                      src={activeImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                      <Package className="w-14 h-14" />
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {images.map((img, index) => (
                      <button
                        key={`${img}-${index}`}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border ${index === selectedImageIndex ? 'border-wave-orange' : 'border-gray-200'}`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                {product.category && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-wave-orange mb-2">
                    {product.category}
                  </p>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-wave-dark leading-tight">
                  {product.name}
                </h1>

                {product.vendor_name && (
                  <p className="text-sm text-gray-500 mt-2">
                    Sold by <span className="font-medium text-gray-700">{product.vendor_name}</span>
                  </p>
                )}

                <div className="mt-5 flex items-center gap-4">
                  <p className="text-3xl font-bold text-wave-dark">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  {outOfStock ? (
                    <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-semibold">
                      Out of stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                      In stock: {product.stock}
                    </span>
                  )}
                </div>

                <p className="mt-6 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {product.description || 'No description provided for this product yet.'}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={outOfStock}
                    className="inline-flex items-center gap-2 bg-wave-orange hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium px-5 py-3 rounded-xl transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {inCart ? 'Add one more' : 'Add to cart'}
                  </button>

                  <Link
                    href="/cart"
                    className="inline-flex items-center px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Go to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailPage
