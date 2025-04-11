
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Grid3X3, List, ChevronRight, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample categories data
const CATEGORIES = {
  "electronics": {
    name: "Electronics",
    subcategories: [
      { name: "Mobile Phones", count: 1245 },
      { name: "Laptops & Computers", count: 876 },
      { name: "TV & Audio", count: 564 },
      { name: "Cameras", count: 231 },
      { name: "Accessories", count: 1458 }
    ],
    description: "Browse electronics including mobile phones, laptops, TVs, and more at great prices across Ethiopia."
  },
  "vehicles": {
    name: "Vehicles",
    subcategories: [
      { name: "Cars", count: 982 },
      { name: "Motorcycles", count: 345 },
      { name: "Commercial Vehicles", count: 203 },
      { name: "Vehicle Parts", count: 876 }
    ],
    description: "Find new and used vehicles, cars, motorcycles and vehicle parts throughout Ethiopia."
  },
  "property": {
    name: "Property",
    subcategories: [
      { name: "Apartments for Sale", count: 654 },
      { name: "Houses for Sale", count: 432 },
      { name: "Rentals", count: 876 },
      { name: "Land & Plots", count: 543 },
      { name: "Commercial Property", count: 231 }
    ],
    description: "Discover property listings including apartments, houses, land and commercial properties across Ethiopia."
  }
};

// Sample product data
const PRODUCTS = [
  {
    id: "1",
    title: "iPhone 13 Pro Max - 256GB",
    price: 120000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000",
    date: "Today"
  },
  {
    id: "2",
    title: "Samsung Galaxy S23 Ultra - 512GB",
    price: 145000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5d572a3?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "3",
    title: "Google Pixel 7 Pro - 128GB",
    price: 95000,
    location: "Megenagna, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=1000",
    date: "2 days ago"
  },
  {
    id: "4",
    title: "iPhone 14 - 128GB",
    price: 110000,
    location: "CMC, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=1000",
    date: "Today"
  },
  {
    id: "5",
    title: "OnePlus 10 Pro - 256GB",
    price: 87000,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1598346762291-aee88549193f?auto=format&fit=crop&q=80&w=1000",
    date: "5 days ago"
  },
  {
    id: "6",
    title: "Xiaomi Redmi Note 12 - 128GB",
    price: 42000,
    location: "Kazanchis, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=1000",
    date: "3 days ago"
  },
  {
    id: "7",
    title: "Apple MacBook Air M2 - 256GB",
    price: 165000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "8",
    title: "Dell XPS 15 - 1TB SSD",
    price: 185000,
    location: "Megenagna, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1593642702909-dec73df255d7?auto=format&fit=crop&q=80&w=1000",
    date: "2 days ago"
  },
  {
    id: "9",
    title: "Samsung 55\" 4K Smart TV",
    price: 85000,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000",
    date: "3 days ago"
  },
  {
    id: "10",
    title: "Sony PlayStation 5 Digital Edition",
    price: 85000,
    location: "Kazanchis, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "11",
    title: "Beats Studio Wireless Headphones",
    price: 12500,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    date: "Today"
  },
  {
    id: "12",
    title: "Canon EOS R6 Camera with Lens",
    price: 175000,
    location: "Megenagna, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000",
    date: "2 days ago"
  },
];

const Category = () => {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string, subcategoryId?: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState("12");
  
  // Get category data based on URL parameter
  const categoryData = categoryId ? CATEGORIES[categoryId as keyof typeof CATEGORIES] : null;
  
  if (!categoryId || !categoryData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
                  <span className="text-gray-900">{categoryData.name}</span>
                </li>
                {subcategoryId && (
                  <li className="flex items-center space-x-1">
                    <span>/</span>
                    <span className="text-gray-900">{subcategoryId}</span>
                  </li>
                )}
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          {/* Category Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{categoryData.name}</h1>
            <p className="text-gray-600 mb-0">{categoryData.description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Subcategories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <h3 className="font-semibold text-lg mb-4">Subcategories</h3>
                <div className="space-y-2">
                  {categoryData.subcategories.map((subcat, index) => (
                    <Link
                      key={index}
                      to={`/category/${categoryId}/${subcat.name.toLowerCase().replace(/ /g, '-')}`}
                      className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-50 ${
                        subcategoryId === subcat.name.toLowerCase().replace(/ /g, '-') 
                          ? 'bg-gray-50 text-brand-green font-medium' 
                          : 'text-gray-700'
                      }`}
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
                  Showing <span className="font-medium">{PRODUCTS.length}</span> results in 
                  <span className="font-medium"> {categoryData.name}</span>
                  {subcategoryId && <span> - {subcategoryId.replace(/-/g, ' ')}</span>}
                </p>
              </div>
              
              {/* Products Grid */}
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
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

export default Category;
