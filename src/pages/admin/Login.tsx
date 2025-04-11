
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, User, LogIn } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Sample admin credentials for demo
    if (email === "admin@yetumarket.com" && password === "adminpass") {
      toast({
        title: "Login Successful",
        description: "Welcome to YetuMarket Admin Panel",
      });
      
      // Save admin session information to localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        isAdmin: true,
        user: {
          name: 'Admin User',
          email: email,
          role: 'administrator'
        }
      }));
      
      // Redirect to admin dashboard
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block text-2xl font-bold text-brand-green mb-4">
              Yetu<span className="text-brand-orange">Market</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Admin Login
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in to access the administrator panel
            </p>
          </div>
          
          <Card className="px-8 py-10 shadow-xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900">
                  Email address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Demo: admin@yetumarket.com
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-900">
                    Password
                  </Label>
                  <Link to="/admin/forgot-password" className="text-sm text-brand-green hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Demo: adminpass
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign in
                  </span>
                )}
              </Button>
            </form>
          </Card>
          
          <div className="mt-6 text-center text-sm">
            <Link to="/" className="text-brand-green hover:underline">
              ← Return to YetuMarket Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
