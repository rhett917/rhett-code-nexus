# Owner Account Seeding Guide

## Quick Setup

This guide will help you create an admin owner account automatically.

### Step 1: Get Your Supabase Service Role Key

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **Service Role Key** (⚠️ Keep this secret!)

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   
   # Owner Account Credentials
   OWNER_EMAIL=owner@example.com
   OWNER_PASSWORD=secure-password-123
   OWNER_NAME=Site Owner
   ```

### Step 3: Run Database Migrations

Execute the SQL migrations in your Supabase dashboard:

1. Go to **SQL Editor** in Supabase
2. Copy and run `supabase/migrations/00001_create_profiles_table.sql`
3. Copy and run `supabase/migrations/00002_create_projects_table.sql`

### Step 4: Create Owner Account

Run the seed script:
```bash
npm run seed
```

You should see output like:
```
🌱 Creating owner account...
✅ Owner account created successfully!
📧 Email: owner@example.com
🔑 Password: secure-password-123
👤 Name: Site Owner
🔐 Role: admin
✅ Profile updated with admin role
🎉 Seeding completed!
```

### Step 5: Sign In and Change Password

1. Visit your application
2. Click "Sign in" 
3. Use the credentials from the seed output
4. Go to your **Profile** page
5. Click **Change Password** to set a new secure password
6. Update your profile information as needed

## Security Notes

- The service role key should **NEVER** be exposed in client-side code
- Only use the service role key for admin scripts like seeding
- Change the default password immediately after first login
- The `.env` file is in `.gitignore` to prevent accidental commits

## Troubleshooting

**"Missing environment variables" error:**
- Make sure you've added `SUPABASE_SERVICE_ROLE_KEY` to your `.env` file

**"User already exists" error:**
- The script will update the existing user's role to admin
- No action needed, you can proceed with sign in

**"Permission denied" errors:**
- Make sure you've run the database migrations first
- Verify your service role key is correct

**Can't sign in after seeding:**
- Check that you're using the exact email and password from the seed output
- Make sure the database migrations were executed properly

## Success! 🎉

You now have:
- ✅ A working admin account
- ✅ Full project management capabilities  
- ✅ Ability to change password securely
- ✅ Complete authentication system

Visit your application and start managing your portfolio!