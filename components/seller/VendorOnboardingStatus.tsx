'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, ExternalLink, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-toastify'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

const SUPPORTED_STRIPE_COUNTRIES = new Set([
  'Canada',
  'France',
  'Germany',
  'Ghana',
  'Ireland',
  'Kenya',
  'Nigeria',
  'South Africa',
  'Uganda',
  'United Kingdom',
  'United States',
  'CA',
  'DE',
  'FR',
  'GB',
  'GH',
  'IE',
  'KE',
  'NG',
  'UG',
  'US',
  'ZA',
])

type StripeStatusResponse = {
  status: string
  has_account: boolean
  account_id: string | null
  transfer_status: string | null
  is_transfers_active: boolean
}

export default function VendorOnboardingStatus() {
  const { accessToken, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [creatingLink, setCreatingLink] = useState(false)
  const [stripeStatus, setStripeStatus] = useState<StripeStatusResponse | null>(null)

  useEffect(() => {
    if (!accessToken) {
      setLoading(false)
      return
    }

    const loadStatus = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/auth/vendor/stripe/status/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const data = await res.json().catch(() => null)
        if (!res.ok || !data) {
          throw new Error(data?.message || 'Failed to load Stripe status')
        }

        setStripeStatus(data as StripeStatusResponse)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to load Stripe status')
      } finally {
        setLoading(false)
      }
    }

    loadStatus()
  }, [accessToken])

  const handleCompleteOnboarding = async () => {
    if (!accessToken) return

    setCreatingLink(true)
    try {
      const res = await fetch(`${API_BASE}/auth/vendor/stripe/onboarding-link/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.onboarding_url) {
        throw new Error(data?.message || 'Failed to create Stripe onboarding link')
      }

      window.location.href = data.onboarding_url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create onboarding link')
    } finally {
      setCreatingLink(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking Stripe onboarding status...
        </div>
      </div>
    )
  }

  const isActive = stripeStatus?.is_transfers_active === true
  const hasCountry = Boolean(user?.country?.trim())
  const hasSupportedCountry = hasCountry && SUPPORTED_STRIPE_COUNTRIES.has(user?.country?.trim() ?? '')

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Stripe Vendor Payout Status</h3>

      {isActive ? (
        <div className="flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 p-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-800">Payouts are active</p>
              <p className="text-xs text-green-700 mt-1">
                Your Stripe recipient transfer capability is active.
              </p>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCompleteOnboarding}
              disabled={creatingLink}
              className="inline-flex items-center gap-2 rounded-xl border border-green-300 bg-white px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creatingLink ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4" />}
              {creatingLink ? 'Opening Stripe...' : 'Update payout details'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Onboarding required</p>
              <p className="text-xs text-amber-800 mt-1">
                Stripe onboarding is not complete yet. Stripe must approve both card payments and transfer payouts for this seller account.
                {stripeStatus?.transfer_status ? ` Current status: ${stripeStatus.transfer_status}.` : ''}
              </p>
              {!hasCountry && (
                <p className="text-xs text-amber-900 mt-2">
                  Select your country in Seller Settings and save it before starting Stripe onboarding.
                </p>
              )}
              {hasCountry && !hasSupportedCountry && (
                <p className="text-xs text-amber-900 mt-2">
                  Stripe payouts are not available for your current country. Update Seller Settings to one of the supported countries before continuing.
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCompleteOnboarding}
              disabled={creatingLink || !hasSupportedCountry}
              className="inline-flex items-center gap-2 rounded-xl bg-wave-orange px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creatingLink ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4" />}
              {creatingLink ? 'Creating Stripe link...' : 'Complete Onboarding'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
