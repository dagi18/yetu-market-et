
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Loader2, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";
import ProfileSidebar from "@/components/user/ProfileSidebar";
import ProfileForm from "@/components/user/ProfileForm";
import ProfileActivity from "@/components/user/ProfileActivity";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Profile state
  const [profile, setProfile] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    joinDate: "",
    avatar_url: "",
    notifications: {
      email: true,
      sms: false,
      deals: true
    }
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          navigate('/login');
          return;
        }
        
        // Get user profile from the database
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Format join date from created_at
          const joinDate = new Date(data.created_at || user.created_at);
          const formattedJoinDate = joinDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long'
          });
          
          setProfile({
            id: user.id,
            firstName: data.full_name ? data.full_name.split(' ')[0] : '',
            lastName: data.full_name ? data.full_name.split(' ')[1] || '' : '',
            email: user.email || '',
            phone: data.phone || '',
            address: data.address || '',
            bio: data.bio || '',
            joinDate: formattedJoinDate,
            avatar_url: data.avatar_url || '',
            notifications: {
              email: data.email_notifications || true,
              sms: data.sms_notifications || false,
              deals: data.deals_notifications || true
            }
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Could not load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, toast]);

  // Handle form field changes
  const handleFieldChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle handler for notifications
  const handleToggle = async (key: string) => {
    const updatedProfile = {
      ...profile,
      notifications: {
        ...profile.notifications,
        [key]: !profile.notifications[key as keyof typeof profile.notifications]
      }
    };
    
    setProfile(updatedProfile);
    
    // Update notifications in database
    try {
      const updates = {
        email_notifications: key === 'email' ? updatedProfile.notifications.email : profile.notifications.email,
        sms_notifications: key === 'sms' ? updatedProfile.notifications.sms : profile.notifications.sms,
        deals_notifications: key === 'deals' ? updatedProfile.notifications.deals : profile.notifications.deals,
      };
      
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', profile.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Notification settings updated",
      });
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast({
        title: "Error",
        description: "Could not update notification settings",
        variant: "destructive",
      });
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: `${profile.firstName} ${profile.lastName}`.trim(),
          phone: profile.phone,
          address: profile.address,
          bio: profile.bio,
        })
        .eq('id', profile.id);
      
      if (error) throw error;
      
      setEditMode(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Could not update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Sign out handler
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Could not sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex-grow flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-600" />
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
              <Card className="shadow-md border-0">
                <CardContent className="p-0">
                  <ProfileSidebar 
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    joinDate={profile.joinDate}
                    avatarUrl={profile.avatar_url}
                    onSignOut={handleSignOut}
                  />
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
                  <Card className="shadow-md border-0">
                    <CardContent className="p-6">
                      <ProfileForm 
                        firstName={profile.firstName}
                        lastName={profile.lastName}
                        email={profile.email}
                        phone={profile.phone}
                        address={profile.address}
                        bio={profile.bio}
                        joinDate={profile.joinDate}
                        editMode={editMode}
                        saving={saving}
                        onEdit={() => setEditMode(!editMode)}
                        onSubmit={handleSubmit}
                        onChange={handleFieldChange}
                      />
                    </CardContent>
                  </Card>
                  
                  <ProfileActivity />
                </TabsContent>
                
                <TabsContent value="security" className="mt-4">
                  <Card className="shadow-md border-0">
                    <CardContent className="p-6 space-y-6">
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
                  <Card className="shadow-md border-0">
                    <CardContent className="p-6 space-y-6">
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
                  <Card className="shadow-md border-0">
                    <CardContent className="p-6">
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
    </Layout>
  );
};

export default Profile;
