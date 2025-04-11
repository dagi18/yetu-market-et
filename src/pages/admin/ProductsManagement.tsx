
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus, Edit, Trash2, Eye, MoreVertical, Download, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for products
const PRODUCTS = [
  {
    id: "P001",
    name: "iPhone 13 Pro Max - 256GB",
    category: "Electronics",
    subcategory: "Mobile Phones",
    price: 120000,
    status: "active",
    inventory: 5,
    createdAt: "2023-10-15",
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "P002",
    name: "Samsung Galaxy S23 Ultra - 512GB",
    category: "Electronics",
    subcategory: "Mobile Phones",
    price: 145000,
    status: "active",
    inventory: 3,
    createdAt: "2023-10-14",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5d572a3?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "P003",
    name: "Toyota Corolla 2018 Silver",
    category: "Vehicles",
    subcategory: "Cars",
    price: 2500000,
    status: "pending",
    inventory: 1,
    createdAt: "2023-10-14",
    imageUrl: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "P004",
    name: "3 Bedroom Apartment for Rent",
    category: "Property",
    subcategory: "Rentals",
    price: 35000,
    status: "active",
    inventory: 1,
    createdAt: "2023-10-13",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "P005",
    name: "Sony PlayStation 5 Digital Edition",
    category: "Electronics",
    subcategory: "Gaming Consoles",
    price: 85000,
    status: "sold",
    inventory: 0,
    createdAt: "2023-10-12",
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "P006",
    name: "MacBook Pro M2 - 1TB",
    category: "Electronics",
    subcategory: "Laptops",
    price: 210000,
    status: "active",
    inventory: 2,
    createdAt: "2023-10-11",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "P007",
    name: "Sofa Set - 3+1+1",
    category: "Home & Garden",
    subcategory: "Furniture",
    price: 45000,
    status: "active",
    inventory: 2,
    createdAt: "2023-10-10",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "P008",
    name: "Nike Air Jordan 1 High OG",
    category: "Fashion",
    subcategory: "Shoes",
    price: 12000,
    status: "active",
    inventory: 4,
    createdAt: "2023-10-09",
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80&w=1000"
  }
];

const ProductsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const handleDeleteProduct = (id: string) => {
    toast({
      title: "Product deleted",
      description: `Product ${id} has been deleted.`,
    });
    // In a real app, you would delete the product from the database
  };
  
  const handleSelectProduct = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id)
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };
  
  const handleSelectAllProducts = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };
  
  const handleBulkDelete = () => {
    toast({
      title: "Products deleted",
      description: `${selectedProducts.length} products have been deleted.`,
    });
    setSelectedProducts([]);
    // In a real app, you would delete the products from the database
  };
  
  // Filter products based on search term, status, and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  // Get unique categories from products
  const categories = [...new Set(PRODUCTS.map(product => product.category))];
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products Management</h1>
            <p className="text-gray-500">Manage and organize your product listings.</p>
          </div>
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
        
        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-40">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-40">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Selected Items Actions */}
        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
            <span className="text-sm font-medium">{selectedProducts.length} items selected</span>
            <Button variant="outline" size="sm" onClick={() => setSelectedProducts([])}>
              Clear Selection
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}
        
        {/* Products Table */}
        <div className="bg-white rounded-md shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                        checked={selectedProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                        onChange={handleSelectAllProducts}
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Product
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Price
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inventory
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                      <div className="text-xs text-gray-500">{product.subcategory}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.price.toLocaleString()} ETB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.inventory}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/product/${product.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/products/edit/${product.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Filter className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{" "}
              <span className="font-medium">{filteredProducts.length}</span> results
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getBadgeStyles = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getBadgeStyles()}`}>
      {status}
    </span>
  );
};

export default ProductsManagement;
