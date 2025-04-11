
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Car,
  Smartphone, 
  Building2,
  ShoppingBag, 
  Briefcase, 
  Home
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-brand-green/90 to-brand-green py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Buy & Sell Everything in Ethiopia
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Ethiopia's largest marketplace - Join millions of buyers and sellers!
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full pr-10 pl-10 h-12"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select>
                <SelectTrigger className="h-12">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="All Ethiopia" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ethiopia</SelectItem>
                  <SelectItem value="addis">Addis Ababa</SelectItem>
                  <SelectItem value="adama">Adama</SelectItem>
                  <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                  <SelectItem value="hawassa">Hawassa</SelectItem>
                  <SelectItem value="mekelle">Mekelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="jobs">Jobs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="h-12 bg-brand-orange hover:bg-orange-600 gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
          
          {/* Popular Categories */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-gray-500">Popular:</span>
            <Button variant="link" size="sm" className="text-brand-green p-0 h-auto">
              <Car className="h-3 w-3 mr-1" />
              Cars
            </Button>
            <Button variant="link" size="sm" className="text-brand-green p-0 h-auto">
              <Smartphone className="h-3 w-3 mr-1" />
              Phones
            </Button>
            <Button variant="link" size="sm" className="text-brand-green p-0 h-auto">
              <Building2 className="h-3 w-3 mr-1" />
              Apartments
            </Button>
            <Button variant="link" size="sm" className="text-brand-green p-0 h-auto">
              <ShoppingBag className="h-3 w-3 mr-1" />
              Fashion
            </Button>
            <Button variant="link" size="sm" className="text-brand-green p-0 h-auto">
              <Briefcase className="h-3 w-3 mr-1" />
              Jobs
            </Button>
            <Button variant="link" size="sm" className="text-brand-green p-0 h-auto">
              <Home className="h-3 w-3 mr-1" />
              Furniture
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
