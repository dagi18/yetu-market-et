
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be where you implement actual authentication
    toast({
      title: "Login Successful!",
      description: "Welcome back to YetuMarket.",
    });
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be where you implement actual registration
    toast({
      title: "Registration Successful!",
      description: "Welcome to YetuMarket. You can now start buying and selling.",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="p-6 shadow-md">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email or Phone
                      </label>
                      <Input
                        id="email"
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email or phone"
                        required
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label 
                          htmlFor="password" 
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <Link 
                          to="/forgot-password" 
                          className="text-sm text-brand-green hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button type="button" className="text-brand-green hover:underline">
                          Register
                        </button>
                      </p>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label 
                        htmlFor="fullName" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="registerEmail" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <Input
                        id="registerEmail"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="phone" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="E.g. 0911234567"
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="registerPassword" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Password
                      </label>
                      <Input
                        id="registerPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Register
                    </Button>
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500">
                        By registering, you agree to YetuMarket's{" "}
                        <Link to="/terms" className="text-brand-green hover:underline">Terms of Service</Link>
                        {" "}and{" "}
                        <Link to="/privacy" className="text-brand-green hover:underline">Privacy Policy</Link>
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
