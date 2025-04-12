
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, List, ChevronDown, ChevronUp, Filter, X } from "lucide-react";

// Mock categories and subcategories for the Electronics category
const CATEGORIES = {
  "electronics": {
    name: "Electronics",
    icon: "smartphone",
    description: "Shop the latest electronics, phones, computers, tablets, TVs and more at great prices in Ethiopia.",
    subcategories: [
      { id: "mobile-phones", name: "Mobile Phones", count: 1256 },
      { id: "laptops", name: "Laptops & Computers", count: 845 },
      { id: "tablets", name: "Tablets", count: 312 },
      { id: "tvs", name: "TVs & Monitors", count: 478 },
      { id: "cameras", name: "Cameras", count: 290 },
      { id: "audio", name: "Audio & Headphones", count: 567 },
      { id: "gaming", name: "Gaming", count: 234 },
      { id: "accessories", name: "Accessories", count: 1458 }
    ],
    filters: [
      {
        name: "Brand",
        options: [
          { value: "apple", label: "Apple", count: 345 },
          { value: "samsung", label: "Samsung", count: 412 },
          { value: "huawei", label: "Huawei", count: 256 },
          { value: "sony", label: "Sony", count: 189 },
          { value: "google", label: "Google", count: 87 },
          { value: "lg", label: "LG", count: 134 },
          { value: "tecno", label: "Tecno", count: 267 },
          { value: "xiaomi", label: "Xiaomi", count: 198 }
        ]
      },
      {
        name: "Condition",
        options: [
          { value: "new", label: "New", count: 1567 },
          { value: "used-like-new", label: "Used - Like New", count: 765 },
          { value: "used-good", label: "Used - Good", count: 543 },
          { value: "used-fair", label: "Used - Fair", count: 321 }
        ]
      }
    ]
  },
  "vehicles": {
    name: "Vehicles",
    icon: "car",
    description: "Browse cars, motorcycles, trucks and other vehicles for sale across Ethiopia.",
    subcategories: [
      { id: "cars", name: "Cars", count: 876 },
      { id: "motorcycles", name: "Motorcycles", count: 345 },
      { id: "trucks", name: "Commercial Vehicles", count: 234 },
      { id: "parts", name: "Vehicle Parts", count: 789 }
    ]
  },
  "property": {
    name: "Property",
    icon: "building2",
    description: "Find apartments, houses, land and commercial properties for sale or rent in Ethiopia.",
    subcategories: [
      { id: "apartments-sale", name: "Apartments for Sale", count: 654 },
      { id: "houses-sale", name: "Houses for Sale", count: 432 },
      { id: "rentals", name: "Rentals", count: 876 },
      { id: "land", name: "Land & Plots", count: 345 },
      { id: "commercial", name: "Commercial Property", count: 123 }
    ]
  }
};

// Mock product data
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
    title: "Samsung Galaxy S22 Ultra",
    price: 110000,
    location: "Kazanchis, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "MacBook Pro 16\" 2022 M2 Pro",
    price: 230000,
    location: "Megenagna, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
    date: "2 days ago",
  },
  {
    id: "4",
    title: "iPad Pro 12.9\" 2022",
    price: 85000,
    location: "CMC, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000",
    date: "3 days ago",
  },
  {
    id: "5",
    title: "Sony PlayStation 5",
    price: 75000,
    location: "Sarbet, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday",
  },
  {
    id: "6",
    title: "Canon EOS R5 Camera",
    price: 195000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000",
    date: "Today",
  },
  {
    id: "7",
    title: "Dell XPS 15 Laptop",
    price: 125000,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000",
    date: "5 days ago",
  },
  {
    id: "8",
    title: "LG 55\" 4K OLED TV",
    price: 98000,
    location: "Ayat, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000",
    date: "1 week ago",
  },
  {
    id: "9",
    title: "Apple AirPods Pro",
    price: 15000,
    location: "Mekanisa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday",
  },
  {
    id: "10",
    title: "Xiaomi Mi 12T Pro",
    price: 65000,
    location: "Mexico, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=1000",
    date: "Today",
  },
  {
    id: "11",
    title: "Google Pixel 7 Pro",
    price: 92000,
    location: "Kazanchis, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=1000",
    date: "3 days ago",
  },
  {
    id: "12",
    title: "Samsung 34\" Curved Monitor",
    price: 48000,
    location: "Gerji, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1527219525722-f9767a7f2884?auto=format&fit=crop&q=80&w=1000",
    date: "4 days ago",
  }
];

const Category = () => {
  const { id, subcategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<number[]>([0, 250000]);
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState("12");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const category = CATEGORIES[id as keyof typeof CATEGORIES];
  
  const breadcrumbTitle = subcategoryId 
    ? category?.subcategories.find(sub => sub.id === subcategoryId)?.name 
    : category?.name || id;
  
  useEffect(() => {
    // This would fetch products based on the category, subcategory, and filters
    // For now, we're using static data
  }, [id, subcategoryId, searchParams]);
  
  // Create active filters based on search params
  const activeFilters = Array.from(searchParams.entries()).map(([key, value]) => {
    return { key, value, label: `${key}: ${value}` };
  });
  
  return (
    <div className="flex-grow bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-2 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <ol className="flex items-center space-x-1">
              <li><a href="/" className="hover:text-brand-green">Home</a></li>
              {category && (
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <a href={`/category/${id}`} className="hover:text-brand-green">{category.name}</a>
                </li>
              )}
              {subcategoryId && (
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <span className="text-gray-900">{breadcrumbTitle}</span>
                </li>
              )}
              {!subcategoryId && category && (
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <span className="text-gray-900">All {category.name}</span>
                </li>
              )}
            </ol>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Category Header */}
        {category && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {subcategoryId 
                ? category.subcategories.find(sub => sub.id === subcategoryId)?.name 
                : category.name}
            </h1>
            <p className="text-gray-600">{category.description}</p>
            
            {/* Subcategory pills - only show if we're on the main category page */}
            {!subcategoryId && category.subcategories && (
              <div className="mt-4 flex flex-wrap gap-2">
                <a 
                  href={`/category/${id}`} 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    !subcategoryId 
                      ? 'bg-brand-green text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </a>
                {category.subcategories.map(subcategory => (
                  <a 
                    key={subcategory.id} 
                    href={`/category/${id}/${subcategory.id}`}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      subcategoryId === subcategory.id 
                        ? 'bg-brand-green text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subcategory.name} <span className="ml-1 text-xs opacity-70">({subcategory.count})</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              
              <div className="space-y-6">
                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 250000]}
                      max={500000}
                      step={5000}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{priceRange[0].toLocaleString()} ETB</span>
                      <span className="text-sm">{priceRange[1].toLocaleString()} ETB</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Input 
                        type="number" 
                        placeholder="Min"
                        value={priceRange[0]} 
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full" 
                      />
                      <span>-</span>
                      <Input 
                        type="number" 
                        placeholder="Max" 
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full" 
                      />
                    </div>
                    <Button className="mt-2 w-full" size="sm">Apply</Button>
                  </div>
                </div>
                
                <Separator />
                
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
                
                <Separator />
                
                {/* Dynamic Filters based on category */}
                {category?.filters?.map((filter, index) => (
                  <div key={index}>
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full">
                        <h4 className="font-medium text-gray-900">{filter.name}</h4>
                        <ChevronUp className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 space-y-2">
                        {filter.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox id={`filter-${filter.name}-${option.value}`} />
                            <span className="text-sm flex-1">{option.label}</span>
                            <span className="text-xs text-gray-500">({option.count})</span>
                          </label>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    {index < (category?.filters?.length || 0) - 1 && <Separator className="my-3" />}
                  </div>
                ))}
                
                {/* Apply Filters Button */}
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </div>
          
          {/* Product Listing Area */}
          <div className="flex-grow">
            {/* Mobile Filters Button */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 lg:hidden">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <span className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {/* Mobile Filters Panel */}
              {mobileFiltersOpen && (
                <div className="mt-4 border-t pt-4">
                  <div className="space-y-4">
                    {/* ...filters content for mobile... */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 250000]}
                          max={500000}
                          step={5000}
                          onValueChange={setPriceRange}
                          className="mb-6"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{priceRange[0].toLocaleString()} ETB</span>
                          <span className="text-sm">{priceRange[1].toLocaleString()} ETB</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Input 
                            type="number" 
                            placeholder="Min"
                            value={priceRange[0]} 
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full" 
                          />
                          <span>-</span>
                          <Input 
                            type="number" 
                            placeholder="Max" 
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>Apply Filters</Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="outline" className="bg-white py-1">
                    {filter.label}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => {/* Remove filter logic */}}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                <Button variant="link" className="text-xs text-red-500 p-0 h-auto">Clear all</Button>
              </div>
            )}
            
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
            
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Showing <span className="font-medium">{PRODUCTS.length}</span> results</p>
            </div>
            
            {/* Products Grid/List */}
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
    </div>
  );
};

export default Category;
