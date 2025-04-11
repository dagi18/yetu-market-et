
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter, Star, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Services data
const SERVICES = [
  {
    id: "s1",
    title: "Professional Plumbing Services",
    provider: "Addis Plumbing Solutions",
    rating: 4.8,
    reviews: 124,
    location: "Bole, Addis Ababa",
    price: "Starting from 500 ETB",
    imageUrl: "https://images.unsplash.com/photo-1574897577432-ba73d011df3d?q=80&w=1000",
    description: "Available for all plumbing needs: installations, repairs, and emergency services. 10+ years of experience."
  },
  {
    id: "s2",
    title: "Expert Electrical Installations",
    provider: "PowerFix Ethiopia",
    rating: 4.7,
    reviews: 98,
    location: "Mexico, Addis Ababa",
    price: "Starting from 700 ETB",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45249ff78?q=80&w=1000",
    description: "Licensed electrician offering wiring, installations, and safety inspections for homes and businesses."
  },
  {
    id: "s3",
    title: "Professional Photography Services",
    provider: "Abebe's Photography",
    rating: 4.9,
    reviews: 215,
    location: "Kazanchis, Addis Ababa",
    price: "Starting from 3,500 ETB",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
    description: "Event photography, portraits, and commercial photography with professional equipment and editing."
  },
  {
    id: "s4",
    title: "Home Cleaning Services",
    provider: "Clean House Ethiopia",
    rating: 4.5,
    reviews: 87,
    location: "CMC, Addis Ababa",
    price: "Starting from 800 ETB",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000",
    description: "Regular and deep cleaning services for homes and apartments. Eco-friendly products available."
  },
  {
    id: "s5",
    title: "Vehicle Repair and Maintenance",
    provider: "Tekle Auto Workshop",
    rating: 4.6,
    reviews: 156,
    location: "Piassa, Addis Ababa",
    price: "Inspection from 300 ETB",
    imageUrl: "https://images.unsplash.com/photo-1560253414-f65d1f5a1a37?q=80&w=1000",
    description: "Experienced mechanics providing maintenance, repairs, and diagnostics for all vehicle types."
  },
  {
    id: "s6",
    title: "Web Development Services",
    provider: "Digital Ethiopia Solutions",
    rating: 4.8,
    reviews: 64,
    location: "Bole, Addis Ababa",
    price: "Starting from 8,000 ETB",
    imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1000",
    description: "Custom websites, e-commerce solutions, and web applications for businesses and organizations."
  },
];

// Service categories
const SERVICE_CATEGORIES = [
  { name: "Home Services", count: 246 },
  { name: "Health & Beauty", count: 187 },
  { name: "Events & Entertainment", count: 129 },
  { name: "IT & Tech", count: 98 },
  { name: "Education & Tutoring", count: 76 },
  { name: "Automotive", count: 112 },
  { name: "Business Services", count: 84 },
  { name: "Travel & Transport", count: 65 },
];

const ServiceCard = ({ service }: { service: any }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{service.title}</h3>
        <div className="text-gray-600">{service.provider}</div>
        
        <div className="flex items-center mt-2 text-sm">
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1">{service.rating}</span>
          </div>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-gray-500">{service.reviews} reviews</span>
        </div>
        
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{service.location}</span>
        </div>
        
        <p className="mt-3 text-sm text-gray-700 line-clamp-2">{service.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="font-medium text-brand-green">{service.price}</div>
          <Button size="sm">Contact</Button>
        </div>
      </div>
    </Card>
  );
};

const Services = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [location, setLocation] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white py-2 shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-500">
              <ol className="flex items-center space-x-1">
                <li><Link to="/" className="hover:text-brand-green">Home</Link></li>
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <span className="text-gray-900">Services</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          {/* Category Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Services</h1>
            <p className="text-gray-600 mb-0">
              Find reliable service providers for home repairs, professional work, events, and more across Ethiopia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg mb-4">Categories</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {showFilters ? 'Hide' : 'Show'}
                  </Button>
                </div>
                
                <div className={`space-y-2 ${showFilters || 'hidden lg:block'}`}>
                  <Link
                    to="/category/services"
                    className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-50 ${activeTab === 'all' ? 'bg-gray-50 text-brand-green font-medium' : 'text-gray-700'}`}
                  >
                    <span>All Services</span>
                  </Link>
                  {SERVICE_CATEGORIES.map((category, index) => (
                    <Link
                      key={index}
                      to={`/category/services/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-50 ${
                        activeTab === category.name.toLowerCase().replace(/ /g, '-') 
                          ? 'bg-gray-50 text-brand-green font-medium' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </Link>
                  ))}
                </div>
                
                <div className={`mt-6 ${showFilters || 'hidden lg:block'}`}>
                  <h4 className="font-medium text-sm mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="price" className="text-brand-green mr-2" defaultChecked />
                      <span>All Prices</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="text-brand-green mr-2" />
                      <span>Budget (Under 1,000 ETB)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="text-brand-green mr-2" />
                      <span>Mid-range (1,000-5,000 ETB)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="text-brand-green mr-2" />
                      <span>Premium (Above 5,000 ETB)</span>
                    </label>
                  </div>
                </div>
                
                <div className={`mt-6 ${showFilters || 'hidden lg:block'}`}>
                  <h4 className="font-medium text-sm mb-3">Rating</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-brand-green mr-2" />
                      <div className="flex text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-gray-700">& up</span>
                      </div>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-brand-green mr-2" />
                      <div className="flex text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-gray-700">& up</span>
                      </div>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-brand-green mr-2" />
                      <div className="flex text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-gray-700">& up</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services Area */}
            <div className="lg:col-span-3">
              {/* Sort Controls */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="reviews">Most Reviews</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Location:</span>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="bole">Bole</SelectItem>
                        <SelectItem value="mexico">Mexico</SelectItem>
                        <SelectItem value="piassa">Piassa</SelectItem>
                        <SelectItem value="kazanchis">Kazanchis</SelectItem>
                        <SelectItem value="cmc">CMC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Featured Categories Tabs (Mobile) */}
              <div className="lg:hidden mb-4">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="home-services">Home</TabsTrigger>
                    <TabsTrigger value="automotive">Auto</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  Showing <span className="font-medium">{SERVICES.length}</span> results in 
                  <span className="font-medium"> Services</span>
                </p>
              </div>
              
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
