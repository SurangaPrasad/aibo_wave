'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

type ApplicationRecord = {
  id: string
  fullName?: string
  full_name?: string
  email?: string
  interest?: string
  country?: string
  created_at?: string
  [key: string]: unknown
}

const DashboardPage = () => {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, accessToken } = useAuth()
  const [applications, setApplications] = useState<ApplicationRecord[]>([])
  const [appLoading, setAppLoading] = useState(false)
  const [appError, setAppError] = useState<string | null>(null)

  const fetchApplications = useCallback(async () => {
    if (!accessToken || !user?.is_superuser) {
      return
    }

    setAppLoading(true)
    setAppError(null)

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
      const message = error instanceof Error ? error.message : 'Unable to load applications'
      setAppError(message)
    } finally {
      setAppLoading(false)
    }
  }, [accessToken, user?.is_superuser])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/')
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    if (user?.is_superuser) {
      fetchApplications()
    }
  }, [user?.is_superuser, fetchApplications])

  const welcomeMessage = useMemo(() => {
    if (!user) return 'Creating your personalized space...'
    return user.full_name || `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.user_name
  }, [user])

  if (isLoading || (!isAuthenticated && isLoading)) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <section className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Welcome</p>
        <h1 className="text-3xl font-bold mt-1">{welcomeMessage}</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Manage your Silent Echo journey, track application activity, and stay connected with the community.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
            <p className="text-xs uppercase text-muted-foreground">Status</p>
            <p className="text-lg font-semibold">{user.is_superuser ? 'Superuser' : 'Member'}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 border border-gray-200">
            <p className="text-xs uppercase text-muted-foreground">Email</p>
            <p className="text-lg font-semibold break-words">{user.email}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 border border-gray-200">
            <p className="text-xs uppercase text-muted-foreground">Mobile</p>
            <p className="text-lg font-semibold">{user.mobile_number || 'Not provided'}</p>
          </div>
        </div>
      </section>

      {user.is_superuser && (
        <section className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recent Applications</h2>
              <p className="text-muted-foreground text-sm">
                Review the latest community applications submitted through the platform.
              </p>
            </div>
            <Button variant="outline" onClick={fetchApplications} disabled={appLoading}>
              {appLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>

          {appError && (
            <div className="mb-4 p-4 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm">
              {appError}
            </div>
          )}

          {!appLoading && applications.length === 0 && !appError && (
            <p className="text-muted-foreground text-sm">No applications have been submitted yet.</p>
          )}

          {applications.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border rounded-xl overflow-hidden">
                <thead className="bg-gray-50 text-left text-sm text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Applicant</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Interest</th>
                    <th className="px-4 py-3 font-semibold">Country</th>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {applications.map((app) => (
                    <tr key={app.id} className="border-t border-border hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{app.fullName || app.full_name || '—'}</td>
                      <td className="px-4 py-3">{app.email || '—'}</td>
                      <td className="px-4 py-3 capitalize">{app.interest?.replace('-', ' ') || '—'}</td>
                      <td className="px-4 py-3 capitalize">{app.country || '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {app.created_at ? new Date(app.created_at).toLocaleString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default DashboardPage
