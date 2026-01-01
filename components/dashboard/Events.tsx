'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { Calendar, MapPin, Users, Mail, Phone, Globe, Building } from 'lucide-react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

type Event = {
  id: string
  title: string
  description: string
  date: string
  location: string
  organizer: string
}

type Registration = {
  id: string
  event_id: string
  name: string
  email: string
  phone?: string
  country: string
  city?: string
  culturalCommunity: string
  registration_date: string
}

const Events = () => {
  const { accessToken } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    setIsLoadingEvents(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/events/`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch events')
      }

      setEvents(data.events || [])
      
      // Auto-select first event if available
      if (data.events && data.events.length > 0 && !selectedEventId) {
        setSelectedEventId(data.events[0].id)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load events'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoadingEvents(false)
    }
  }, [selectedEventId])

  const fetchRegistrations = useCallback(async () => {
    if (!accessToken) {
      return
    }

    setIsLoadingRegistrations(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/registrations/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch registrations')
      }

      setRegistrations(data.registrations || [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load registrations'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoadingRegistrations(false)
    }
  }, [accessToken])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useEffect(() => {
    if (accessToken) {
      fetchRegistrations()
    }
  }, [accessToken, fetchRegistrations])

  const selectedEvent = events.find((e) => e.id === selectedEventId)
  const eventRegistrations = registrations.filter((r) => r.event_id === selectedEventId)

  const handleRefresh = () => {
    fetchEvents()
    fetchRegistrations()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Events & Registrations</h2>
            <p className="text-muted-foreground text-sm mt-1">
              View events and manage registered users
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            disabled={isLoadingEvents || isLoadingRegistrations}
            className="w-full sm:w-auto"
          >
            {isLoadingEvents || isLoadingRegistrations ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Events Selection */}
        <div className="mb-6">
          <label className="block font-semibold mb-3 text-sm">Select Event</label>
          {isLoadingEvents ? (
            <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
              <p className="text-muted-foreground">No events available</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedEventId === event.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-accent">
                        {registrations.filter((r) => r.event_id === event.id).length}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Event Details & Registrations */}
        {selectedEvent && (
          <div className="space-y-6">
            {/* Event Info */}
            <div className="bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedEvent.description}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="font-medium">Date:</span>
                  <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="font-medium">Location:</span>
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="font-medium">Organizer:</span>
                  <span>{selectedEvent.organizer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="font-medium">Registrations:</span>
                  <span className="font-semibold">{eventRegistrations.length}</span>
                </div>
              </div>
            </div>

            {/* Registrations List */}
            <div>
              <h4 className="font-semibold text-lg mb-4">
                Registered Participants ({eventRegistrations.length})
              </h4>
              
              {isLoadingRegistrations ? (
                <div className="p-8 bg-gray-50 border border-border rounded-lg text-center">
                  <p className="text-muted-foreground">Loading registrations...</p>
                </div>
              ) : eventRegistrations.length === 0 ? (
                <div className="p-8 bg-gray-50 border border-border rounded-lg text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">No registrations yet for this event</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {eventRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="bg-white border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h5 className="font-semibold text-lg">{registration.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            Registered on {new Date(registration.registration_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Registered
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="break-all">{registration.email}</span>
                        </div>
                        
                        {registration.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span>{registration.phone}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span>{registration.country}{registration.city ? `, ${registration.city}` : ''}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span>{registration.culturalCommunity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
