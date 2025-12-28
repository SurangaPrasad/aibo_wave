'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

type ProfileFormData = {
  first_name: string
  last_name: string
  mobile_number: string
  city: string
  country: string
  bio: string
}

const Profile = () => {
  const { user, accessToken, refreshProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    mobile_number: user?.mobile_number || '',
    city: user?.city || '',
    country: user?.country || '',
    bio: user?.bio || '',
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileUpdate = async () => {
    if (!accessToken) {
      toast.error('Authentication required')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      await refreshProfile()
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !accessToken) {
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setImageLoading(true)
    const formData = new FormData()
    formData.append('profile_picture', file)

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/profile/upload-picture/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      await refreshProfile()
      toast.success('Profile picture updated successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upload image'
      toast.error(message)
    } finally {
      setImageLoading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      mobile_number: user?.mobile_number || '',
      city: user?.city || '',
      country: user?.country || '',
      bio: user?.bio || '',
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>

        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 pb-8 border-b border-border">
          <div className="relative mx-auto sm:mx-0">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-accent"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-4xl border-4 border-accent">
                👤
              </div>
            )}
            {imageLoading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2">Profile Picture</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a profile picture (max 5MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={triggerFileInput}
              disabled={imageLoading}
            >
              {imageLoading ? 'Uploading...' : 'Change Picture'}
            </Button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <p className="text-gray-900">{user?.first_name || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <p className="text-gray-900">{user?.last_name || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <p className="text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mobile Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <p className="text-gray-900">{user?.mobile_number || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <p className="text-gray-900">{user?.city || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <p className="text-gray-900">{user?.country || 'Not provided'}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-900">{user?.bio || 'Not provided'}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          {isEditing ? (
            <>
              <Button onClick={handleProfileUpdate} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="text-gray-900 font-medium">{user?.user_name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Account Type</p>
            <p className="text-gray-900 font-medium">
              {user?.is_superuser ? 'Administrator' : 'Member'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="text-gray-900 font-medium">
              {user?.date_joined
                ? new Date(user.date_joined).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Login</p>
            <p className="text-gray-900 font-medium">
              {user?.last_login
                ? new Date(user.last_login).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
