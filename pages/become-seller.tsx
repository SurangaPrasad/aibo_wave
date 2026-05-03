'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Store, Globe, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

// ── Types ─────────────────────────────────────────────────────────────────────

type FormData = {
  store_name: string
  store_slug: string
  bio: string
  website: string
  business_type: 'individual' | 'company'
  agreed: boolean
}

const INITIAL: FormData = {
  store_name: '',
  store_slug: '',
  bio: '',
  website: '',
  business_type: 'individual',
  agreed: false,
}

// ── Slug helper ───────────────────────────────────────────────────────────────

const toSlug = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

// ── Step sub-components ───────────────────────────────────────────────────────

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-wave-orange/30 focus:border-wave-orange transition-colors'

function StoreDetailsStep({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
          Store Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.store_name}
          onChange={(e) => {
            const name = e.target.value
            onChange({
              store_name: name,
              store_slug: toSlug(name),
            })
          }}
          placeholder="e.g. Sunrise Crafts"
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
          Store URL <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-wave-orange/30 focus-within:border-wave-orange transition-colors">
          <span className="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 h-full flex items-center py-2.5 shrink-0">
            aibow.fi/store/
          </span>
          <input
            type="text"
            value={data.store_slug}
            onChange={(e) => onChange({ store_slug: toSlug(e.target.value) })}
            placeholder="sunrise-crafts"
            className="flex-1 px-3 py-2.5 text-sm text-gray-800 focus:outline-none"
            required
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Only lowercase letters, numbers, and hyphens.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
          Store Description
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={3}
          placeholder="Tell buyers what you sell and what makes your store special…"
          className={inputClass}
        />
      </div>
    </div>
  )
}

function BusinessDetailsStep({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2">
          Business Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['individual', 'company'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange({ business_type: type })}
              className={`border rounded-xl px-4 py-3 text-sm font-medium capitalize transition-colors ${
                data.business_type === type
                  ? 'border-wave-orange bg-wave-orange/10 text-wave-orange'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
          Website / Social Link
        </label>
        <input
          type="url"
          value={data.website}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder="https://your-store.com"
          className={inputClass}
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
        <p className="font-medium mb-1">What happens next?</p>
        <ul className="list-disc pl-4 space-y-1 text-xs">
          <li>Your application will be reviewed within 1–2 business days.</li>
          <li>You'll receive an email once your seller account is approved.</li>
          <li>A 10% platform commission applies to all sales.</li>
          <li>Payouts are available once your balance reaches $50.</li>
        </ul>
      </div>
    </div>
  )
}

function ReviewStep({
  data,
  onChange,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
}) {
  const rows: [string, string][] = [
    ['Store Name', data.store_name],
    ['Store URL', `aibow.fi/store/${data.store_slug}`],
    ['Bio', data.bio || '—'],
    ['Website', data.website || '—'],
    ['Business Type', data.business_type],
  ]

  return (
    <div className="space-y-5">
      <div className="bg-gray-50 rounded-xl divide-y divide-gray-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 px-4 py-3">
            <span className="text-xs font-semibold text-gray-400 w-28 shrink-0">{label}</span>
            <span className="text-sm text-gray-700 break-all">{value}</span>
          </div>
        ))}
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.agreed}
          onChange={(e) => onChange({ agreed: e.target.checked })}
          className="mt-0.5 w-4 h-4 accent-wave-orange shrink-0"
        />
        <span className="text-sm text-gray-600">
          I agree to the{' '}
          <Link href="/terms" className="text-wave-orange underline">
            Seller Terms &amp; Conditions
          </Link>{' '}
          and the 10% platform commission on all sales.
        </span>
      </label>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Store Details', icon: Store },
  { label: 'Business Info', icon: Globe },
  { label: 'Review', icon: CheckCircle },
]

export default function BecomeSellerPage() {
  const { isAuthenticated, accessToken, refreshProfile } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const patch = useCallback((p: Partial<FormData>) => setForm((f) => ({ ...f, ...p })), [])

  const canAdvance = () => {
    if (step === 0) return form.store_name.trim() !== '' && form.store_slug.trim() !== ''
    if (step === 1) return true
    if (step === 2) return form.agreed
    return false
  }

  const handleSubmit = async () => {
    if (!accessToken) return
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/auth/vendor-application/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          store_name: form.store_name,
          store_slug: form.store_slug,
          bio: form.bio,
          website: form.website,
          business_type: form.business_type,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        const msg =
          data?.errors
            ? Object.values(data.errors).flat().join(' ')
            : data?.message ?? 'Submission failed'
        throw new Error(msg)
      }
      await refreshProfile()
      setSubmitted(true)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-wave-dark mb-2">Application Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">
            We'll review your application and notify you via email within 1–2 business days.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-wave-orange hover:bg-amber-600 text-white font-medium py-2.5 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ── Auth gate ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-wave-dark mb-2">Sign in to continue</h2>
          <p className="text-gray-500 text-sm mb-6">
            You need to be logged in to apply as a seller.
          </p>
          <Link
            href="/"
            className="inline-block bg-wave-orange text-white font-medium px-6 py-2.5 rounded-xl hover:bg-amber-600 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Become a Seller | Aibo Wave</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-wave-dark mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-wave-dark px-6 py-5">
              <div className="flex items-center gap-3 mb-1">
                <Store className="w-5 h-5 text-wave-orange" />
                <h1 className="text-lg font-bold text-white">Become a Seller</h1>
              </div>
              <p className="text-white/50 text-xs">Start selling on Aibo Wave marketplace</p>
            </div>

            {/* Step indicators */}
            <div className="flex border-b border-gray-100">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                const active = i === step
                const done = i < step
                return (
                  <div
                    key={s.label}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
                      active
                        ? 'text-wave-orange border-b-2 border-wave-orange'
                        : done
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{i + 1}</span>
                  </div>
                )
              })}
            </div>

            {/* Step content */}
            <div className="p-6">
              {step === 0 && <StoreDetailsStep data={form} onChange={patch} />}
              {step === 1 && <BusinessDetailsStep data={form} onChange={patch} />}
              {step === 2 && <ReviewStep data={form} onChange={patch} />}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-7">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-wave-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canAdvance()}
                    className="flex items-center gap-2 bg-wave-orange hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canAdvance() || submitting}
                    className="flex items-center gap-2 bg-wave-orange hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Submit Application</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Progress text */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
      </div>
    </>
  )
}
