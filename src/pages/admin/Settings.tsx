
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const generalSettingsSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  siteDescription: z.string().min(10, {
    message: "Site description must be at least 10 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  currency: z.string().min(1, {
    message: "Please select a currency.",
  }),
  language: z.string().min(1, {
    message: "Please select a language.",
  }),
});

const userSettingsSchema = z.object({
  allowRegistration: z.boolean(),
  verifyEmail: z.boolean(),
  autoApproveUsers: z.boolean(),
  loginAttempts: z.string().min(1),
  sessionTimeout: z.string().min(1),
  passwordMinLength: z.string().min(1),
});

const paymentSettingsSchema = z.object({
  paymentGateways: z.object({
    telebirr: z.boolean(),
    cbe: z.boolean(),
    paypal: z.boolean(),
    stripe: z.boolean(),
  }),
  allowCOD: z.boolean(),
  minOrderAmount: z.string(),
  processingFee: z.string(),
});

const notificationSettingsSchema = z.object({
  emailNotifications: z.object({
    newOrder: z.boolean(),
    orderStatus: z.boolean(),
    newUser: z.boolean(),
    newReview: z.boolean(),
    lowStock: z.boolean(),
  }),
  smsNotifications: z.object({
    newOrder: z.boolean(),
    orderStatus: z.boolean(),
  }),
});

const Settings = () => {
  const { toast } = useToast();
  
  const generalForm = useForm({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "YetuMarket",
      siteDescription: "Ethiopia's premier online marketplace for buying and selling products and services.",
      contactEmail: "info@yetumarket.com",
      phoneNumber: "+251 11 123 4567",
      address: "Bole Road, Addis Ababa, Ethiopia",
      currency: "ETB",
      language: "en",
    },
  });
  
  const userForm = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      allowRegistration: true,
      verifyEmail: true,
      autoApproveUsers: false,
      loginAttempts: "5",
      sessionTimeout: "60",
      passwordMinLength: "8",
    },
  });
  
  const paymentForm = useForm({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: {
      paymentGateways: {
        telebirr: true,
        cbe: true,
        paypal: false,
        stripe: false,
      },
      allowCOD: true,
      minOrderAmount: "500",
      processingFee: "2.5",
    },
  });
  
  const notificationForm = useForm({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: {
        newOrder: true,
        orderStatus: true,
        newUser: true,
        newReview: true,
        lowStock: true,
      },
      smsNotifications: {
        newOrder: false,
        orderStatus: false,
      },
    },
  });
  
  const onGeneralSubmit = (data) => {
    toast({
      title: "General settings saved",
      description: "Your general settings have been updated successfully.",
    });
    console.log(data);
  };
  
  const onUserSubmit = (data) => {
    toast({
      title: "User settings saved",
      description: "Your user settings have been updated successfully.",
    });
    console.log(data);
  };
  
  const onPaymentSubmit = (data) => {
    toast({
      title: "Payment settings saved",
      description: "Your payment settings have been updated successfully.",
    });
    console.log(data);
  };
  
  const onNotificationSubmit = (data) => {
    toast({
      title: "Notification settings saved",
      description: "Your notification settings have been updated successfully.",
    });
    console.log(data);
  };
  
  return (
    <>
      <AdminNavbar />
      <AdminLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your marketplace settings.</p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage basic settings for your marketplace.
                </CardDescription>
              </CardHeader>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)}>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={generalForm.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={generalForm.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Description</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={generalForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={generalForm.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Currency</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Language</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="am">Amharic</SelectItem>
                                <SelectItem value="om">Oromo</SelectItem>
                                <SelectItem value="ti">Tigrinya</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Settings</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>
                  Configure user registration and authentication settings.
                </CardDescription>
              </CardHeader>
              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onUserSubmit)}>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={userForm.control}
                        name="allowRegistration"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Allow User Registration
                              </FormLabel>
                              <FormDescription>
                                Enable or disable user registrations on the platform.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="verifyEmail"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Email Verification
                              </FormLabel>
                              <FormDescription>
                                Require email verification for new user registrations.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="autoApproveUsers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Auto-Approve Users
                              </FormLabel>
                              <FormDescription>
                                Automatically approve new user registrations.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={userForm.control}
                        name="loginAttempts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Login Attempts</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="1" />
                            </FormControl>
                            <FormDescription>
                              Number of failed attempts before account lockout.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout (minutes)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="5" />
                            </FormControl>
                            <FormDescription>
                              Time in minutes before user sessions expire.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="passwordMinLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Password Length</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="6" />
                            </FormControl>
                            <FormDescription>
                              Minimum required characters for passwords.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Settings</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure payment methods and options.
                </CardDescription>
              </CardHeader>
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Gateways</h3>
                      <div className="space-y-4">
                        <FormField
                          control={paymentForm.control}
                          name="paymentGateways.telebirr"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  TeleBirr
                                </FormLabel>
                                <FormDescription>
                                  Enable TeleBirr mobile payment
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={paymentForm.control}
                          name="paymentGateways.cbe"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Commercial Bank of Ethiopia
                                </FormLabel>
                                <FormDescription>
                                  Enable CBE bank transfers
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={paymentForm.control}
                          name="paymentGateways.paypal"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  PayPal
                                </FormLabel>
                                <FormDescription>
                                  Enable PayPal payments
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={paymentForm.control}
                          name="paymentGateways.stripe"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Stripe
                                </FormLabel>
                                <FormDescription>
                                  Enable Stripe card payments
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={paymentForm.control}
                      name="allowCOD"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Cash on Delivery
                            </FormLabel>
                            <FormDescription>
                              Allow cash on delivery payment option.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={paymentForm.control}
                        name="minOrderAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Order Amount (ETB)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" />
                            </FormControl>
                            <FormDescription>
                              Minimum amount required to place an order.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="processingFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Processing Fee (%)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="0" step="0.1" />
                            </FormControl>
                            <FormDescription>
                              Percentage fee charged for processing payments.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Settings</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure email and SMS notifications.
                </CardDescription>
              </CardHeader>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications.newOrder"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  New Orders
                                </FormLabel>
                                <FormDescription>
                                  Receive email notifications for new orders.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications.orderStatus"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Order Status Changes
                                </FormLabel>
                                <FormDescription>
                                  Receive email notifications when order status changes.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications.newUser"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  New User Registrations
                                </FormLabel>
                                <FormDescription>
                                  Receive email notifications for new user signups.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications.newReview"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  New Product Reviews
                                </FormLabel>
                                <FormDescription>
                                  Receive email notifications for new product reviews.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications.lowStock"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Low Stock Alerts
                                </FormLabel>
                                <FormDescription>
                                  Receive email notifications for low inventory items.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="smsNotifications.newOrder"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  New Orders
                                </FormLabel>
                                <FormDescription>
                                  Receive SMS notifications for new orders.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="smsNotifications.orderStatus"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Order Status Changes
                                </FormLabel>
                                <FormDescription>
                                  Receive SMS notifications when order status changes.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Settings</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </>
  );
};

export default Settings;
