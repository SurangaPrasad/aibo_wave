'use client'

import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SellerLayout from '@/components/seller/SellerLayout'
import VendorOnboardingStatus from '@/components/seller/VendorOnboardingStatus'
import { Save } from 'lucide-react'
import { toast } from 'react-toastify'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

const SELLER_COUNTRY_OPTIONS = [
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
]

const SellerSettingsPage: NextPage = () => {
  const { user, accessToken, refreshProfile } = useAuth()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    city: '',
    country: '',
    bio: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        mobile_number: user.mobile_number ?? '',
        city: user.city ?? '',
        country: user.country ?? '',
        bio: user.bio ?? '',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken) return
    setSaving(true)
    try {
      const res = await fetch(`${API_BASE}/auth/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to update profile')
      await refreshProfile()
      toast.success('Profile updated successfully')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const fieldClass =
    'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-wave-orange/30 focus:border-wave-orange transition-colors'

  return (
    <SellerLayout title="Settings">
      <div className="max-w-2xl">
        <VendorOnboardingStatus />

        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <h2 className="text-sm font-semibold text-blue-900">Seller onboarding guide</h2>
          <p className="mt-2 text-sm text-blue-800">
            Before starting Stripe onboarding, make sure your seller profile is complete. Stripe needs your country and will enable both card payments and payout transfers on your connected seller account.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs text-blue-800">
            <li>Select your country from the dropdown below.</li>
            <li>Save your seller profile changes.</li>
            <li>Return to the Stripe section above and click Complete Onboarding.</li>
            <li>Finish Stripe&apos;s hosted onboarding steps to activate payments and payouts.</li>
          </ol>
        </div>

        <p className="text-sm text-gray-500 mb-6">Update your public seller profile information.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Read-only */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
            <input
              type="email"
              value={user?.email ?? ''}
              disabled
              className={`${fieldClass} bg-gray-50 text-gray-400 cursor-not-allowed`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Username</label>
            <input
              type="text"
              value={user?.user_name ?? ''}
              disabled
              className={`${fieldClass} bg-gray-50 text-gray-400 cursor-not-allowed`}
            />
          </div>

          {/* Editable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">First Name</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Mobile Number</label>
            <input
              type="tel"
              name="mobile_number"
              value={form.mobile_number}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className={`${fieldClass} appearance-none cursor-pointer`}
              >
                <option value="">Select your country</option>
                {SELLER_COUNTRY_OPTIONS.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-gray-500">
                Choose the country where your seller payout account will be registered with Stripe.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Tell buyers about yourself or your store…"
              className={fieldClass}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-wave-orange hover:bg-amber-600 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </SellerLayout>
  )
}

export default SellerSettingsPage
