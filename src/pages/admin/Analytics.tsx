
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  CircleDollarSign, 
  Download, 
  ShoppingBag, 
  Users 
} from "lucide-react";

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 24000 },
  { name: 'Feb', sales: 31000 },
  { name: 'Mar', sales: 27000 },
  { name: 'Apr', sales: 36000 },
  { name: 'May', sales: 29000 },
  { name: 'Jun', sales: 48000 },
  { name: 'Jul', sales: 52000 },
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 25 },
  { name: 'Home & Garden', value: 15 },
  { name: 'Vehicles', value: 10 },
  { name: 'Others', value: 15 },
];

const userActivityData = [
  { name: 'Jan', new: 120, returning: 80 },
  { name: 'Feb', new: 140, returning: 90 },
  { name: 'Mar', new: 170, returning: 110 },
  { name: 'Apr', new: 190, returning: 150 },
  { name: 'May', new: 210, returning: 170 },
  { name: 'Jun', new: 250, returning: 200 },
  { name: 'Jul', new: 280, returning: 240 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  
  // Summary data
  const summaryData = {
    totalRevenue: {
      value: 267500,
      change: 12.5,
      isPositive: true
    },
    totalOrders: {
      value: 843,
      change: 8.2,
      isPositive: true
    },
    totalCustomers: {
      value: 1254,
      change: 15.3,
      isPositive: true
    },
    averageOrderValue: {
      value: 3171,
      change: 2.4,
      isPositive: false
    }
  };
  
  return (
    <>
      <AdminNavbar />
      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="365d">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CircleDollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold">{summaryData.totalRevenue.value.toLocaleString()} ETB</h3>
                  </div>
                </div>
                <div className={`flex items-center text-sm ${
                  summaryData.totalRevenue.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {summaryData.totalRevenue.isPositive ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {summaryData.totalRevenue.change}%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold">{summaryData.totalOrders.value.toLocaleString()}</h3>
                  </div>
                </div>
                <div className={`flex items-center text-sm ${
                  summaryData.totalOrders.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {summaryData.totalOrders.isPositive ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {summaryData.totalOrders.change}%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Customers</p>
                    <h3 className="text-2xl font-bold">{summaryData.totalCustomers.value.toLocaleString()}</h3>
                  </div>
                </div>
                <div className={`flex items-center text-sm ${
                  summaryData.totalCustomers.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {summaryData.totalCustomers.isPositive ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {summaryData.totalCustomers.change}%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                    <h3 className="text-2xl font-bold">{summaryData.averageOrderValue.value.toLocaleString()} ETB</h3>
                  </div>
                </div>
                <div className={`flex items-center text-sm ${
                  summaryData.averageOrderValue.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {summaryData.averageOrderValue.isPositive ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {summaryData.averageOrderValue.change}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="sales">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="sales">Sales Trends</TabsTrigger>
            <TabsTrigger value="categories">Category Performance</TabsTrigger>
            <TabsTrigger value="users">User Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()} ETB`} />
                      <Legend />
                      <Bar dataKey="sales" fill="#4ade80" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={userActivityData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="new" stroke="#8884d8" name="New Users" />
                      <Line type="monotone" dataKey="returning" stroke="#82ca9d" name="Returning Users" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </>
  );
};

export default Analytics;
