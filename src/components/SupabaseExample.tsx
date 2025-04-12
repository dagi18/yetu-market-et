import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function SupabaseExample() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Example: Sign in with email and password
  const handleSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Example: Fetch data from a table
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('your_table_name')
        .select('*');
      
      if (error) throw error;
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Example: Subscribe to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Example</h1>
      
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button 
            onClick={() => handleSignIn('user@example.com', 'password')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sign In
          </button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Data from Supabase</h2>
        <button 
          onClick={fetchData}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Fetch Data
        </button>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
} 