
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  User, Mail, Phone, MapPin, Shield, Bell, Lock, Globe, 
  Camera, Briefcase, Calendar, Edit, CreditCard, LogOut 
} from "lucide-react";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  // Sample user profile data
  const [profile, setProfile] = useState({
    firstName: "Abebe",
    lastName: "Kebede",
    email: "abebe.kebede@example.com",
    phone: "+251 91 234 5678",
    address: "Bole, Addis Ababa",
    bio: "I'm a tech enthusiast and avid collector of vintage electronics. Always looking for unique items on YetuMarket!",
    joinDate: "January 2022",
    avatar: "", // Placeholder for profile image
    notifications: {
      email: true,
      sms: false,
      deals: true
    }
  });

  // Toggle handler for notifications
  const handleToggle = (key: string) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    // Here you would typically save the profile data to the backend
  };

  return (
    <div className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <nav className="flex items-center space-x-1">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Profile</span>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-3xl font-bold bg-green-100 text-green-800">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="mt-4 text-xl font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  
                  <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
                    Verified Buyer
                  </Badge>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Member since {profile.joinDate}</span>
                  </div>
                  
                  <Button variant="outline" className="mt-4 w-full">
                    <User className="mr-2 h-4 w-4" />
                    View Public Profile
                  </Button>
                </div>
                
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
                  
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button 
                      variant={editMode ? "outline" : "secondary"}
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? "Cancel" : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {editMode ? (
                          // Edit Mode
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input 
                                id="firstName" 
                                value={profile.firstName}
                                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input 
                                id="lastName" 
                                value={profile.lastName}
                                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                value={profile.email}
                                onChange={(e) => setProfile({...profile, email: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                value={profile.phone}
                                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="address">Address</Label>
                              <Input 
                                id="address" 
                                value={profile.address}
                                onChange={(e) => setProfile({...profile, address: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea 
                                id="bio" 
                                rows={4}
                                value={profile.bio}
                                onChange={(e) => setProfile({...profile, bio: e.target.value})}
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
                                    <p className="mt-1">{profile.firstName} {profile.lastName}</p>
                                  </div>
                                  
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                    <p className="mt-1 flex items-center">
                                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                      {profile.email}
                                    </p>
                                  </div>
                                
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                    <p className="mt-1 flex items-center">
                                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                      {profile.phone}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0 md:w-1/2 space-y-4">
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                                    <p className="mt-1 flex items-center">
                                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                      {profile.address}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                                    <p className="mt-1 flex items-center">
                                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                      {profile.joinDate}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="pt-4">
                                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                                <p className="mt-1">{profile.bio}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {editMode && (
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
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
              </TabsContent>
              
              <TabsContent value="security" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and password</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Add an extra layer of security to your account</p>
                          <p className="text-sm text-gray-500">Currently disabled</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-red-600 mb-3">Danger Zone</h3>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your app experience</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Language</h3>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <select className="border border-gray-300 rounded-md px-3 py-1">
                          <option value="en">English</option>
                          <option value="am">Amharic</option>
                          <option value="or">Oromo</option>
                          <option value="ti">Tigrinya</option>
                        </select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Currency</h3>
                      <div className="space-x-2">
                        <select className="border border-gray-300 rounded-md px-3 py-1">
                          <option value="etb">Ethiopian Birr (ETB)</option>
                          <option value="usd">US Dollar (USD)</option>
                          <option value="eur">Euro (EUR)</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch 
                          checked={profile.notifications.email}
                          onCheckedChange={() => handleToggle('email')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                        <Switch 
                          checked={profile.notifications.sms}
                          onCheckedChange={() => handleToggle('sms')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Deals & Promotions</h3>
                          <p className="text-sm text-gray-500">Receive information about deals and promotions</p>
                        </div>
                        <Switch 
                          checked={profile.notifications.deals}
                          onCheckedChange={() => handleToggle('deals')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
