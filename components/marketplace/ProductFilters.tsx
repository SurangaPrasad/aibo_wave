'use client'

import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'

type Props = {
  categories: string[]
  currentCategory: string
  currentVendor: string
  currentSearch: string
  /** Render a compact horizontal strip (mobile) instead of the full sidebar. */
  compact?: boolean
}

export default function ProductFilters({
  categories,
  currentCategory,
  currentVendor,
  currentSearch,
  compact = false,
}: Props) {
  const router = useRouter()
  const [search, setSearch] = useState(currentSearch)
  const [vendor, setVendor] = useState(currentVendor)
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const applyFilters = (overrides: Partial<{
    category: string
    vendor: string
    search: string
  }>) => {
    const merged = {
      category: currentCategory,
      vendor: currentVendor,
      search: currentSearch,
      ...overrides,
    }
    const query: Record<string, string> = {}
    if (merged.category) query.category = merged.category
    if (merged.vendor) query.vendor = merged.vendor
    if (merged.search) query.search = merged.search
    router.push({ pathname: '/marketplace', query })
  }

  const clearAll = () => {
    setSearch('')
    setVendor('')
    router.push('/marketplace')
  }

  const hasFilters = Boolean(currentCategory || currentVendor || currentSearch)

  // ── Full sidebar panel ────────────────────────────────────────────────────

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Search
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            applyFilters({ search })
          }}
          className="flex gap-2"
        >
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Product name…"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/30"
          />
          <button
            type="submit"
            className="p-2 bg-wave-orange text-white rounded-lg hover:bg-amber-600 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
            Category
          </label>
          <div className="space-y-1">
            <button
              onClick={() => applyFilters({ category: '' })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !currentCategory
                  ? 'bg-wave-orange text-white font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => applyFilters({ category: cat })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                  currentCategory === cat
                    ? 'bg-wave-orange text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vendor */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Vendor
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            applyFilters({ vendor })
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            placeholder="Vendor ID…"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/30"
          />
          <button
            type="submit"
            className="p-2 bg-wave-orange text-white rounded-lg hover:bg-amber-600 transition-colors"
            aria-label="Filter by vendor"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Clear all */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors border border-gray-200 rounded-lg py-2"
        >
          <X className="w-4 h-4" />
          Clear all filters
        </button>
      )}
    </div>
  )

  // ── Compact mobile strip ──────────────────────────────────────────────────

  if (compact) {
    return (
      <>
        <div className="flex items-center gap-2">
          {/* Inline search */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              applyFilters({ search })
            }}
            className="flex flex-1 gap-2"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/30"
            />
            <button
              type="submit"
              className="p-2 bg-wave-orange text-white rounded-lg hover:bg-amber-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* More filters toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className={`p-2 rounded-lg border transition-colors ${
              hasFilters
                ? 'border-wave-orange bg-wave-orange/10 text-wave-orange'
                : 'border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-300 transition-colors"
              aria-label="Clear filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expandable panel */}
        {mobileOpen && (
          <div className="mt-3 bg-white rounded-2xl border border-gray-100 p-4">
            <FilterPanel />
          </div>
        )}
      </>
    )
  }

  return <FilterPanel />
}
