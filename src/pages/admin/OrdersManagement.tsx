
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-85421",
      customer: "Abebe Kebede",
      date: "2023-04-10T10:23:00Z",
      total: 3750.00,
      status: "delivered",
      items: [
        { id: 1, name: "Vintage Leather Jacket", price: 2500, quantity: 1 },
        { id: 2, name: "Cotton T-Shirt", price: 1250, quantity: 1 },
      ]
    },
    {
      id: "ORD-72158",
      customer: "Sara Tekle",
      date: "2023-04-09T14:45:00Z",
      total: 12000.00,
      status: "processing",
      items: [
        { id: 3, name: "Samsung Galaxy A52", price: 12000, quantity: 1 },
      ]
    },
    {
      id: "ORD-63987",
      customer: "Yonas Alemu",
      date: "2023-04-08T09:12:00Z",
      total: 850.00,
      status: "shipped",
      items: [
        { id: 4, name: "Desk Lamp", price: 850, quantity: 1 },
      ]
    },
    {
      id: "ORD-54289",
      customer: "Tigist Haile",
      date: "2023-04-07T16:30:00Z",
      total: 22500.00,
      status: "delivered",
      items: [
        { id: 5, name: "Office Chair", price: 7500, quantity: 3 },
      ]
    },
    {
      id: "ORD-41673",
      customer: "Dawit Gebre",
      date: "2023-04-06T11:05:00Z",
      total: 4500.00,
      status: "cancelled",
      items: [
        { id: 6, name: "Electric Kettle", price: 1500, quantity: 1 },
        { id: 7, name: "Coffee Maker", price: 3000, quantity: 1 },
      ]
    }
  ]);
  
  const [viewingOrder, setViewingOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { toast } = useToast();
  
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    if (viewingOrder && viewingOrder.id === orderId) {
      setViewingOrder({ ...viewingOrder, status: newStatus });
    }
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
  };
  
  const getStatusBadge = (status) => {
    const statusStyles = {
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={statusStyles[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  return (
    <>
      <AdminNavbar />
      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Export Orders
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search orders by ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total (ETB)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{format(new Date(order.date), "PPP")}</TableCell>
                    <TableCell>{order.total.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setViewingOrder(order);
                          setIsOrderDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Order Details Dialog */}
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {viewingOrder && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                    <p className="font-semibold">{viewingOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p>{format(new Date(viewingOrder.date), "PPP p")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(viewingOrder.status)}</div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Customer</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">{viewingOrder.customer}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Order Items</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">{item.price.toLocaleString()} ETB</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{(item.price * item.quantity).toLocaleString()} ETB</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-medium">Total:</TableCell>
                          <TableCell className="text-right font-bold">{viewingOrder.total.toLocaleString()} ETB</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Update Status</p>
                  <Select 
                    value={viewingOrder.status}
                    onValueChange={(value) => updateOrderStatus(viewingOrder.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </>
  );
};

export default OrdersManagement;
