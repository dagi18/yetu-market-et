
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserData {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuth: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  adminLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for authenticated session on load
  useEffect(() => {
    const checkAuthSession = async () => {
      // Get session from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get user profile
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single();

        if (userProfile) {
          const userData = {
            name: userProfile.full_name || 'User',
            email: session.user.email || '',
            role: userProfile.role || 'user',
          };
          
          setUser(userData);
          setIsAuth(true);
          
          // Check if user is admin
          if (userData.role === 'admin') {
            setIsAdmin(true);
          }
        }
      }
    };

    checkAuthSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile
          const { data: userProfile } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .single();

          if (userProfile) {
            const userData = {
              name: userProfile.full_name || 'User',
              email: session.user.email || '',
              role: userProfile.role || 'user',
            };
            
            setUser(userData);
            setIsAuth(true);
            
            // Check if user is admin
            if (userData.role === 'admin') {
              setIsAdmin(true);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuth(false);
          setIsAdmin(false);
        }
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data.user) {
        // Get user profile
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('email', data.user.email)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
        }

        const userData = {
          name: userProfile?.full_name || 'User',
          email: data.user.email || '',
          role: userProfile?.role || 'user',
        };
        
        setUser(userData);
        setIsAuth(true);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${userData.name}!`,
        });
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Admin Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data.user) {
        // Get user profile
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('email', data.user.email)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          toast({
            title: "Admin Login Failed",
            description: "Could not verify admin privileges",
            variant: "destructive",
          });
          return false;
        }

        // Check if user has admin role
        if (userProfile?.role !== 'admin') {
          toast({
            title: "Admin Login Failed",
            description: "You do not have admin privileges",
            variant: "destructive",
          });
          
          // Sign out as they don't have admin privileges
          await supabase.auth.signOut();
          return false;
        }

        const adminData = {
          name: userProfile.full_name || 'Admin User',
          email: data.user.email || '',
          role: 'admin',
        };
        
        setUser(adminData);
        setIsAuth(true);
        setIsAdmin(true);
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin panel!",
        });
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during admin login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Logout Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    setUser(null);
    setIsAuth(false);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    
    navigate('/');
  };

  const adminLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Logout Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    setUser(null);
    setIsAuth(false);
    setIsAdmin(false);
    
    toast({
      title: "Admin Logged Out",
      description: "You have been successfully logged out of the admin panel",
    });
    
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuth, 
      isAdmin,
      login, 
      adminLogin, 
      logout,
      adminLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
