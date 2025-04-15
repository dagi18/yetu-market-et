
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, CreditCard, Lock, Bell, LogOut } from "lucide-react";
import ProfileHeader from './ProfileHeader';

interface ProfileSidebarProps {
  firstName: string;
  lastName: string;
  joinDate: string;
  avatarUrl: string;
  onSignOut: () => void;
}

const ProfileSidebar = ({ firstName, lastName, joinDate, avatarUrl, onSignOut }: ProfileSidebarProps) => {
  return (
    <div className="p-6">
      <ProfileHeader 
        firstName={firstName}
        lastName={lastName}
        joinDate={joinDate}
        avatarUrl={avatarUrl}
      />
      
      <Separator className="my-6" />
      
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Profile Information
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <CreditCard className="mr-2 h-4 w-4" />
          Payment Methods
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Lock className="mr-2 h-4 w-4" />
          Security
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
        
        <Separator className="my-4" />
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
