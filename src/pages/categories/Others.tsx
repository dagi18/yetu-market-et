import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Grid3X3, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Other products data
const OTHER_PRODUCTS = [
  {
    id: "o1",
    title: "Art Painting - Ethiopian Landscape",
    price: 4800,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1000",
    date: "Today"
  },
  {
    id: "o2",
    title: "Vintage Collectible Stamps",
    price: 2500,
    location: "Mexico, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1561670733-3ca9d27de5ae?q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "o3",
    title: "Traditional Ethiopian Musical Instrument",
    price: 3800,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1000",
    date: "3 days ago"
  },
  {
    id: "o4",
    title: "Agricultural Seeds - 10kg Bag",
    price: 1600,
    location: "CMC, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1620003437612-d8612adea4c9?q=80&w=1000",
    date: "4 days ago"
  },
  {
    id: "o5",
    title: "Handcrafted Ethiopian Chess Set",
    price: 5500,
    location: "Kazanchis, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "o6",
    title: "Vintage Book Collection",
    price: 3200,
    location: "Merkato, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000",
    date: "5 days ago"
  },
];

// Subcategories for "Others" category
const OTHER_SUBCATEGORIES = [
  { name: "Art & Collectibles", count: 248 },
  { name: "Musical Instruments", count: 156 },
  { name: "Books & Stationery", count: 421 },
  { name: "Agriculture", count: 193 },
  { name: "Tools & Equipment", count: 329 },
  { name: "Sports & Fitness", count: 284 },
  { name: "Toys & Games", count: 176 },
  { name: "Miscellaneous", count: 543 },
];

const Others = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState("12");
  
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
                <span className="text-gray-900">Others</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Others</h1>
          <p className="text-gray-600 mb-0">
            Browse a variety of unique items that don't fit standard categories, including art, collectibles, musical instruments, and more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Subcategories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <h3 className="font-semibold text-lg mb-4">Subcategories</h3>
              <div className="space-y-2">
                {OTHER_SUBCATEGORIES.map((subcat, index) => (
                  <Link
                    key={index}
                    to={`/category/others/${subcat.name.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-gray-700"
                  >
                    <span>{subcat.name}</span>
                    <span className="text-sm text-gray-500">{subcat.count}</span>
                  </Link>
                ))}
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
                Showing <span className="font-medium">{OTHER_PRODUCTS.length}</span> results in 
                <span className="font-medium"> Others</span>
              </p>
            </div>
            
            {/* Products Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
              {OTHER_PRODUCTS.map(product => (
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

export default Others;
