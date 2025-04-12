
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Grid3X3, List, ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import CategoryNav from "@/components/categories/CategoryNav";

// Mock data for categories with filters
const categories = {
  "electronics": {
    name: "Electronics",
    icon: "smartphone",
    description: "Shop the latest gadgets, phones, laptops and other electronic items.",
    subcategories: [
      { id: "phones", name: "Mobile Phones", count: 1204 },
      { id: "laptops", name: "Laptops & Computers", count: 743 },
      { id: "tv", name: "TV & Audio", count: 512 },
      { id: "accessories", name: "Accessories", count: 1658 }
    ],
    filters: [
      {
        name: "Brand",
        options: [
          { value: "apple", label: "Apple", count: 342 },
          { value: "samsung", label: "Samsung", count: 289 },
          { value: "huawei", label: "Huawei", count: 165 },
          { value: "tecno", label: "Tecno", count: 143 },
          { value: "infinix", label: "Infinix", count: 112 },
          { value: "lg", label: "LG", count: 76 }
        ]
      },
      {
        name: "Condition",
        options: [
          { value: "new", label: "New", count: 842 },
          { value: "used-like-new", label: "Used - Like New", count: 431 },
          { value: "used-good", label: "Used - Good", count: 287 },
          { value: "used-fair", label: "Used - Fair", count: 144 }
        ]
      },
      {
        name: "Price Range",
        options: [
          { value: "under-5000", label: "Under 5,000 ETB", count: 364 },
          { value: "5000-15000", label: "5,000 - 15,000 ETB", count: 426 },
          { value: "15000-30000", label: "15,000 - 30,000 ETB", count: 312 },
          { value: "over-30000", label: "Over 30,000 ETB", count: 102 }
        ]
      }
    ]
  },
  "vehicles": {
    name: "Vehicles",
    icon: "car",
    description: "Find cars, motorcycles and other vehicles for sale across Ethiopia.",
    subcategories: [
      { id: "cars", name: "Cars", count: 864 },
      { id: "motorcycles", name: "Motorcycles", count: 341 },
      { id: "commercial", name: "Commercial Vehicles", count: 192 },
      { id: "parts", name: "Vehicle Parts", count: 529 }
    ],
    filters: [
      {
        name: "Make",
        options: [
          { value: "toyota", label: "Toyota", count: 287 },
          { value: "suzuki", label: "Suzuki", count: 132 },
          { value: "hyundai", label: "Hyundai", count: 97 },
          { value: "ford", label: "Ford", count: 76 },
          { value: "nissan", label: "Nissan", count: 72 }
        ]
      },
      {
        name: "Year",
        options: [
          { value: "2020-present", label: "2020 - Present", count: 87 },
          { value: "2015-2019", label: "2015 - 2019", count: 143 },
          { value: "2010-2014", label: "2010 - 2014", count: 231 },
          { value: "pre-2010", label: "Before 2010", count: 403 }
        ]
      }
    ]
  },
  "fashion": {
    name: "Fashion & Clothing",
    icon: "shirt",
    description: "Explore men's, women's, and children's clothing, shoes, and accessories.",
    subcategories: [
      { id: "mens", name: "Men's Clothing", count: 932 },
      { id: "womens", name: "Women's Clothing", count: 1543 },
      { id: "kids", name: "Kids Clothing", count: 683 },
      { id: "shoes", name: "Shoes & Footwear", count: 856 },
      { id: "accessories", name: "Accessories", count: 741 }
    ]
  }
};

// Mock products data
const products = Array(24).fill(null).map((_, index) => ({
  id: `product-${index + 1}`,
  title: `Example Product ${index + 1}`,
  price: Math.floor(Math.random() * 20000) + 1000,
  location: "Addis Ababa",
  imageUrl: `https://picsum.photos/400/300?random=${index + 1}`,
  date: index < 5 ? "Today" : index < 10 ? "Yesterday" : "3 days ago"
}));

const Category = () => {
  const { categoryId, subcategoryId } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState("recent");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const categoryData = categoryId ? categories[categoryId as keyof typeof categories] : null;
  const subcategoryName = subcategoryId && categoryData ? 
    categoryData.subcategories.find(sub => sub.id === subcategoryId)?.name : 
    null;
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  
  const handleFilterChange = (filterName: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterName] || [];
      if (checked) {
        return {...prev, [filterName]: [...currentFilters, value]};
      } else {
        return {...prev, [filterName]: currentFilters.filter(v => v !== value)};
      }
    });
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };
  
  const resetFilters = () => {
    setSelectedFilters({});
    setPriceRange([0, 50000]);
  };
  
  // This is just for demo - in a real app, we would filter the products based on selected filters
  const filteredProducts = products;
  
  return (
    <div className="flex-grow bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        {categoryData && (
          <div className="text-sm text-gray-500 mb-4">
            <nav className="flex items-center space-x-1">
              <Link to="/" className="hover:text-brand-green">Home</Link>
              <span>/</span>
              <span className="text-gray-900">{categoryData.name}</span>
              {subcategoryName && (
                <>
                  <span>/</span>
                  <span className="text-gray-900">{subcategoryName}</span>
                </>
              )}
            </nav>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <CategoryNav />
              
              {categoryData && (
                <>
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">{categoryData.name}</h2>
                    <p className="text-gray-600 mb-4">{categoryData.description}</p>
                    
                    <div className="space-y-2">
                      {categoryData.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center justify-between">
                          <Link 
                            to={`/category/${categoryId}/${subcategory.id}`}
                            className={`text-gray-700 hover:text-brand-green ${subcategoryId === subcategory.id ? 'font-semibold text-brand-green' : ''}`}
                          >
                            {subcategory.name}
                          </Link>
                          <span className="text-gray-500 text-sm">{subcategory.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                </>
              )}
              
              {/* Filters Section */}
              {categoryData && 'filters' in categoryData && categoryData.filters && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <div className="space-y-6">
                    {/* Price Range Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <div className="mb-4">
                        <Slider 
                          value={priceRange} 
                          min={0} 
                          max={50000} 
                          step={1000}
                          onValueChange={handlePriceRangeChange} 
                          className="mt-2" 
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>{priceRange[0].toLocaleString()} ETB</div>
                        <div>{priceRange[1].toLocaleString()} ETB</div>
                      </div>
                    </div>
                    
                    {/* Dynamic Filters Based on Category */}
                    {categoryData.filters.map((filter) => (
                      <div key={filter.name}>
                        <h4 className="font-medium mb-3">{filter.name}</h4>
                        <div className="space-y-2">
                          {filter.options.map((option) => (
                            <div key={option.value} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Checkbox 
                                  id={`${filter.name}-${option.value}`} 
                                  checked={(selectedFilters[filter.name] || []).includes(option.value)}
                                  onCheckedChange={(checked) => 
                                    handleFilterChange(filter.name, option.value, checked === true)
                                  }
                                />
                                <label 
                                  htmlFor={`${filter.name}-${option.value}`}
                                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option.label}
                                </label>
                              </div>
                              <span className="text-gray-500 text-sm">{option.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <Button onClick={resetFilters} variant="outline" className="w-full mt-4">
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Filters and Sort - Mobile View */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <h2 className="text-xl font-semibold mb-6">Filters</h2>
                    
                    <div className="space-y-6">
                      {categoryData && categoryData.subcategories.length > 0 && (
                        <div>
                          <h3 className="font-medium mb-3">Categories</h3>
                          <div className="space-y-2">
                            {categoryData.subcategories.map((subcategory) => (
                              <div key={subcategory.id} className="flex items-center justify-between">
                                <Link 
                                  to={`/category/${categoryId}/${subcategory.id}`}
                                  className={`text-gray-700 hover:text-brand-green ${subcategoryId === subcategory.id ? 'font-semibold text-brand-green' : ''}`}
                                  onClick={() => setMobileFiltersOpen(false)}
                                >
                                  {subcategory.name}
                                </Link>
                                <span className="text-gray-500 text-sm">{subcategory.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Price Range Filter */}
                      <div>
                        <h4 className="font-medium mb-3">Price Range</h4>
                        <div className="mb-4">
                          <Slider 
                            value={priceRange} 
                            min={0} 
                            max={50000} 
                            step={1000}
                            onValueChange={handlePriceRangeChange} 
                            className="mt-2" 
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div>{priceRange[0].toLocaleString()} ETB</div>
                          <div>{priceRange[1].toLocaleString()} ETB</div>
                        </div>
                      </div>
                      
                      {/* Dynamic Filters Based on Category */}
                      {categoryData && 'filters' in categoryData && categoryData.filters && categoryData.filters.map((filter) => (
                        <div key={filter.name}>
                          <h4 className="font-medium mb-3">{filter.name}</h4>
                          <div className="space-y-2">
                            {filter.options.map((option) => (
                              <div key={option.value} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Checkbox 
                                    id={`mobile-${filter.name}-${option.value}`} 
                                    checked={(selectedFilters[filter.name] || []).includes(option.value)}
                                    onCheckedChange={(checked) => 
                                      handleFilterChange(filter.name, option.value, checked === true)
                                    }
                                  />
                                  <label 
                                    htmlFor={`mobile-${filter.name}-${option.value}`}
                                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                                <span className="text-gray-500 text-sm">{option.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex space-x-2 mt-6">
                        <Button 
                          onClick={() => {
                            resetFilters();
                            setMobileFiltersOpen(false);
                          }} 
                          variant="outline" 
                          className="flex-1"
                        >
                          Reset
                        </Button>
                        <Button 
                          onClick={() => setMobileFiltersOpen(false)} 
                          className="flex-1"
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="hidden md:flex space-x-1">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "outline"} 
                    size="icon" 
                    className="h-9 w-9" 
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "default" : "outline"} 
                    size="icon" 
                    className="h-9 w-9" 
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2 hidden md:inline">Sort by:</span>
                <select 
                  className="text-sm border border-gray-300 rounded-md p-1 bg-white"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
            
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).flatMap(([filterName, values]) => 
                values.map(value => (
                  <Badge 
                    key={`${filterName}-${value}`} 
                    variant="outline"
                    className="bg-gray-100"
                  >
                    {value}
                    <button 
                      className="ml-1 hover:text-red-500"
                      onClick={() => handleFilterChange(filterName, value, false)}
                    >
                      ×
                    </button>
                  </Badge>
                ))
              )}
              {(priceRange[0] > 0 || priceRange[1] < 50000) && (
                <Badge variant="outline" className="bg-gray-100">
                  {`${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} ETB`}
                  <button 
                    className="ml-1 hover:text-red-500"
                    onClick={() => setPriceRange([0, 50000])}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {(Object.keys(selectedFilters).length > 0 || priceRange[0] > 0 || priceRange[1] < 50000) && (
                <button 
                  className="text-sm text-gray-600 hover:text-red-500"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="w-40 h-40">
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-gray-500 text-sm">{product.location}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-brand-green font-semibold">
                          {product.price.toLocaleString()} ETB
                        </div>
                        <div className="text-gray-500 text-sm">{product.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    size="sm"
                    className={page === 1 ? "bg-brand-green hover:bg-brand-green/90" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
