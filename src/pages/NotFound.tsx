import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const NotFound = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; email: string; is_admin: boolean } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('full_name, email, is_admin')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        user={profile ? {
          id: user?.id || '',
          email: profile.email,
          full_name: profile.full_name,
          is_admin: profile.is_admin
        } : null} 
        onSignOut={signOut}
      />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-8">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="inline-block bg-brand-green text-white px-6 py-3 rounded-md hover:bg-brand-green/90 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
