import { supabase } from '@/lib/supabase';

async function createTestUser() {
  const email = 'test@yetumarket.com';
  const password = 'Test123!';

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: 'Test User',
          phone_number: '+251911234567',
          location: 'Addis Ababa'
        }
      }
    });

    if (error) {
      console.error('Error creating user:', error.message);
      return;
    }

    console.log('User created successfully:', data);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestUser(); 