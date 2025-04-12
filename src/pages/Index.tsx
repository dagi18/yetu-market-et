import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import RecentProducts from "@/components/RecentProducts";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageCircle, ThumbsUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const Index = () => {
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
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-8">
          <CategorySection />
          
          <FeaturedProducts />
          
          {/* Why YetuMarket Section */}
          <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose YetuMarket?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Trading</h3>
                <p className="text-gray-600">Your transactions are protected with our secure payment system.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
                <p className="text-gray-600">Connect directly with sellers for better deals and information.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600">All listings are verified to ensure quality and authenticity.</p>
              </div>
            </div>
          </section>
          
          <RecentProducts />
          
          {/* Sell Your Items Section */}
          <section className="py-12 my-8 bg-gradient-to-r from-brand-orange/90 to-brand-orange text-white rounded-lg text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-4">Ready to sell your items?</h2>
              <p className="mb-8 max-w-xl mx-auto">
                Join thousands of Ethiopians who are selling their items daily on YetuMarket. It's free, quick and easy!
              </p>
              <Button className="bg-white text-brand-orange hover:bg-gray-100">
                Start Selling Now
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
