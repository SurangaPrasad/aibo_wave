'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    interest: 'community-member',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    culturalCommunity: '',
    about: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001'
      const response = await fetch(`${baseURL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Application submitted successfully:', data)
        toast.success('Application submitted successfully! We\'ll review your application and get in touch within 7-10 business days.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        onClose()
        // Reset form
        setFormData({
          interest: 'community-member',
          fullName: '',
          email: '',
          phone: '',
          country: '',
          culturalCommunity: '',
          about: '',
        })
      } else {
        console.error('Submission failed:', data)
        setSubmitError(data.error || 'Failed to submit application. Please try again.')
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  const field = 'w-full px-4 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-sm'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-8 py-6 flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Application</p>
            <h2 className="text-3xl font-extrabold">Application Form</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Interest Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">I am interested in...</h3>

              <div className="space-y-3">
                <label className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="interest"
                    value="community-member"
                    checked={formData.interest === 'community-member'}
                    onChange={handleChange}
                    className="mt-1 w-6 h-6 accent-primary"
                  />
                  <div>
                    <p className="font-semibold">Community Member</p>
                    <p className="text-sm text-muted-foreground">Join a local Silent Echo Society and participate in monthly events</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="interest"
                    value="beacon-member"
                    checked={formData.interest === 'beacon-member'}
                    onChange={handleChange}
                    className="mt-1 w-6 h-6 accent-primary"
                  />
                  <div>
                    <p className="font-semibold">Beacon Member (Leader)</p>
                    <p className="text-sm text-muted-foreground">Organize and lead a local Silent Echo Society in your city</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="interest"
                    value="community-artist"
                    checked={formData.interest === 'community-artist'}
                    onChange={handleChange}
                    className="mt-1 w-6 h-6 accent-primary"
                  />
                  <div>
                    <p className="font-semibold">Community Artist</p>
                    <p className="text-sm text-muted-foreground">Perform, exhibit, or contribute your artistic talents to Silent Echo events</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block font-semibold mb-2">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className={field}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block font-semibold mb-2">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className={field}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +358 40 123 4567"
                className={field}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block font-semibold mb-2">Country <span className="text-red-500">*</span></label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className={field + ' appearance-none cursor-pointer'}
              >
                <option value="">Select your country</option>
                <option value="finland">Finland</option>
                <option value="sweden">Sweden</option>
                <option value="norway">Norway</option>
                <option value="denmark">Denmark</option>
                <option value="germany">Germany</option>
                <option value="uk">United Kingdom</option>
                <option value="france">France</option>
                <option value="spain">Spain</option>
                <option value="italy">Italy</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Cultural Community */}
            <div>
              <label className="block font-semibold mb-2">Cultural Community <span className="text-red-500">*</span></label>
              <select
                name="culturalCommunity"
                value={formData.culturalCommunity}
                onChange={handleChange}
                required
                className={field + ' appearance-none cursor-pointer'}
              >
                <option value="">Select your community</option>
                <option value="sri-lankan">Sri Lankan</option>
                <option value="indian">Indian</option>
                <option value="pakistani">Pakistani </option>
                <option value="bangladeshi">Bangladeshi</option>
                <option value="chinese">Chinese</option>
                <option value="vietnamese">Vietnamese</option>
                <option value="thai">Thai</option>
                <option value="filipino">Filipino</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Tell us about yourself */}
            <div>
              <label className="block font-semibold mb-2">Tell us about yourself</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={6}
                placeholder="Share your story, interests, artistic background, or why you want to join Silent Echo..."
                className={field + ' resize-none'}
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent/90 text-lg disabled:opacity-50 disabled:cursor-not-allowed py-4"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>

            {/* Footer Message */}
            <p className="text-center text-sm text-muted-foreground">
              We&apos;ll review your application and get in touch within 7-10 business days.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
