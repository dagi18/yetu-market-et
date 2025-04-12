import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Tags, label: 'Categories', href: '/admin/categories' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: MessageSquare, label: 'Reviews', href: '/admin/reviews' },
  { icon: BarChart2, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface SideNavProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function SideNav({ isCollapsed, onToggle }: SideNavProps) {
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className={cn(
        "relative bg-white border-r border-gray-100 h-screen flex flex-col",
        isCollapsed ? "items-center" : "items-stretch"
      )}
    >
      <div className={cn(
        "p-6",
        isCollapsed ? "flex justify-center" : "flex justify-between items-center"
      )}>
        {!isCollapsed && (
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-green-600">Yetu</span>
              <span className="text-orange-500">Admin</span>
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "rounded-full hover:bg-gray-100",
            isCollapsed ? "rotate-180" : ""
          )}
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
      
      <nav className={cn(
        "flex-1 space-y-1 px-3",
        isCollapsed ? "w-full" : ""
      )}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "text-gray-600 hover:bg-gray-50",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={cn(
                "h-5 w-5 flex-shrink-0",
                isActive ? "text-white" : "text-gray-500"
              )} />
              {!isCollapsed && (
                <span className={cn(
                  "truncate",
                  isActive ? "text-white" : "text-gray-700"
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className={cn(
        "mt-auto p-4",
        isCollapsed ? "w-full" : ""
      )}>
        <Link
          to="/admin/logout"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200",
            isCollapsed ? "justify-center" : "justify-start"
          )}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && (
            <span className="truncate">Logout</span>
          )}
        </Link>
      </div>
    </motion.div>
  );
} 