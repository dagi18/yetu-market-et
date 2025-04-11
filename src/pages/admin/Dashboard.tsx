
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, DollarSign, Package, ShoppingCart, Users, Edit, BarChart3, Activity, TrendingUp, TrendingDown } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

// Mock data for dashboard stats
const DASHBOARD_STATS = [
  {
    title: "Total Revenue",
    value: "1,245,300",
    unit: "ETB",
    change: 12.5,
    timeframe: "from last month",
    icon: <DollarSign className="w-6 h-6" />,
    color: "text-emerald-600 bg-emerald-100"
  },
  {
    title: "Products",
    value: "2,584",
    change: 5.3,
    timeframe: "from last month",
    icon: <Package className="w-6 h-6" />,
    color: "text-blue-600 bg-blue-100"
  },
  {
    title: "Orders",
    value: "1,684",
    change: -2.4,
    timeframe: "from last month", 
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "text-amber-600 bg-amber-100"
  },
  {
    title: "Users",
    value: "15,243",
    change: 8.7,
    timeframe: "from last month",
    icon: <Users className="w-6 h-6" />,
    color: "text-purple-600 bg-purple-100"
  }
];

// Mock data for recent products
const RECENT_PRODUCTS = [
  {
    id: "P001",
    name: "iPhone 13 Pro Max - 256GB",
    category: "Electronics",
    price: 120000,
    status: "active",
    createdAt: "2023-10-15"
  },
  {
    id: "P002",
    name: "Samsung Galaxy S23 Ultra - 512GB",
    category: "Electronics",
    price: 145000,
    status: "active",
    createdAt: "2023-10-14"
  },
  {
    id: "P003",
    name: "Toyota Corolla 2018 Silver",
    category: "Vehicles",
    price: 2500000,
    status: "pending",
    createdAt: "2023-10-14"
  },
  {
    id: "P004",
    name: "3 Bedroom Apartment for Rent",
    category: "Property",
    price: 35000,
    status: "active",
    createdAt: "2023-10-13"
  },
  {
    id: "P005",
    name: "Sony PlayStation 5 Digital Edition",
    category: "Electronics",
    price: 85000,
    status: "sold",
    createdAt: "2023-10-12"
  }
];

// Mock data for recent orders
const RECENT_ORDERS = [
  {
    id: "ORD-2023-10-1254",
    customer: "Abebe Kebede",
    product: "iPhone 13 Pro Max",
    date: "2023-10-15",
    amount: 120000,
    status: "completed"
  },
  {
    id: "ORD-2023-10-1253",
    customer: "Sara Haile",
    product: "Samsung Galaxy S23 Ultra",
    date: "2023-10-14",
    amount: 145000,
    status: "processing"
  },
  {
    id: "ORD-2023-10-1252",
    customer: "Dawit Solomon",
    product: "Sony PlayStation 5",
    date: "2023-10-14",
    amount: 85000,
    status: "pending"
  },
  {
    id: "ORD-2023-10-1251",
    customer: "Tigist Bekele",
    product: "MacBook Pro M2",
    date: "2023-10-13",
    amount: 160000,
    status: "completed"
  },
  {
    id: "ORD-2023-10-1250",
    customer: "Yonas Tadesse",
    product: "Samsung 55\" 4K Smart TV",
    date: "2023-10-12",
    amount: 85000,
    status: "completed"
  }
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Overview of your marketplace.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DASHBOARD_STATS.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <div className="flex items-baseline mt-1">
                    {stat.unit && <span className="text-sm text-gray-500 mr-1">{stat.unit}</span>}
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-md ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                {stat.change > 0 ? (
                  <div className="flex items-center text-emerald-600">
                    <ChevronUp className="h-4 w-4 mr-1" />
                    <span>{stat.change}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    <span>{Math.abs(stat.change)}%</span>
                  </div>
                )}
                <span className="ml-2 text-gray-500">{stat.timeframe}</span>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Revenue Overview</h3>
              <Select 
                options={[
                  { label: "Last 7 Days", value: "7d" },
                  { label: "Last 30 Days", value: "30d" },
                  { label: "Last 3 Months", value: "3m" },
                  { label: "Last Year", value: "1y" }
                ]} 
                value="30d"
              />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-2">Revenue chart will be displayed here</p>
                <p className="text-sm">Based on actual sales data</p>
              </div>
            </div>
          </Card>
          
          {/* Activity Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">User Activity</h3>
              <Select 
                options={[
                  { label: "Last 7 Days", value: "7d" },
                  { label: "Last 30 Days", value: "30d" },
                  { label: "Last 3 Months", value: "3m" },
                  { label: "Last Year", value: "1y" }
                ]} 
                value="30d"
              />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="text-center text-gray-500">
                <Activity className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-2">User activity chart will be displayed here</p>
                <p className="text-sm">Based on logins and interactions</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Recent Products and Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Recent Products</h3>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/products">View All</Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pl-0 font-medium">Name</th>
                    <th className="text-left py-3 font-medium">Category</th>
                    <th className="text-left py-3 font-medium">Price</th>
                    <th className="text-right py-3 pr-0 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_PRODUCTS.map((product) => (
                    <tr key={product.id} className="border-b border-gray-200 last:border-0">
                      <td className="py-3 pl-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate max-w-[200px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3">{product.category}</td>
                      <td className="py-3">{product.price.toLocaleString()} ETB</td>
                      <td className="py-3 pr-0 text-right">
                        <StatusBadge status={product.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Recent Orders</h3>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/orders">View All</Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pl-0 font-medium">Order ID</th>
                    <th className="text-left py-3 font-medium">Customer</th>
                    <th className="text-left py-3 font-medium">Amount</th>
                    <th className="text-right py-3 pr-0 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 last:border-0">
                      <td className="py-3 pl-0">
                        <span className="font-medium">{order.id}</span>
                      </td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.amount.toLocaleString()} ETB</td>
                      <td className="py-3 pr-0 text-right">
                        <OrderStatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

// Helper components for the dashboard
const Select = ({ options, value }: { options: { label: string; value: string }[], value: string }) => {
  return (
    <select className="text-sm border rounded p-1" defaultValue={value}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
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

const OrderStatusBadge = ({ status }: { status: string }) => {
  const getBadgeStyles = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
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

export default AdminDashboard;
