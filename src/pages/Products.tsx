
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Filter, Grid3X3, List } from "lucide-react";

// Sample product data
const PRODUCTS = [
  {
    id: "1",
    title: "iPhone 13 Pro Max - 256GB",
    price: 120000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000",
    date: "Today",
  },
  {
    id: "2",
    title: "Toyota Corolla 2018 Silver",
    price: 2500000,
    location: "Megenagna, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday",
  },
  // More products added for demonstration
  {
    id: "3",
    title: "3 Bedroom Apartment for Rent",
    price: 35000,
    location: "CMC, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
    date: "2 days ago",
  },
  {
    id: "4",
    title: "Samsung 55\" 4K Smart TV",
    price: 85000,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000",
    date: "3 days ago",
  },
  {
    id: "5",
    title: "MacBook Pro 16\" 2021 M1 Pro",
    price: 205000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
    date: "Today",
  },
  {
    id: "6",
    title: "Sofa Set - 3+1+1",
    price: 45000,
    location: "Sarbet, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
    date: "Today",
  },
  {
    id: "7",
    title: "Sony PlayStation 5 Digital Edition",
    price: 85000,
    location: "Kazanchis, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday",
  },
  {
    id: "8",
    title: "Nike Air Jordan 1 High OG",
    price: 12000,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday",
  },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<number[]>([0, 300000]);
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState("12");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white py-2 shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-500">
              <ol className="flex items-center space-x-1">
                <li><a href="/" className="hover:text-brand-green">Home</a></li>
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <span className="text-gray-900">{category === "all" ? "All Products" : category}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          {/* Filters and Sorting */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Category</h4>
                    <div className="space-y-2">
                      {["All Categories", "Electronics", "Vehicles", "Property", "Fashion"].map((cat, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                            defaultChecked={index === 0}
                          />
                          <span className="text-sm">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 300000]}
                        max={1000000}
                        step={1000}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{priceRange[0].toLocaleString()} ETB</span>
                        <span className="text-sm">{priceRange[1].toLocaleString()} ETB</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Filter */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ethiopia</SelectItem>
                        <SelectItem value="addis">Addis Ababa</SelectItem>
                        <SelectItem value="adama">Adama</SelectItem>
                        <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                        <SelectItem value="hawassa">Hawassa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Condition Filter */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Condition</h4>
                    <div className="space-y-2">
                      {["All", "New", "Used - Like New", "Used - Good", "Used - Fair"].map((condition, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                            defaultChecked={index === 0}
                          />
                          <span className="text-sm">{condition}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Apply Filters Button */}
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Product Listing Area */}
            <div className="flex-grow">
              {/* Mobile Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4 lg:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-between"
                  onClick={() => alert("Mobile filters would open here")}
                >
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Sorting and View Controls */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2">
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
                <p className="text-gray-600 text-sm">Showing <span className="font-medium">{PRODUCTS.length}</span> results</p>
              </div>
              
              {/* Products Grid */}
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4`}>
                {PRODUCTS.map(product => (
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

export default Products;
