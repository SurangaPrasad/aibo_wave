'use client'

import { useState, useEffect, useMemo } from 'react'
import { X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  organizer: string
}

// City data by country
const CITIES_BY_COUNTRY: Record<string, string[]> = {
  Finland: ['Helsinki', 'Oulu', 'Tampere', 'Espoo', 'Vantaa', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Rovaniemi'],
  Sweden: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'],
  Norway: ['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Sandnes', 'Tromsø', 'Sarpsborg'],
  Denmark: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde'],
  Germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  'United Kingdom': ['London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow', 'Liverpool', 'Edinburgh', 'Bristol', 'Cardiff', 'Belfast'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  Spain: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
  Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
}

const COUNTRIES = Object.keys(CITIES_BY_COUNTRY)

const CULTURAL_COMMUNITIES = [
  'Sri Lankan',
  'Indian',
  'Pakistani',
  'Bangladeshi',
  'Chinese',
  'Vietnamese',
  'Thai',
  'Filipino',
  'African',
  'Middle Eastern',
  'Latin American',
  'European',
  'Other'
]

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    event_id: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    culturalCommunity: '',
  })

  const [events, setEvents] = useState<Event[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  // Mobile popup states
  const [showMobilePopup, setShowMobilePopup] = useState(false)
  const [mobilePopupMessage, setMobilePopupMessage] = useState('')
  const [mobilePopupType, setMobilePopupType] = useState<'success' | 'error'>('success')
  const [isMobile, setIsMobile] = useState(false)
  
  // Search states
  const [eventSearch, setEventSearch] = useState('')
  const [countrySearch, setCountrySearch] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [culturalCommunitySearch, setCulturalCommunitySearch] = useState('')
  const [showEventDropdown, setShowEventDropdown] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showCulturalCommunityDropdown, setShowCulturalCommunityDropdown] = useState(false)

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch events when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchEvents()
    }
  }, [isOpen])

  const fetchEvents = async () => {
    setIsLoadingEvents(true)
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001'
      const response = await fetch(`${baseURL}/api/events/`)
      const data = await response.json()
      
      if (response.ok) {
        setEvents(data.events || [])
      } else {
        console.error('Failed to fetch events:', data)
        toast.error('Failed to load events. Please try again.')
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Error loading events. Please try again.')
    } finally {
      setIsLoadingEvents(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001'
      
      // Prepare registration data
      const registrationData = {
        event_id: formData.event_id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        culturalCommunity: formData.culturalCommunity,
        registration_date: new Date().toISOString(),
      }

      const response = await fetch(`${baseURL}/api/registrations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Registration successful:', data)
        
        // Reset form
        setFormData({
          event_id: '',
          name: '',
          email: '',
          phone: '',
          country: '',
          city: '',
          culturalCommunity: '',
        })
        setEventSearch('')
        setCountrySearch('')
        setCitySearch('')
        setCulturalCommunitySearch('')
        
        if (isMobile) {
          // Show mobile popup (modal will close when user clicks OK)
          setMobilePopupType('success')
          setMobilePopupMessage('Registration successful! You\'ll receive a confirmation email shortly.')
          setShowMobilePopup(true)
        } else {
          // Show toast for desktop and close immediately
          toast.success('Registration successful!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          onClose()
        }
      } else {
        console.error('Registration failed:', data)
        const errorMessage = data.error || 'Failed to register. Please try again.'
        
        if (isMobile) {
          // Show mobile popup
          setMobilePopupType('error')
          setMobilePopupMessage(errorMessage)
          setShowMobilePopup(true)
        } else {
          // Show error in form for desktop
          setSubmitError(errorMessage)
        }
      }
    } catch (error) {
      console.error('Network error:', error)
      const errorMessage = 'Network error. Please check your connection and try again.'
      
      if (isMobile) {
        // Show mobile popup
        setMobilePopupType('error')
        setMobilePopupMessage(errorMessage)
        setShowMobilePopup(true)
      } else {
        // Show error in form for desktop
        setSubmitError(errorMessage)
      }
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

  // Filtered events based on search
  const filteredEvents = useMemo(() => {
    if (!eventSearch) return events
    return events.filter(event =>
      event.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      event.location.toLowerCase().includes(eventSearch.toLowerCase())
    )
  }, [eventSearch, events])

  // Filtered countries based on search
  const filteredCountries = useMemo(() => {
    if (!countrySearch) return COUNTRIES
    return COUNTRIES.filter(country =>
      country.toLowerCase().includes(countrySearch.toLowerCase())
    )
  }, [countrySearch])

  // Available cities based on selected country
  const availableCities = useMemo(() => {
    if (!formData.country) return []
    return CITIES_BY_COUNTRY[formData.country] || []
  }, [formData.country])

  // Filtered cities based on search
  const filteredCities = useMemo(() => {
    if (!citySearch) return availableCities
    return availableCities.filter(city =>
      city.toLowerCase().includes(citySearch.toLowerCase())
    )
  }, [citySearch, availableCities])

  // Filtered cultural communities based on search
  const filteredCulturalCommunities = useMemo(() => {
    if (!culturalCommunitySearch) return CULTURAL_COMMUNITIES
    return CULTURAL_COMMUNITIES.filter(community =>
      community.toLowerCase().includes(culturalCommunitySearch.toLowerCase())
    )
  }, [culturalCommunitySearch])

  const handleEventSelect = (event: Event) => {
    setFormData({ ...formData, event_id: event.id })
    setEventSearch(event.title)
    setShowEventDropdown(false)
  }

  const handleCountrySelect = (country: string) => {
    setFormData({ ...formData, country, city: '' })
    setCountrySearch(country)
    setCitySearch('')
    setShowCountryDropdown(false)
  }

  const handleCitySelect = (city: string) => {
    setFormData({ ...formData, city })
    setCitySearch(city)
    setShowCityDropdown(false)
  }

  const handleCulturalCommunitySelect = (community: string) => {
    setFormData({ ...formData, culturalCommunity: community })
    setCulturalCommunitySearch(community)
    setShowCulturalCommunityDropdown(false)
  }

  if (!isOpen) return null

  const field = 'w-full px-4 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-sm'

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-8 py-6 flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Event Registration</p>
            <h2 className="text-3xl font-extrabold">Register for Event</h2>
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
            {/* Event Selection - Searchable */}
            <div className="relative">
              <label className="block font-semibold mb-2">Select Event <span className="text-red-500">*</span></label>
              {isLoadingEvents ? (
                <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
                  <p className="text-muted-foreground">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
                  <p className="text-muted-foreground">No events available at the moment</p>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      onFocus={() => setShowEventDropdown(true)}
                      onBlur={() => setTimeout(() => setShowEventDropdown(false), 200)}
                      placeholder="Search event..."
                      className={field + ' pl-12'}
                      required={!formData.event_id}
                    />
                  </div>
                  {showEventDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => handleEventSelect(event)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-semibold text-sm">{event.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })} • {event.location}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-muted-foreground text-center">
                          No events found
                        </div>
                      )}
                    </div>
                  )}
                  {formData.event_id && !showEventDropdown && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selected: {events.find(e => e.id === formData.event_id)?.title}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block font-semibold mb-2">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
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

            {/* Cultural Community - Searchable */}
            <div className="relative">
              <label className="block font-semibold mb-2">Cultural Community <span className="text-red-500">*</span></label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={culturalCommunitySearch}
                  onChange={(e) => setCulturalCommunitySearch(e.target.value)}
                  onFocus={() => setShowCulturalCommunityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCulturalCommunityDropdown(false), 200)}
                  placeholder="Search community..."
                  className={field + ' pl-12'}
                  required={!formData.culturalCommunity}
                />
              </div>
              {showCulturalCommunityDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCulturalCommunities.length > 0 ? (
                    filteredCulturalCommunities.map((community) => (
                      <div
                        key={community}
                        onClick={() => handleCulturalCommunitySelect(community)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        {community}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-muted-foreground text-center">
                      No communities found
                    </div>
                  )}
                </div>
              )}
              {formData.culturalCommunity && !showCulturalCommunityDropdown && (
                <p className="mt-2 text-sm text-muted-foreground">Selected: {formData.culturalCommunity}</p>
              )}
            </div>

            {/* Country - Searchable */}
            <div className="relative">
              <label className="block font-semibold mb-2">Country <span className="text-red-500">*</span></label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  onFocus={() => setShowCountryDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                  placeholder="Search country..."
                  className={field + ' pl-12'}
                  required={!formData.country}
                />
              </div>
              {showCountryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <div
                        key={country}
                        onClick={() => handleCountrySelect(country)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        {country}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-muted-foreground text-center">
                      No countries found
                    </div>
                  )}
                </div>
              )}
              {formData.country && !showCountryDropdown && (
                <p className="mt-2 text-sm text-muted-foreground">Selected: {formData.country}</p>
              )}
            </div>

            {/* City - Searchable (appears after country selection) */}
            {formData.country && (
              <div className="relative">
                <label className="block font-semibold mb-2">City <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    onFocus={() => setShowCityDropdown(true)}
                    onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                    placeholder="Search city..."
                    className={field + ' pl-12'}
                    required={!formData.city}
                  />
                </div>
                {showCityDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <div
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          {city}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-muted-foreground text-center">
                        No cities found
                      </div>
                    )}
                  </div>
                )}
                {formData.city && !showCityDropdown && (
                  <p className="mt-2 text-sm text-muted-foreground">Selected: {formData.city}</p>
                )}
              </div>
            )}

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
              disabled={isSubmitting || isLoadingEvents}
              className="w-full bg-accent hover:bg-accent/90 text-lg disabled:opacity-50 disabled:cursor-not-allowed py-4"
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </Button>

            {/* Footer Message */}
            <p className="text-center text-sm text-muted-foreground">
              You&apos;ll receive a confirmation email shortly after registration.
            </p>
          </form>
        </div>
      </div>
    </div>

      {/* Mobile Success/Error Popup */}
      {showMobilePopup && isMobile && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              {mobilePopupType === 'success' ? (
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${mobilePopupType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {mobilePopupType === 'success' ? 'Success!' : 'Error'}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {mobilePopupMessage}
              </p>
              
              <Button
                onClick={() => {
                  setShowMobilePopup(false)
                  if (mobilePopupType === 'success') {
                    // Close the registration modal on success
                    onClose()
                  }
                }}
                className={`w-full ${mobilePopupType === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
