
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/components/auth/useAuth';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Register with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) {
        toast({
          title: "Registration Failed",
          description: authError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      if (authData.user) {
        // Add user details to users table
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              user_id: authData.user.id,
              email: email,
              full_name: fullName,
              phone_number: phone,
            },
          ]);
          
        if (profileError) {
          toast({
            title: "Registration Issue",
            description: "Account created but failed to save profile details",
            variant: "destructive",
          });
          console.error('Error saving profile:', profileError);
        } else {
          toast({
            title: "Registration Successful!",
            description: "Welcome to YetuMarket. You can now start buying and selling.",
          });
          
          // Redirect to homepage after a short delay
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={isLoading}
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
                        disabled={isLoading}
                      />
                      
                      {/* Demo credentials */}
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Demo user: user@yetumarket.com / userpass</p>
                        <p>Demo admin: admin@yetumarket.com / adminpass</p>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        placeholder="Create a password (min 6 characters)"
                        minLength={6}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        "Register"
                      )}
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
