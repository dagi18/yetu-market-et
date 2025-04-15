
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Package, Clock, CheckCircle, AlertTriangle } from "lucide-react";

// Sample orders data
const ORDERS = [
  {
    id: "ORD-12345",
    date: "2023-04-10",
    total: 120000,
    items: 3,
    status: "delivered",
    products: [
      { name: "iPhone 13 Pro Max", quantity: 1, price: 115000 },
      { name: "Phone Case", quantity: 1, price: 3000 },
      { name: "Screen Protector", quantity: 1, price: 2000 }
    ]
  },
  {
    id: "ORD-12346",
    date: "2023-04-05",
    total: 45000,
    items: 1,
    status: "processing",
    products: [
      { name: "Sofa Set", quantity: 1, price: 45000 }
    ]
  },
  {
    id: "ORD-12347",
    date: "2023-03-28",
    total: 85000,
    items: 1,
    status: "shipped",
    products: [
      { name: "Samsung 55\" TV", quantity: 1, price: 85000 }
    ]
  },
  {
    id: "ORD-12348",
    date: "2023-03-15",
    total: 97000,
    items: 2,
    status: "delivered",
    products: [
      { name: "MacBook Air", quantity: 1, price: 95000 },
      { name: "Laptop Sleeve", quantity: 1, price: 2000 }
    ]
  },
  {
    id: "ORD-12349",
    date: "2023-03-02",
    total: 12000,
    items: 2,
    status: "cancelled",
    products: [
      { name: "Nike Air Jordan", quantity: 1, price: 10000 },
      { name: "Socks", quantity: 2, price: 1000 }
    ]
  }
];

const OrderStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'delivered':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle className="h-3 w-3 mr-1" /> Delivered
        </Badge>
      );
    case 'processing':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <Clock className="h-3 w-3 mr-1" /> Processing
        </Badge>
      );
    case 'shipped':
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          <Package className="h-3 w-3 mr-1" /> Shipped
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          <AlertTriangle className="h-3 w-3 mr-1" /> Cancelled
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const filteredOrders = ORDERS.filter(order => {
    // Filter by search query
    const matchesSearch = searchQuery.trim() === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by status tab
    const matchesTab = activeTab === "all" || order.status === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  
  return (
    <div className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <nav className="flex items-center space-x-1">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">My Orders</span>
          </nav>
        </div>
        
        {/* Header and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>
            <div className="w-full md:w-64 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search"
                placeholder="Search orders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Order Tabs and Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="p-4 border-b">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-0">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery ? "Try a different search term" : "You haven't placed any orders yet"}
                  </p>
                  <Button asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <>
                          <TableRow key={order.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell>{order.items} {order.items === 1 ? 'item' : 'items'}</TableCell>
                            <TableCell>{order.total.toLocaleString()} ETB</TableCell>
                            <TableCell>
                              <OrderStatusBadge status={order.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleOrderDetails(order.id)}
                              >
                                {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expandedOrder === order.id && (
                            <TableRow>
                              <TableCell colSpan={6} className="bg-gray-50 p-0">
                                <div className="p-4">
                                  <h4 className="font-semibold mb-3">Order Items</h4>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {order.products.map((product, idx) => (
                                        <TableRow key={idx}>
                                          <TableCell>{product.name}</TableCell>
                                          <TableCell>{product.quantity}</TableCell>
                                          <TableCell>{product.price.toLocaleString()} ETB</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="processing">
              {/* Processing orders content - rendered by the filter */}
            </TabsContent>
            
            <TabsContent value="shipped">
              {/* Shipped orders content - rendered by the filter */}
            </TabsContent>
            
            <TabsContent value="delivered">
              {/* Delivered orders content - rendered by the filter */}
            </TabsContent>
            
            <TabsContent value="cancelled">
              {/* Cancelled orders content - rendered by the filter */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Orders;
