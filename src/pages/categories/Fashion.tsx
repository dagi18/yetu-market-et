import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Grid3X3, List, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

// Fashion products data
const FASHION_PRODUCTS = [
  {
    id: "f1",
    title: "Men's Casual Hoodie Jacket",
    price: 1850,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1594032194509-0056023973b2?q=80&w=1000",
    date: "Today"
  },
  {
    id: "f2",
    title: "Women's Traditional Ethiopian Dress",
    price: 3200,
    location: "Mexico, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1499006919218-dcfcf0cddce1?q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "f3",
    title: "Men's Formal Suit - Black",
    price: 7500,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1000",
    date: "2 days ago"
  },
  {
    id: "f4",
    title: "Women's Leather Handbag",
    price: 2200,
    location: "CMC, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000",
    date: "Today"
  },
  {
    id: "f5",
    title: "Ethiopian Traditional Scarf (Netela)",
    price: 950,
    location: "Merkato, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1520947939352-b00c0ef1d3db?q=80&w=1000",
    date: "5 days ago"
  },
  {
    id: "f6",
    title: "Men's Running Shoes",
    price: 3500,
    location: "Kazanchis, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000",
    date: "3 days ago"
  },
];

const Fashion = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState("12");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="flex-grow bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-2 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <ol className="flex items-center space-x-1">
              <li><Link to="/" className="hover:text-brand-green">Home</Link></li>
              <li className="flex items-center space-x-1">
                <span>/</span>
                <span className="text-gray-900">Fashion</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Fashion</h1>
          <p className="text-gray-600 mb-0">
            Browse the latest fashion items including clothing, shoes, accessories and more at great prices across Ethiopia.
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
                      <span>Men's Clothing</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-brand-green mr-2" />
                      <span>Women's Clothing</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-brand-green mr-2" />
                      <span>Traditional Wear</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-brand-green mr-2" />
                      <span>Shoes & Footwear</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-brand-green mr-2" />
                      <span>Accessories</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-3">Price Range (ETB)</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 10000]}
                      max={10000}
                      step={100}
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
                  <h4 className="font-medium text-sm mb-3">Location</h4>
                  <Select defaultValue="addis">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="addis">Addis Ababa</SelectItem>
                      <SelectItem value="adama">Adama</SelectItem>
                      <SelectItem value="hawassa">Hawassa</SelectItem>
                      <SelectItem value="bahirdar">Bahir Dar</SelectItem>
                      <SelectItem value="mekelle">Mekelle</SelectItem>
                    </SelectContent>
                  </Select>
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
                Showing <span className="font-medium">{FASHION_PRODUCTS.length}</span> results in 
                <span className="font-medium"> Fashion</span>
              </p>
            </div>
            
            {/* Products Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
              {FASHION_PRODUCTS.map(product => (
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
    </div>
  );
};

export default Fashion;
