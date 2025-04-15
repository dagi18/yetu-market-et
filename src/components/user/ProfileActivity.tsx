
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, ShoppingCart, User } from "lucide-react";

const ProfileActivity = () => {
  return (
    <Card className="mt-6 shadow-md border-0">
      <CardHeader>
        <CardTitle>Account Activity</CardTitle>
        <CardDescription>Recent actions and purchases</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Updated payment method</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full text-green-600 mr-3">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Purchased iPhone 13 Pro Max</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-3">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Updated profile information</p>
              <p className="text-sm text-gray-500">1 week ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileActivity;
