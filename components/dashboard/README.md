# Dashboard Components

This folder contains all the modular components for the dashboard interface.

## Components

### LeftNavigation.tsx
Left sidebar navigation with role-based menu items.

**Features:**
- Dynamic menu based on user role
- Admin-only sections
- Active section highlighting
- User profile preview

**Props:**
- `activeSection` - Currently active section
- `onSectionChange` - Callback when section changes

### Profile.tsx
User profile management with image upload and editing.

**Features:**
- Profile picture upload (max 5MB)
- Edit profile information
- Account information display
- Toast notifications

**APIs Used:**
- `PUT /api/auth/profile/update/`
- `POST /api/auth/profile/upload-picture/`

### Applications.tsx
Application review system for administrators.

**Features:**
- Three tabs (Pending, Accepted, Rejected)
- Accept/Reject buttons
- Statistics dashboard
- Real-time filtering

**Admin Only:** Yes

**APIs Used:**
- `GET /api/applications/`
- `PUT /api/applications/{id}/review/`

### Overview.tsx
Dashboard home screen with quick stats and actions.

**Features:**
- Welcome message
- User statistics cards
- Quick action buttons
- Activity feed

### Settings.tsx
User preferences and account settings.

**Features:**
- Notification preferences
- Security settings
- Sign out
- Privacy links

## Usage

```tsx
import LeftNavigation from '@/components/dashboard/LeftNavigation'
import Profile from '@/components/dashboard/Profile'
import Applications from '@/components/dashboard/Applications'
import Overview from '@/components/dashboard/Overview'
import Settings from '@/components/dashboard/Settings'

// In your dashboard page
<div className="flex">
  <LeftNavigation 
    activeSection={activeSection} 
    onSectionChange={setActiveSection} 
  />
  <main>
    {activeSection === 'profile' && <Profile />}
    {activeSection === 'applications' && <Applications />}
    {activeSection === 'overview' && <Overview />}
    {activeSection === 'settings' && <Settings />}
  </main>
</div>
```

## Documentation

For complete documentation, see:
- **DASHBOARD_INDEX.md** - Documentation index
- **DASHBOARD_COMPONENTS.md** - Detailed component guide
- **DASHBOARD_API_DOCUMENTATION.md** - API reference

## Dependencies

- React (useState, useEffect, useCallback, useRef)
- Next.js (useRouter)
- AuthContext (useAuth hook)
- UI Components (Button from @/components/ui/button)
- Toast notifications (react-toastify)

## State Management

Components use local state for UI interactions and the AuthContext for global user state.

## Styling

All components use Tailwind CSS for styling with consistent design tokens.
