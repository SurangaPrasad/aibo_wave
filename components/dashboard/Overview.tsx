'use client'

import { useAuth } from '@/contexts/AuthContext'

const Overview = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Welcome back</p>
          <h1 className="text-3xl font-bold mt-1">
            {user?.full_name || user?.user_name || 'Member'}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Manage your Silent Echo journey, track application activity, and stay connected with the community.
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
            <p className="text-xs uppercase text-muted-foreground">Status</p>
            <p className="text-lg font-semibold">{user?.is_superuser ? 'Administrator' : 'Member'}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 border border-gray-200">
            <p className="text-xs uppercase text-muted-foreground">Email</p>
            <p className="text-lg font-semibold break-words">{user?.email}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 border border-gray-200">
            <p className="text-xs uppercase text-muted-foreground">Mobile</p>
            <p className="text-lg font-semibold">{user?.mobile_number || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 text-left rounded-lg border border-border hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-semibold mb-1">Update Profile</h4>
            <p className="text-sm text-muted-foreground">
              Keep your information up to date
            </p>
          </button>
          <button className="p-4 text-left rounded-lg border border-border hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">📧</div>
            <h4 className="font-semibold mb-1">Contact Support</h4>
            <p className="text-sm text-muted-foreground">
              Get help from our team
            </p>
          </button>
          <button className="p-4 text-left rounded-lg border border-border hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-semibold mb-1">Resources</h4>
            <p className="text-sm text-muted-foreground">
              Access guides and documentation
            </p>
          </button>
          <button className="p-4 text-left rounded-lg border border-border hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold mb-1">Events</h4>
            <p className="text-sm text-muted-foreground">
              View upcoming community events
            </p>
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-lg bg-gray-50">
            <div className="text-2xl">🎉</div>
            <div>
              <p className="font-semibold">Welcome to Silent Echo!</p>
              <p className="text-sm text-muted-foreground">
                Your account was created successfully
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {user?.date_joined
                  ? new Date(user.date_joined).toLocaleDateString()
                  : 'Recently'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
