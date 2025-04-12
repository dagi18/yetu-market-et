
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import RecentProducts from "@/components/RecentProducts";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageCircle, ThumbsUp, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
    <Layout>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
        <CategorySection />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="my-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-4"
          >
            Featured Products
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-1 bg-brand-green mx-auto mb-12"
          />
          <FeaturedProducts />
        </motion.div>
        
        {/* Why YetuMarket Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="py-16 my-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-4"
          >
            Why Choose YetuMarket?
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-1 bg-brand-orange mx-auto mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Secure Trading</h3>
              <p className="text-gray-600 text-center">Your transactions are protected with our secure payment system and buyer protection policy.</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Direct Communication</h3>
              <p className="text-gray-600 text-center">Connect directly with sellers for better deals and detailed information about products.</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Quality Products</h3>
              <p className="text-gray-600 text-center">All listings are verified to ensure quality and authenticity before they appear on our platform.</p>
            </motion.div>
          </div>
        </motion.section>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="my-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-4"
          >
            Recently Added
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-1 bg-brand-green mx-auto mb-12"
          />
          <RecentProducts />
        </motion.div>
        
        {/* Sell Your Items Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-16 my-12 bg-gradient-to-r from-brand-orange/90 to-brand-orange text-white rounded-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFya2V0cGxhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')] opacity-10 bg-cover bg-center" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to sell your items?</h2>
              <p className="mb-8 text-lg">
                Join thousands of Ethiopians who are selling their items daily on YetuMarket. It's free, quick and easy!
              </p>
              <Button size="lg" className="bg-white text-brand-orange hover:bg-gray-100 gap-2">
                Start Selling Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Index;
