
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/useAuth";
import { 
  BarChart3, 
  Box, 
  ChevronDown, 
  ClipboardList, 
  CreditCard, 
  Home, 
  LayoutGrid, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Package, 
  PieChart, 
  Settings, 
  ShoppingBag, 
  ShoppingCart, 
  Tags, 
  User, 
  Users, 
  X 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout } = useAuth();
  const { toast } = useToast();
  
  // Navigation items for the sidebar
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: <Home className="h-5 w-5" /> },
    { name: "Products", href: "/admin/products", icon: <Package className="h-5 w-5" /> },
    { name: "Categories", href: "/admin/categories", icon: <Tags className="h-5 w-5" /> },
    { name: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" /> },
    { name: "Customers", href: "/admin/customers", icon: <Users className="h-5 w-5" /> },
    { name: "Reviews", href: "/admin/reviews", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  // Check if the current path matches a navigation item
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    adminLogout();
    setSidebarOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        )}
        
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
            <Link to="/admin" className="text-2xl font-bold text-brand-green">
              Yetu<span className="text-brand-orange">Admin</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-2 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-brand-green text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="border-t border-gray-200 p-4">
            <Button
              onClick={handleLogout}
              className="flex w-full items-center px-2 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:w-64">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <Link to="/admin" className="text-2xl font-bold text-brand-green">
              Yetu<span className="text-brand-orange">Admin</span>
            </Link>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-brand-green text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="border-t border-gray-200 p-4">
            <Button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Link to="/admin" className="text-2xl font-bold text-brand-green">
              Yetu<span className="text-brand-orange">Admin</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Page content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
