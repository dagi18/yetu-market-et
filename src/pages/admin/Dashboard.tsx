import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Package, ShoppingCart, TrendingUp, 
  ArrowUpRight, ArrowDownRight, DollarSign,
  Box, UserCheck, ShoppingBag, Activity
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ full_name: string; email: string; is_admin: boolean } | null>(null);
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);
  const [stats, setStats] = useState({
    revenue: { value: 1245300, change: 12.5 },
    products: { value: 2584, change: 5.3 },
    orders: { value: 1684, change: -2.4 },
    users: { value: 15243, change: 8.7 }
  });
  const [recentProducts, setRecentProducts] = useState([
    {
      name: "iPhone 13 Pro Max - 256GB",
      category: "Electronics",
      price: "120,000 ETB",
      status: "Active"
    },
    {
      name: "Samsung Galaxy S23 Ultra - 512GB",
      category: "Electronics",
      price: "145,000 ETB",
      status: "Active"
    },
    {
      name: "Toyota Corolla 2018 Silver",
      category: "Vehicles",
      price: "2,500,000 ETB",
      status: "Pending"
    },
    {
      name: "3 Bedroom Apartment for Rent",
      category: "Property",
      price: "35,000 ETB",
      status: "Active"
    },
    {
      name: "Sony PlayStation 5 Digital Edition",
      category: "Electronics",
      price: "85,000 ETB",
      status: "Sold"
    }
  ]);
  const [recentOrders, setRecentOrders] = useState([
    {
      orderId: "ORD-2023-10-1254",
      customer: "Abebe Kebede",
      amount: "120,000 ETB",
      status: "Completed"
    },
    {
      orderId: "ORD-2023-10-1253",
      customer: "Sara Haile",
      amount: "145,000 ETB",
      status: "Processing"
    },
    {
      orderId: "ORD-2023-10-1252",
      customer: "Dawit Solomon",
      amount: "85,000 ETB",
      status: "Pending"
    },
    {
      orderId: "ORD-2023-10-1251",
      customer: "Tigist Bekele",
      amount: "160,000 ETB",
      status: "Completed"
    },
    {
      orderId: "ORD-2023-10-1250",
      customer: "Yonas Tadesse",
      amount: "85,000 ETB",
      status: "Completed"
    }
  ]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('full_name, email, is_admin')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (!userProfile?.is_admin) {
          navigate('/');
          return;
        }

        setProfile(userProfile);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900"
            >
              Dashboard
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 mt-1"
            >
              Welcome back, {profile?.full_name}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Select defaultValue="today">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Revenue Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-full">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">ETB {stats.revenue.value.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">{stats.revenue.change}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Box className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.products.value.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm font-medium text-blue-600">{stats.products.change}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Orders Card */}
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <div className="p-2 bg-orange-500/10 rounded-full">
                <ShoppingBag className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.orders.value.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm font-medium text-red-600">{Math.abs(stats.orders.change)}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-full">
                <UserCheck className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.users.value.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-sm font-medium text-purple-600">{stats.users.change}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Revenue Overview</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Monthly revenue statistics</p>
                </div>
                <Select defaultValue="last30">
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="last60">Last 60 Days</SelectItem>
                    <SelectItem value="last90">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg">
                <Activity className="h-12 w-12 text-gray-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">User Activity</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">User engagement metrics</p>
                </div>
                <Select defaultValue="last30">
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="last60">Last 60 Days</SelectItem>
                    <SelectItem value="last90">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg">
                <Activity className="h-12 w-12 text-gray-300" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tables Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Recent Products</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Latest product listings</p>
                </div>
                <Button variant="outline" size="sm" className="bg-white">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Price</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProducts.map((product, index) => (
                      <TableRow key={index} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "px-2 py-1 rounded-full font-medium",
                            getStatusBadgeVariant(product.status)
                          )}>
                            {product.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Recent Orders</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Latest transactions</p>
                </div>
                <Button variant="outline" size="sm" className="bg-white">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold">Order ID</TableHead>
                      <TableHead className="font-semibold">Customer</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order, index) => (
                      <TableRow key={index} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "px-2 py-1 rounded-full font-medium",
                            getStatusBadgeVariant(order.status)
                          )}>
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
