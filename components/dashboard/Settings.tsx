'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

const Settings = () => {
  const { user, logout } = useAuth()
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        {/* Account Settings */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with community news
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly for security
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                  >
                    Change
                  </Button>
                </div>

                {isChangingPassword && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-border">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <div className="flex gap-2">
                      <Button size="sm">Update Password</Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsChangingPassword(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" size="sm">
                  Enable 2FA
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                <p className="font-medium text-red-900">Sign Out</p>
                <p className="text-sm text-red-700 mb-3">
                  Sign out from your current session
                </p>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>

              <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                <p className="font-medium text-red-900">Delete Account</p>
                <p className="text-sm text-red-700 mb-3">
                  Permanently delete your account and all associated data
                </p>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Information */}
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4">Privacy & Data</h3>
        <p className="text-muted-foreground mb-4">
          We take your privacy seriously. Your data is encrypted and stored securely.
        </p>
        <div className="space-y-2 text-sm">
          <a href="#" className="block text-accent hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="block text-accent hover:underline">
            Terms of Service
          </a>
          <a href="#" className="block text-accent hover:underline">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  )
}

export default Settings
