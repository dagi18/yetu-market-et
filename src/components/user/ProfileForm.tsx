
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Phone, MapPin, Edit } from "lucide-react";

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  joinDate: string;
  editMode: boolean;
  saving: boolean;
  onEdit: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
}

const ProfileForm = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  bio,
  joinDate,
  editMode,
  saving,
  onEdit,
  onSubmit,
  onChange,
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-row items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <p className="text-sm text-gray-500">Manage your personal information</p>
        </div>
        <Button 
          variant={editMode ? "outline" : "secondary"}
          onClick={onEdit}
          disabled={saving}
          type="button"
        >
          {editMode ? "Cancel" : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {editMode ? (
          // Edit Mode
          <>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500">Contact support to change your email address</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => onChange('phone', e.target.value)}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={address}
                onChange={(e) => onChange('address', e.target.value)}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                rows={4}
                value={bio}
                onChange={(e) => onChange('bio', e.target.value)}
              />
            </div>
          </>
        ) : (
          // View Mode
          <>
            <div className="space-y-4 md:col-span-2">
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="md:w-1/2 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1">{firstName} {lastName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      {email}
                    </p>
                  </div>
                
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                      {phone || "Not provided"}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:w-1/2 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="mt-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {address || "Not provided"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p className="mt-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {joinDate}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                <p className="mt-1">{bio || "No bio provided"}</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {editMode && (
        <div className="mt-6 flex justify-end">
          <Button 
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700"
          >
            {saving && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
