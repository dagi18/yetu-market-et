
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Bell, Settings, User, LogOut, ChevronDown } from "lucide-react";

const AdminNavbar = () => {
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the admin authentication
    localStorage.removeItem('adminAuth');
    
    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from the admin panel",
    });
    
    // Redirect to the admin login page
    navigate('/admin/login');
  };

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
      <div className="flex flex-1 items-center gap-4">
        <Link to="/admin" className="flex items-center">
          <span className="text-xl font-bold text-brand-green">Yetu<span className="text-brand-orange">Admin</span></span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Notifications dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-medium text-white">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="font-semibold">Notifications</span>
              <Button variant="ghost" size="sm" onClick={() => setNotifications(0)}>
                Mark all as read
              </Button>
            </div>
            <div className="max-h-96 overflow-auto">
              <div className="p-4 border-b">
                <p className="font-medium">New Product Listed</p>
                <p className="text-sm text-gray-500">A new iPhone 13 has been listed for 85,000 ETB</p>
                <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
              </div>
              <div className="p-4 border-b">
                <p className="font-medium">New User Registration</p>
                <p className="text-sm text-gray-500">Solomon Tekle has joined YetuMarket</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
              <div className="p-4 border-b">
                <p className="font-medium">Order Fulfilled</p>
                <p className="text-sm text-gray-500">Order #2458 has been successfully delivered</p>
                <p className="text-xs text-gray-400 mt-1">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-2">
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User account dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-brand-green text-white">AD</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/admin/profile">
                <User className="mr-2 h-4 w-4" /> My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/settings">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AdminNavbar;
