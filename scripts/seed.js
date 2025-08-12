import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables:');
  console.error('   VITE_SUPABASE_URL:', SUPABASE_URL ? '✅' : '❌');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? '✅' : '❌');
  console.error('\nPlease add your Supabase service role key to .env:');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here');
  process.exit(1);
}

// Create Supabase client with service role (admin) key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seedOwner() {
  console.log('🌱 Creating owner account...');

  const ownerEmail = process.env.OWNER_EMAIL || 'brownrhett22@gmail.com';
  const ownerPassword = process.env.OWNER_PASSWORD || '1';
  const ownerName = process.env.OWNER_NAME || 'Rhett Brown';

  try {
    // Create the user with admin auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: ownerEmail,
      password: ownerPassword,
      email_confirm: true,
      user_metadata: {
        full_name: ownerName
      }
    });

    if (authError) {
      if (authError.message.includes('already been registered')) {
        console.log('📧 User already exists, updating role...');
        
        // Get existing user
        const { data: users, error: getUserError } = await supabase.auth.admin.listUsers();
        if (getUserError) throw getUserError;
        
        const existingUser = users.users.find(u => u.email === ownerEmail);
        if (!existingUser) throw new Error('Could not find existing user');

        // Update profile to admin
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            role: 'admin',
            full_name: ownerName 
          })
          .eq('id', existingUser.id);

        if (updateError) throw updateError;
        
        console.log('✅ Updated existing user to admin role');
        console.log(`📧 Email: ${ownerEmail}`);
        console.log(`🔑 Password: ${ownerPassword}`);
        return;
      }
      throw authError;
    }

    console.log('✅ Owner account created successfully!');
    console.log(`📧 Email: ${ownerEmail}`);
    console.log(`🔑 Password: ${ownerPassword}`);
    console.log(`👤 Name: ${ownerName}`);
    console.log(`🔐 Role: admin`);

    // The profile should be automatically created by the trigger
    // But let's verify and update the role to admin
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', authData.user.id);

      if (profileError) {
        console.warn('⚠️  Warning: Could not update role to admin:', profileError.message);
      } else {
        console.log('✅ Profile updated with admin role');
      }
    }

  } catch (error) {
    console.error('❌ Error creating owner account:', error.message);
    process.exit(1);
  }
}

// Run the seed
seedOwner().then(() => {
  console.log('\n🎉 Seeding completed!');
  console.log('\n💡 You can now sign in as the owner and change the password through the profile page.');
  process.exit(0);
});