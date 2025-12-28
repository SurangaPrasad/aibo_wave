'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

type ApplicationRecord = {
  id: string
  fullName?: string
  full_name?: string
  email?: string
  interest?: string
  country?: string
  created_at?: string
  accepted?: boolean | null
  [key: string]: unknown
}

type TabType = 'pending' | 'accepted' | 'rejected'

const Applications = () => {
  const { accessToken } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('pending')
  const [applications, setApplications] = useState<ApplicationRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const fetchApplications = useCallback(async () => {
    if (!accessToken) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data) {
        throw new Error(data?.error || 'Failed to fetch applications')
      }

      setApplications(data.applications || [])
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to load applications'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  const handleApplicationAction = async (
    applicationId: string,
    accept: boolean
  ) => {
    if (!accessToken) {
      toast.error('Authentication required')
      return
    }

    setProcessingId(applicationId)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/applications/${applicationId}/review/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ accepted: accept }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update application')
      }

      toast.success(
        `Application ${accept ? 'accepted' : 'rejected'} successfully!`
      )
      await fetchApplications()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update application'
      toast.error(message)
    } finally {
      setProcessingId(null)
    }
  }

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'pending') {
      return app.accepted === null || app.accepted === undefined
    } else if (activeTab === 'accepted') {
      return app.accepted === true
    } else {
      return app.accepted === false
    }
  })

  const tabs = [
    { id: 'pending' as TabType, label: 'Pending', count: applications.filter(a => a.accepted === null || a.accepted === undefined).length },
    { id: 'accepted' as TabType, label: 'Accepted', count: applications.filter(a => a.accepted === true).length },
    { id: 'rejected' as TabType, label: 'Rejected', count: applications.filter(a => a.accepted === false).length },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Applications Management</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Review and manage community applications
            </p>
          </div>
          <Button variant="outline" onClick={fetchApplications} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-gray-900'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-4 p-4 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <p className="text-muted-foreground mt-4">Loading applications...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredApplications.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-muted-foreground">
              No {activeTab} applications at the moment
            </p>
          </div>
        )}

        {/* Applications Table */}
        {!isLoading && filteredApplications.length > 0 && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-border rounded-xl overflow-hidden">
                <thead className="bg-gray-50 text-left text-sm text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Applicant</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Interest</th>
                    <th className="px-4 py-3 font-semibold">Country</th>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                    {activeTab === 'pending' && (
                      <th className="px-4 py-3 font-semibold text-center">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-t border-border hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">
                        {app.fullName || app.full_name || '—'}
                      </td>
                      <td className="px-4 py-3">{app.email || '—'}</td>
                      <td className="px-4 py-3 capitalize">
                        {app.interest?.replace('-', ' ') || '—'}
                      </td>
                      <td className="px-4 py-3 capitalize">{app.country || '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {app.created_at
                          ? new Date(app.created_at).toLocaleString()
                          : '—'}
                      </td>
                      {activeTab === 'pending' && (
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              onClick={() => handleApplicationAction(app.id, true)}
                              disabled={processingId === app.id}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {processingId === app.id ? '...' : 'Accept'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleApplicationAction(app.id, false)}
                              disabled={processingId === app.id}
                            >
                              {processingId === app.id ? '...' : 'Reject'}
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-50 border border-border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {app.fullName || app.full_name || '—'}
                      </h3>
                      <p className="text-sm text-muted-foreground">{app.email || '—'}</p>
                    </div>
                    {activeTab === 'pending' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleApplicationAction(app.id, true)}
                          disabled={processingId === app.id}
                          className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1"
                        >
                          {processingId === app.id ? '...' : 'Accept'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleApplicationAction(app.id, false)}
                          disabled={processingId === app.id}
                          className="text-xs px-3 py-1"
                        >
                          {processingId === app.id ? '...' : 'Reject'}
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Interest:</span>
                      <p className="capitalize font-medium">
                        {app.interest?.replace('-', ' ') || '—'}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Country:</span>
                      <p className="capitalize font-medium">{app.country || '—'}</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                    Submitted: {app.created_at
                      ? new Date(app.created_at).toLocaleString()
                      : '—'}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Statistics */}
        {!isLoading && applications.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-2xl font-bold text-yellow-700">
                  {applications.filter(a => a.accepted === null || a.accepted === undefined).length}
                </p>
                <p className="text-sm text-yellow-600 mt-1">Pending Review</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-2xl font-bold text-green-700">
                  {applications.filter(a => a.accepted === true).length}
                </p>
                <p className="text-sm text-green-600 mt-1">Accepted</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-2xl font-bold text-red-700">
                  {applications.filter(a => a.accepted === false).length}
                </p>
                <p className="text-sm text-red-600 mt-1">Rejected</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Applications
