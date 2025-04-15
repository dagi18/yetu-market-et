
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Camera } from "lucide-react";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  joinDate: string;
  avatarUrl: string;
}

const ProfileHeader = ({ firstName, lastName, joinDate, avatarUrl }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="text-3xl font-bold bg-green-100 text-green-800">
            {firstName && firstName[0]}
            {lastName && lastName[0]}
          </AvatarFallback>
        </Avatar>
        <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      <h2 className="mt-4 text-xl font-semibold">
        {firstName} {lastName}
      </h2>
      
      <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
        Verified User
      </Badge>
      
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Member since {joinDate}</span>
      </div>
      
      <Button variant="outline" className="mt-4 w-full">
        <span className="mr-2">👁️</span>
        View Public Profile
      </Button>
    </div>
  );
};

export default ProfileHeader;
