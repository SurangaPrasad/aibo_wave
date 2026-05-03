import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { Product } from '@/types/marketplace'
import ProductCard from '@/components/marketplace/ProductCard'
import ProductFilters from '@/components/marketplace/ProductFilters'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'
const PAGE_SIZE = 20

type Props = {
  products: Product[]
  count: number
  page: number
  categories: string[]
  currentCategory: string
  currentVendor: string
  currentSearch: string
  error: boolean
}

/**
 * Server-side product listing page.
 *
 * getServerSideProps fetches products from the Django REST API on every
 * request, forwarding category, vendor, search, and pagination query params.
 * Filtering is applied server-side so results are immediately crawlable and
 * shareable via URL.
 */
export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const category = typeof query.category === 'string' ? query.category : ''
  const vendor = typeof query.vendor === 'string' ? query.vendor : ''
  const search = typeof query.search === 'string' ? query.search : ''
  const page = Math.max(1, parseInt(typeof query.page === 'string' ? query.page : '1', 10))

  const params = new URLSearchParams({ page: String(page) })
  if (category) params.set('category', category)
  if (vendor) params.set('vendor_id', vendor)
  if (search) params.set('search', search)

  const empty: Props = {
    products: [],
    count: 0,
    page,
    categories: [],
    currentCategory: category,
    currentVendor: vendor,
    currentSearch: search,
    error: false,
  }

  try {
    const res = await fetch(
      `${API_BASE}/marketplace/products/?${params.toString()}`,
      { headers: { Accept: 'application/json' } }
    )

    if (!res.ok) {
      return { props: { ...empty, error: true } }
    }

    const json = await res.json()
    const payload = json?.data ?? json
    const rawProducts = payload?.results ?? []
    const products: Product[] = rawProducts.map((p: any) => ({
      ...p,
      id: p.id ?? p._id,
    }))
    const count = Number(payload?.count ?? products.length ?? 0)
    const currentPage = Number(payload?.page ?? page)

    // Derive unique categories from the current result set for the filter panel.
    // A dedicated /categories/ endpoint would be better for large catalogues.
    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))]

    return {
      props: {
        products,
        count,
        page: currentPage,
        categories,
        currentCategory: category,
        currentVendor: vendor,
        currentSearch: search,
        error: false,
      },
    }
  } catch {
    return { props: { ...empty, error: true } }
  }
}

const MarketplacePage: NextPage<Props> = ({
  products,
  count,
  page,
  categories,
  currentCategory,
  currentVendor,
  currentSearch,
  error,
}) => {
  const totalPages = Math.ceil(count / PAGE_SIZE)

  const buildPageHref = (p: number) => {
    const q = new URLSearchParams({ page: String(p) })
    if (currentCategory) q.set('category', currentCategory)
    if (currentVendor) q.set('vendor', currentVendor)
    if (currentSearch) q.set('search', currentSearch)
    return `/marketplace?${q.toString()}`
  }

  return (
    <>
      <Head>
        <title>Marketplace | Aibo Wave</title>
        <meta
          name="description"
          content="Browse products from verified Aibo Wave vendors."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-wave-dark">Marketplace</h1>
            <p className="text-gray-500 mt-1">
              {error ? 'Unable to load products right now.' : `${count} product${count !== 1 ? 's' : ''} available`}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filter sidebar — desktop only */}
            <aside className="hidden md:block w-60 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-8">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Filters</h2>
                <ProductFilters
                  categories={categories}
                  currentCategory={currentCategory}
                  currentVendor={currentVendor}
                  currentSearch={currentSearch}
                />
              </div>
            </aside>

            {/* Product grid */}
            <main className="flex-1 min-w-0">
              {/* Mobile filters strip */}
              <div className="md:hidden mb-4">
                <ProductFilters
                  categories={categories}
                  currentCategory={currentCategory}
                  currentVendor={currentVendor}
                  currentSearch={currentSearch}
                  compact
                />
              </div>

              {products.length === 0 ? (
                <div className="text-center py-24 text-gray-400">
                  <p className="text-4xl mb-4">🛍️</p>
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  {(currentCategory || currentVendor || currentSearch) && (
                    <Link
                      href="/marketplace"
                      className="inline-block mt-4 text-wave-orange hover:underline text-sm"
                    >
                      Clear all filters
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="mt-10 flex items-center justify-center gap-2"
                  aria-label="Pagination"
                >
                  {page > 1 && (
                    <Link
                      href={buildPageHref(page - 1)}
                      className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="px-4 py-2 text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <Link
                      href={buildPageHref(page + 1)}
                      className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                    >
                      Next →
                    </Link>
                  )}
                </nav>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default MarketplacePage
