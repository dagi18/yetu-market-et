import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

export default function CreateTestUser() {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const createTestUser = async () => {
    setStatus('Creating user...');
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@yetumarket.com',
        password: 'Test123!',
        options: {
          data: {
            full_name: 'Test User',
            phone_number: '+251911234567',
            location: 'Addis Ababa'
          }
        }
      });

      if (error) {
        setError(error.message);
        setStatus('Failed to create user');
        return;
      }

      setStatus('User created successfully!');
      console.log('User data:', data);
    } catch (error) {
      setError('An unexpected error occurred');
      setStatus('Failed to create user');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Test User</CardTitle>
          <CardDescription>
            This will create a test user with the following credentials:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Email:</span> test@yetumarket.com
            </p>
            <p className="text-sm">
              <span className="font-medium">Password:</span> Test123!
            </p>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {status && (
            <div className="text-sm">
              {status}
            </div>
          )}
          
          <Button 
            onClick={createTestUser}
            className="w-full"
          >
            Create Test User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 