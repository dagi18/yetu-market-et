
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Eye, UserCog, Ban, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Abebe Kebede",
      email: "abebe.k@example.com",
      phone: "+251912345678",
      location: "Addis Ababa",
      joinDate: "2022-08-15T09:30:00Z",
      orderCount: 12,
      totalSpent: 24500,
      status: "active"
    },
    {
      id: 2,
      name: "Sara Tekle",
      email: "sara.t@example.com",
      phone: "+251923456789",
      location: "Bahir Dar",
      joinDate: "2022-10-03T14:20:00Z",
      orderCount: 5,
      totalSpent: 15800,
      status: "active"
    },
    {
      id: 3,
      name: "Yonas Alemu",
      email: "yonas.a@example.com",
      phone: "+251934567890",
      location: "Hawassa",
      joinDate: "2023-01-22T11:45:00Z",
      orderCount: 3,
      totalSpent: 6700,
      status: "active"
    },
    {
      id: 4,
      name: "Tigist Haile",
      email: "tigist.h@example.com",
      phone: "+251945678901",
      location: "Dire Dawa",
      joinDate: "2023-02-14T08:15:00Z",
      orderCount: 8,
      totalSpent: 28900,
      status: "inactive"
    },
    {
      id: 5,
      name: "Dawit Gebre",
      email: "dawit.g@example.com",
      phone: "+251956789012",
      location: "Mekelle",
      joinDate: "2022-11-05T16:30:00Z",
      orderCount: 6,
      totalSpent: 18400,
      status: "active"
    }
  ]);
  
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });
  
  const { toast } = useToast();
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const toggleCustomerStatus = (customerId) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        const newStatus = customer.status === "active" ? "inactive" : "active";
        return { ...customer, status: newStatus };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    
    if (viewingCustomer && viewingCustomer.id === customerId) {
      const newStatus = viewingCustomer.status === "active" ? "inactive" : "active";
      setViewingCustomer({ ...viewingCustomer, status: newStatus });
    }
    
    const customer = customers.find(c => c.id === customerId);
    const newStatus = customer.status === "active" ? "inactive" : "active";
    
    toast({
      title: `Customer ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `${customer.name} has been ${newStatus === "active" ? "activated" : "deactivated"} successfully.`,
    });
  };
  
  const handleAddCustomer = () => {
    const newCustomerId = Math.max(...customers.map(c => c.id)) + 1;
    const customerToAdd = {
      ...newCustomer,
      id: newCustomerId,
      joinDate: new Date().toISOString(),
      orderCount: 0,
      totalSpent: 0,
      status: "active"
    };
    
    setCustomers([...customers, customerToAdd]);
    setIsAddCustomerOpen(false);
    setNewCustomer({ name: "", email: "", phone: "", location: "" });
    
    toast({
      title: "Customer Added",
      description: `${newCustomer.name} has been added successfully.`,
    });
  };
  
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <AdminNavbar />
      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Customers Management</h1>
          <Button onClick={() => setIsAddCustomerOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search customers by name, email or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>{customer.orderCount}</TableCell>
                    <TableCell>{customer.totalSpent.toLocaleString()} ETB</TableCell>
                    <TableCell>
                      <Badge className={customer.status === "active" ? 
                        "bg-green-100 text-green-800" : 
                        "bg-gray-100 text-gray-800"}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setViewingCustomer(customer);
                            setIsCustomerDetailsOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleCustomerStatus(customer.id)}>
                            {customer.status === "active" ? (
                              <>
                                <Ban className="mr-2 h-4 w-4" /> Deactivate
                              </>
                            ) : (
                              <>
                                <UserCog className="mr-2 h-4 w-4" /> Activate
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No customers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Customer Details Dialog */}
        <Dialog open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
            </DialogHeader>
            {viewingCustomer && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-xl">{getInitials(viewingCustomer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{viewingCustomer.name}</h3>
                      <p className="text-sm text-gray-500">
                        Customer since {format(new Date(viewingCustomer.joinDate), "PP")}
                      </p>
                    </div>
                  </div>
                  <Badge className={viewingCustomer.status === "active" ? 
                    "bg-green-100 text-green-800" : 
                    "bg-gray-100 text-gray-800"}>
                    {viewingCustomer.status.charAt(0).toUpperCase() + viewingCustomer.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="mt-1">{viewingCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="mt-1">{viewingCustomer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1">{viewingCustomer.location}</p>
                  </div>
                </div>
                
                <hr />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="mt-1 text-xl font-semibold">{viewingCustomer.orderCount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Spent</p>
                    <p className="mt-1 text-xl font-semibold">{viewingCustomer.totalSpent.toLocaleString()} ETB</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                    <p className="mt-1 text-xl font-semibold">
                      {viewingCustomer.orderCount > 0 
                        ? Math.round(viewingCustomer.totalSpent / viewingCustomer.orderCount).toLocaleString() 
                        : 0} ETB
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    variant={viewingCustomer.status === "active" ? "destructive" : "outline"}
                    onClick={() => toggleCustomerStatus(viewingCustomer.id)}
                  >
                    {viewingCustomer.status === "active" ? (
                      <>
                        <Ban className="mr-2 h-4 w-4" /> Deactivate Account
                      </>
                    ) : (
                      <>
                        <UserCog className="mr-2 h-4 w-4" /> Activate Account
                      </>
                    )}
                  </Button>
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
        
        {/* Add Customer Dialog */}
        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="e.g. Abebe Kebede"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  placeholder="e.g. example@yetumarket.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="e.g. +251912345678"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input
                  id="location"
                  value={newCustomer.location}
                  onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                  placeholder="e.g. Addis Ababa"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddCustomer}>Add Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </>
  );
};

export default CustomersManagement;
