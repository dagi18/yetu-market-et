
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  user: User | null;
  profile: { full_name: string; email: string; is_admin: boolean } | null;
  onSignOut: () => void;
  onMenuClick: () => void;
}

const AdminHeader = ({ user, profile, onSignOut, onMenuClick }: AdminHeaderProps) => {
  const notificationCount = 3; // Replace with actual notification count

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/admin/dashboard" className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-green-600">Yetu</span>
              <span className="text-orange-500">Admin</span>
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <div className="p-3 hover:bg-gray-50">
                  <p className="font-medium">New product listed</p>
                  <p className="text-sm text-gray-500">A new iPhone 13 Pro has been listed</p>
                  <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-3 hover:bg-gray-50">
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-gray-500">Abebe Kebede has joined YetuMarket</p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-3 hover:bg-gray-50">
                  <p className="font-medium">System update</p>
                  <p className="text-sm text-gray-500">YetuMarket v2.1 has been deployed</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 flex justify-center">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-brand-green text-white">
                    {profile?.full_name?.[0].toUpperCase() || user?.email?.[0].toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{profile?.full_name || user?.email?.split('@')[0]}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
