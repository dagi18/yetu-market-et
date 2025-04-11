
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Grid3X3, List, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Home & Garden products data
const HOME_PRODUCTS = [
  {
    id: "h1",
    title: "Modern 3-Seater Sofa",
    price: 24500,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000",
    date: "Today"
  },
  {
    id: "h2",
    title: "Queen Size Bed Frame with Storage",
    price: 18500,
    location: "CMC, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "h3",
    title: "Dining Table Set - 6 Chairs",
    price: 32000,
    location: "Sarbet, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=1000",
    date: "2 days ago"
  },
  {
    id: "h4",
    title: "Ethiopian Coffee Table - Handcrafted",
    price: 8500,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1000",
    date: "3 days ago"
  },
  {
    id: "h5",
    title: "Kitchen Cabinet Set",
    price: 42000,
    location: "Mexico, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1000",
    date: "Today"
  },
  {
    id: "h6",
    title: "Ethiopian Traditional Mesob",
    price: 3800,
    location: "Merkato, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1000",
    date: "4 days ago"
  },
];

const Home = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState("12");
  const [priceRange, setPriceRange] = useState([0, 50000]);
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
                  <span className="text-gray-900">Home & Garden</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          {/* Category Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Home & Garden</h1>
            <p className="text-gray-600 mb-0">
              Find furniture, home décor, kitchen appliances, and garden supplies for your home at affordable prices across Ethiopia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg mb-4">Filters</h3>
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
                
                <div className={`space-y-6 ${showFilters || 'hidden lg:block'}`}>
                  <div>
                    <h4 className="font-medium text-sm mb-3">Categories</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Furniture</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Kitchen & Dining</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Bedroom</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Home Decor</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Garden & Outdoor</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-3">Price Range (ETB)</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 50000]}
                        max={50000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{priceRange[0]} ETB</span>
                        <span>{priceRange[1]} ETB</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-3">Condition</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>New</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Used - Like New</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Used - Good</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-3">Material</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Wood</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Metal</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Glass</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-green mr-2" />
                        <span>Fabric</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Products Area */}
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
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Show:</span>
                      <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                        <SelectTrigger className="w-[70px]">
                          <SelectValue placeholder="12" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                          <SelectItem value="48">48</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex border rounded overflow-hidden">
                      <button 
                        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`} 
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="h-5 w-5" />
                      </button>
                      <button 
                        className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`} 
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  Showing <span className="font-medium">{HOME_PRODUCTS.length}</span> results in 
                  <span className="font-medium"> Home & Garden</span>
                </p>
              </div>
              
              {/* Products Grid */}
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {HOME_PRODUCTS.map(product => (
                  <ProductCard key={product.id} {...product} />
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

export default Home;
