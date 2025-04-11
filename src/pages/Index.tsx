
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import RecentProducts from "@/components/RecentProducts";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageCircle, ThumbsUp } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-8">
          <CategorySection />
          
          <FeaturedProducts />
          
          {/* Why YetuMarket Section */}
          <section className="py-12 bg-gray-50 my-8 rounded-lg">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-10">Why Choose YetuMarket?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 mb-4 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Secure Trading</h3>
                  <p className="text-gray-600">
                    Buy and sell with confidence with our secure trading platform designed for Ethiopian market.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 mb-4 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <MessageCircle className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Direct Communication</h3>
                  <p className="text-gray-600">
                    Chat directly with sellers and buyers to negotiate and arrange meetings with ease.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 mb-4 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <ThumbsUp className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Verified Users</h3>
                  <p className="text-gray-600">
                    User verification and ratings system to ensure trust between parties for safer transactions.
                  </p>
                </div>
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
