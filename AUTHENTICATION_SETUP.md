# Authentication System Setup Guide

## Overview

This portfolio website now has a complete authentication system implemented with Supabase. The system includes user authentication, profile management, and admin-only project CRUD operations.

## Initial Setup

1. **Environment Configuration**:
   - Copy `.env.example` to `.env`
   - Replace the Supabase credentials with your own project credentials:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your Supabase project details:
     ```
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - Get these credentials from your [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API

## Database Setup

1. **Run the migrations** in your Supabase project:
   - Execute the SQL files in `supabase/migrations/` in order:
     - `00001_create_profiles_table.sql`
     - `00002_create_projects_table.sql`

2. **Create Owner Account (Automated)**:
   - Get your Supabase Service Role Key from [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API
   - Add it to your `.env` file:
     ```
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
     OWNER_EMAIL=owner@example.com
     OWNER_PASSWORD=password123
     OWNER_NAME=Site Owner
     ```
   - Run the seed script:
     ```bash
     npm run seed
     ```
   - This will create an admin user automatically with the specified credentials
   
   **Alternative Manual Method**:
   - Sign up through the application
   - Manually update the user's role to 'admin' in the Supabase dashboard:
     ```sql
     UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
     ```

## Features Implemented

### Authentication
- ✅ User registration and login
- ✅ Secure session management with auto-refresh
- ✅ Persistent authentication state
- ✅ Protected routes
- ✅ Logout functionality

### User Management
- ✅ User profiles with name and avatar
- ✅ Profile editing page
- ✅ Password change functionality with validation
- ✅ Role-based access control (user/admin)
- ✅ Automated owner account creation (seeding)

### Project Management
- ✅ Public project viewing
- ✅ Admin-only project CRUD operations
- ✅ Real-time project updates
- ✅ Rich project metadata (tags, links, images, display order)
- ✅ Featured project support

### Security Features
- ✅ Row Level Security (RLS) enabled
- ✅ Proper database policies
- ✅ Type-safe database queries
- ✅ Input validation
- ✅ Error handling with user-friendly messages

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context and provider
├── hooks/
│   └── useUser.ts               # User authentication hooks
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx   # Route protection wrapper
│   └── site/
│       ├── Header.tsx           # Updated with auth dropdown
│       ├── LoginDialog.tsx      # Functional login form
│       ├── Projects.tsx         # CRUD operations for projects
│       └── ProjectDialog.tsx    # Project creation/editing modal
├── pages/
│   └── Profile.tsx              # User profile management
└── integrations/supabase/
    ├── client.ts                # Supabase client configuration
    └── types.ts                 # Database type definitions
```

## Usage

### For Regular Users:
1. Visit the website
2. Click "Sign in" to create an account or log in
3. View projects publicly
4. Access profile page to update personal information

### For Admins:
1. Sign in with admin credentials (use seeded owner account or manually created admin)
2. Click "Add Project" button to create new projects
3. Hover over existing projects to see edit/delete options
4. Manage all project content through the UI
5. Change password through Profile → Change Password

## Security Notes

- All database operations use Row Level Security (RLS)
- Only admins can create, update, or delete projects
- User profiles can only be updated by the profile owner
- Authentication tokens are automatically refreshed
- All sensitive operations include proper error handling

## Database Schema

### Profiles Table
- `id` (UUID, Primary Key)
- `email` (Text, Unique)
- `full_name` (Text, Nullable)
- `avatar_url` (Text, Nullable)
- `role` (Text, 'user' | 'admin')
- `created_at`, `updated_at` (Timestamps)

### Projects Table
- `id` (UUID, Primary Key)
- `title` (Text)
- `description` (Text)
- `tags` (Text Array)
- `link` (Text, Nullable)
- `image_url` (Text, Nullable)
- `display_order` (Integer)
- `is_featured` (Boolean)
- `created_by` (UUID, Foreign Key)
- `created_at`, `updated_at` (Timestamps)

The authentication system is now fully functional and production-ready!