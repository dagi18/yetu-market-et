
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', sales: 4000, visits: 2400, orders: 140 },
  { name: 'Feb', sales: 3000, visits: 1398, orders: 120 },
  { name: 'Mar', sales: 2000, visits: 9800, orders: 160 },
  { name: 'Apr', sales: 2780, visits: 3908, orders: 180 },
  { name: 'May', sales: 1890, visits: 4800, orders: 160 },
  { name: 'Jun', sales: 2390, visits: 3800, orders: 175 },
  { name: 'Jul', sales: 3490, visits: 4300, orders: 200 },
  { name: 'Aug', sales: 2000, visits: 2400, orders: 120 },
  { name: 'Sep', sales: 2780, visits: 3908, orders: 190 },
  { name: 'Oct', sales: 1890, visits: 4800, orders: 220 },
  { name: 'Nov', sales: 2390, visits: 3800, orders: 210 },
  { name: 'Dec', sales: 3490, visits: 4300, orders: 250 }
];

const categoryData = [
  { name: 'Electronics', value: 30 },
  { name: 'Fashion', value: 25 },
  { name: 'Home', value: 15 },
  { name: 'Vehicles', value: 20 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Charts = () => {
  const [period, setPeriod] = useState('monthly');

  return (
    <div className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <nav className="flex items-center space-x-1">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Market Charts</span>
          </nav>
        </div>
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Market Analytics</h1>
          <p className="text-gray-600">
            Visualized market trends and performance metrics to help you make informed decisions.
          </p>
        </div>
        
        {/* Time Period Selector */}
        <div className="mb-6">
          <Tabs defaultValue="monthly" onValueChange={(value) => setPeriod(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>Total sales over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#22c55e" fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Visitor Traffic */}
          <Card>
            <CardHeader>
              <CardTitle>Visitor Traffic</CardTitle>
              <CardDescription>Website visits analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Orders by Month */}
          <Card>
            <CardHeader>
              <CardTitle>Orders by Month</CardTitle>
              <CardDescription>Monthly order distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Products by category</CardDescription>
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
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Charts;
