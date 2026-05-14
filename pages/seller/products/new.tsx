'use client'

import type { NextPage } from 'next'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import SellerLayout from '@/components/seller/SellerLayout'
import {
  ArrowLeft, Plus, Trash2, Upload, X, ImageIcon, AlertCircle, Loader2
} from 'lucide-react'
import { toast } from 'react-toastify'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

// ── helpers ───────────────────────────────────────────────────────────────────

function toSlug(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// ── types ─────────────────────────────────────────────────────────────────────

interface Category {
  id: number
  name: string
  slug: string
}

interface Size {
  id: number
  name: string
  display_name: string
  sort_order: number
}

interface SizeVariant {
  size_id: number
  size_name: string
  price: string   // string while editing, convert to float on submit
  stock: string
}

interface ImageEntry {
  /** Local preview URL (createObjectURL) while uploading; S3 URL when done */
  preview: string
  /** Final public S3 URL. Empty while still uploading. */
  url: string
  uploading: boolean
  error: string | null
}

interface FormState {
  name: string
  slug: string
  description: string
  /** Base price — only used when has_sizes = false */
  price: string
  stock: string
  category_id: string
  tags: string
  has_sizes: boolean
  is_active: boolean
}

const emptyForm = (): FormState => ({
  name: '',
  slug: '',
  description: '',
  price: '',
  stock: '',
  category_id: '',
  tags: '',
  has_sizes: false,
  is_active: true,
})

// ── ImageUploader ─────────────────────────────────────────────────────────────

interface ImageUploaderProps {
  images: ImageEntry[]
  onChange: (images: ImageEntry[]) => void
  accessToken: string | null
}

function ImageUploader({ images, onChange, accessToken }: ImageUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File, index: number, list: ImageEntry[]) => {
    // 1. Get presigned URL
    let uploadUrl = ''
    let publicUrl = ''

    try {
      const res = await fetch(`${API_BASE}/marketplace/products/upload-url/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ file_name: file.name, content_type: file.type, folder: 'products' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message ?? 'Upload URL error')
      uploadUrl = json.data.upload_url
      publicUrl = json.data.public_url
    } catch {
      const updated = [...list]
      updated[index] = { ...updated[index], uploading: false, error: 'Failed to get upload URL' }
      onChange(updated)
      return
    }

    // 2. PUT directly to S3
    try {
      const putRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Cache-Control': 'max-age=31536000',
        },
        body: file,
      })
      if (!putRes.ok) throw new Error('S3 upload failed')

      const updated = [...list]
      updated[index] = {
        ...updated[index],
        preview: publicUrl,
        url: publicUrl,
        uploading: false,
        error: null,
      }
      onChange(updated)
    } catch {
      const updated = [...list]
      updated[index] = { ...updated[index], uploading: false, error: 'Upload to storage failed' }
      onChange(updated)
    }
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newEntries: ImageEntry[] = []
    const startIndex = images.length

    Array.from(files).forEach((file, i) => {
      if (!file.type.startsWith('image/')) return
      newEntries.push({
        preview: URL.createObjectURL(file),
        url: '',
        uploading: true,
        error: null,
      })
      // Upload after state update via callback
      setTimeout(() => {
        uploadFile(file, startIndex + i, [...images, ...newEntries])
      }, 0)
    })

    if (newEntries.length > 0) {
      onChange([...images, ...newEntries])
    }
  }

  const remove = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    // Revoke the object URL to avoid memory leaks
    if (images[index].preview.startsWith('blob:')) {
      URL.revokeObjectURL(images[index].preview)
    }
    onChange(updated)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Images
      </label>
      <p className="text-xs text-gray-400 mb-3">
        Upload up to 10 images. First image is the cover. Drag to reorder (coming soon).
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.preview}
              alt={`product image ${i + 1}`}
              className="w-full h-full object-cover"
            />
            {img.uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}
            {img.error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-500/80 p-1">
                <p className="text-white text-xs text-center">{img.error}</p>
              </div>
            )}
            {i === 0 && !img.uploading && !img.error && (
              <span className="absolute bottom-1 left-1 bg-wave-orange text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                Cover
              </span>
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {images.length < 10 && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-wave-orange hover:bg-wave-orange/5 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-wave-orange transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span className="text-xs font-medium">Add</span>
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}

// ── SizeVariantsEditor ────────────────────────────────────────────────────────

interface SizeVariantsEditorProps {
  sizes: Size[]
  variants: SizeVariant[]
  onChange: (variants: SizeVariant[]) => void
}

function SizeVariantsEditor({ sizes, variants, onChange }: SizeVariantsEditorProps) {
  const selectedIds = new Set(variants.map((v) => v.size_id))

  const toggle = (size: Size) => {
    if (selectedIds.has(size.id)) {
      onChange(variants.filter((v) => v.size_id !== size.id))
    } else {
      onChange([
        ...variants,
        { size_id: size.id, size_name: size.display_name, price: '', stock: '' },
      ])
    }
  }

  const updateVariant = (sizeId: number, field: 'price' | 'stock', value: string) => {
    onChange(
      variants.map((v) => (v.size_id === sizeId ? { ...v, [field]: value } : v))
    )
  }

  return (
    <div className="space-y-4">
      {/* Size picker */}
      <div>
        <p className="text-xs font-medium text-gray-600 mb-2">Select available sizes</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => toggle(size)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                selectedIds.has(size.id)
                  ? 'bg-wave-orange border-wave-orange text-white'
                  : 'border-gray-200 text-gray-600 hover:border-wave-orange hover:text-wave-orange'
              }`}
            >
              {size.display_name}
            </button>
          ))}
        </div>
        {sizes.length === 0 && (
          <p className="text-xs text-amber-600 mt-1">
            No sizes defined yet. Ask your admin to add sizes in Django Admin → Marketplace → Sizes.
          </p>
        )}
      </div>

      {/* Price/stock per selected size */}
      {variants.length > 0 && (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Size</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Price ($) *</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Stock *</th>
                <th className="px-4 py-2 w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {variants.map((v) => (
                <tr key={v.size_id}>
                  <td className="px-4 py-2 font-medium text-wave-dark">{v.size_name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={v.price}
                      onChange={(e) => updateVariant(v.size_id, 'price', e.target.value)}
                      placeholder="0.00"
                      className="w-28 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={v.stock}
                      onChange={(e) => updateVariant(v.size_id, 'stock', e.target.value)}
                      placeholder="0"
                      className="w-24 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => toggle({ id: v.size_id, name: v.size_name, display_name: v.size_name, sort_order: 0 })}
                      className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const NewProductPage: NextPage = () => {
  const router = useRouter()
  const { accessToken } = useAuth()
  const { edit: editId } = router.query as { edit?: string }
  const isEdit = Boolean(editId)

  const [form, setForm] = useState<FormState>(emptyForm())
  const [images, setImages] = useState<ImageEntry[]>([])
  const [sizeVariants, setSizeVariants] = useState<SizeVariant[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // ── Load categories, sizes (and product data in edit mode) ─────────────────

  const loadMeta = useCallback(async () => {
    try {
      const [catRes, sizeRes] = await Promise.all([
        fetch(`${API_BASE}/marketplace/categories/`),
        fetch(`${API_BASE}/marketplace/sizes/`),
      ])
      const catJson = await catRes.json()
      const sizeJson = await sizeRes.json()
      setCategories(catJson?.data ?? [])
      setSizes(sizeJson?.data ?? [])
    } catch {
      // Non-fatal: categories/sizes just won't be pre-loaded
    }
  }, [])

  const loadProduct = useCallback(async (id: string) => {
    if (!accessToken) return
    try {
      const res = await fetch(`${API_BASE}/marketplace/products/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) throw new Error('Not found')
      const json = await res.json()
      const p = json?.data ?? json
      setForm({
        name: p.name ?? '',
        slug: p.slug ?? toSlug(p.name ?? ''),
        description: p.description ?? '',
        price: p.has_sizes ? '' : String(p.price ?? ''),
        stock: p.has_sizes ? '' : String(p.stock ?? ''),
        category_id: String(p.category_id ?? ''),
        tags: (p.tags ?? []).join(', '),
        has_sizes: p.has_sizes ?? false,
        is_active: p.is_active ?? true,
      })
      if (p.images?.length) {
        setImages(
          p.images.map((url: string) => ({ preview: url, url, uploading: false, error: null }))
        )
      }
      if (p.has_sizes && p.size_variants?.length) {
        setSizeVariants(
          p.size_variants.map((v: any) => ({
            size_id: v.size_id,
            size_name: v.size_name,
            price: String(v.price),
            stock: String(v.stock ?? 0),
          }))
        )
      }
    } catch {
      toast.error('Failed to load product data.')
      router.push('/seller/products')
    }
  }, [accessToken, router])

  useEffect(() => {
    setLoadingData(true)
    const tasks: Promise<any>[] = [loadMeta()]
    if (isEdit && editId) tasks.push(loadProduct(editId))
    Promise.all(tasks).finally(() => setLoadingData(false))
  }, [isEdit, editId, loadMeta, loadProduct])

  // ── Form helpers ───────────────────────────────────────────────────────────

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'name' && !isEdit ? { slug: toSlug(String(value)) } : {}),
    }))

  // ── Validation ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Product name is required'
    if (!form.slug.trim()) e.slug = 'Slug is required'

    if (!form.has_sizes) {
      if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
        e.price = 'Enter a valid price'
      if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
        e.stock = 'Enter a valid stock quantity'
    } else {
      if (sizeVariants.length === 0) e.sizes = 'Add at least one size variant'
      sizeVariants.forEach((v) => {
        if (!v.price || isNaN(Number(v.price)) || Number(v.price) < 0)
          e[`size_price_${v.size_id}`] = `Price required for ${v.size_name}`
        if (!v.stock || isNaN(Number(v.stock)) || Number(v.stock) < 0)
          e[`size_stock_${v.size_id}`] = `Stock required for ${v.size_name}`
      })
    }

    const pendingUploads = images.filter((i) => i.uploading)
    if (pendingUploads.length > 0) e.images = 'Wait for images to finish uploading'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const imageUrls = images.filter((i) => i.url).map((i) => i.url)
    const selectedCategory = categories.find((c) => String(c.id) === form.category_id)

    const payload: Record<string, any> = {
      name: form.name.trim(),
      slug: toSlug(form.slug),
      description: form.description.trim(),
      category_id: form.category_id,
      category: selectedCategory?.name ?? '',
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      images: imageUrls,
      has_sizes: form.has_sizes,
      is_active: form.is_active,
    }

    if (form.has_sizes) {
      payload.size_variants = sizeVariants.map((v) => ({
        size_id: v.size_id,
        size_name: v.size_name,
        price: Number(v.price),
        stock: Number(v.stock),
      }))
      // Set base price to minimum variant price for catalogue sorting
      const prices = sizeVariants.map((v) => Number(v.price))
      payload.price = Math.min(...prices)
      payload.stock = sizeVariants.reduce((sum, v) => sum + Number(v.stock), 0)
    } else {
      payload.price = Number(form.price)
      payload.stock = Number(form.stock)
      payload.size_variants = []
    }

    const url = isEdit
      ? `${API_BASE}/marketplace/products/${editId}/`
      : `${API_BASE}/marketplace/products/`
    const method = isEdit ? 'PATCH' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) {
        const msg =
          json?.message ??
          Object.values(json?.errors ?? {}).flat().join(' ') ??
          'Something went wrong'
        toast.error(msg)
        return
      }
      toast.success(isEdit ? 'Product updated!' : 'Product created!')
      router.push('/seller/products')
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loadingData) {
    return (
      <SellerLayout title={isEdit ? 'Edit Product' : 'Add Product'}>
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-wave-orange border-t-transparent rounded-full animate-spin" />
        </div>
      </SellerLayout>
    )
  }

  return (
    <SellerLayout title={isEdit ? 'Edit Product' : 'Add Product'}>
      {/* Back + title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.push('/seller/products')}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-wave-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-wave-dark">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">

        {/* ── Section: Basic Info ─────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold text-wave-dark uppercase tracking-wide">
            Basic Information
          </h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Handmade Ceramic Mug"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
              <span className="ml-1 text-xs text-gray-400 font-normal">(auto-generated from name)</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              placeholder="handmade-ceramic-mug"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
            />
            {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              placeholder="Describe your product — materials, care instructions, dimensions…"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={form.category_id}
              onChange={(e) => set('category_id', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange bg-white"
            >
              <option value="">— Select a category —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                No categories yet. Admin can add them in Django Admin → Marketplace → Categories.
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
              <span className="ml-1 text-xs text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set('tags', e.target.value)}
              placeholder="handmade, gift, eco-friendly"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
            />
          </div>
        </section>

        {/* ── Section: Images ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <ImageUploader images={images} onChange={setImages} accessToken={accessToken} />
          {errors.images && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.images}
            </p>
          )}
        </section>

        {/* ── Section: Pricing & Stock ─────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold text-wave-dark uppercase tracking-wide">
            Pricing &amp; Stock
          </h2>

          {/* Has sizes toggle */}
          <div className="flex items-start gap-4">
            <p className="text-sm font-medium text-gray-700 mt-0.5">Size variants</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="has_sizes"
                  checked={!form.has_sizes}
                  onChange={() => {
                    set('has_sizes', false)
                    setSizeVariants([])
                  }}
                  className="accent-wave-orange"
                />
                <span className="text-sm text-gray-600">Single price (no sizes)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="has_sizes"
                  checked={form.has_sizes}
                  onChange={() => set('has_sizes', true)}
                  className="accent-wave-orange"
                />
                <span className="text-sm text-gray-600">Multiple sizes with individual prices</span>
              </label>
            </div>
          </div>

          {/* Single price mode */}
          {!form.has_sizes && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
                />
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => set('stock', e.target.value)}
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/40 focus:border-wave-orange"
                />
                {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
              </div>
            </div>
          )}

          {/* Size variants mode */}
          {form.has_sizes && (
            <div>
              <SizeVariantsEditor
                sizes={sizes}
                variants={sizeVariants}
                onChange={setSizeVariants}
              />
              {errors.sizes && (
                <p className="mt-2 text-xs text-red-500">{errors.sizes}</p>
              )}
              {Object.entries(errors)
                .filter(([k]) => k.startsWith('size_'))
                .map(([k, msg]) => (
                  <p key={k} className="mt-1 text-xs text-red-500">{msg}</p>
                ))}
            </div>
          )}
        </section>

        {/* ── Section: Visibility ──────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Listing status</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {form.is_active
                  ? 'Visible in the marketplace'
                  : 'Hidden — only you can see it'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => set('is_active', !form.is_active)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.is_active ? 'bg-wave-orange' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  form.is_active ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pb-8">
          <button
            type="button"
            onClick={() => router.push('/seller/products')}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-wave-orange hover:bg-amber-600 text-white rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting
              ? 'Saving…'
              : isEdit
              ? 'Save Changes'
              : 'Create Product'}
          </button>
        </div>
      </form>
    </SellerLayout>
  )
}

export default NewProductPage
