
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    // Check for user authentication
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      try {
        const parsedAuth = JSON.parse(userAuth);
        if (parsedAuth.isAuth) {
          setUser(parsedAuth.user);
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Error parsing user auth data:', error);
      }
    }

    // Check for admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      try {
        const parsedAuth = JSON.parse(adminAuth);
        if (parsedAuth.isAdmin) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error parsing admin auth data:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo, hardcoded credentials
      if (email === 'user@yetumarket.com' && password === 'userpass') {
        const userData = {
          name: 'Demo User',
          email: email,
          role: 'user',
        };
        
        setUser(userData);
        setIsAuth(true);
        
        // Save to localStorage
        localStorage.setItem('userAuth', JSON.stringify({
          isAuth: true,
          user: userData
        }));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${userData.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo, hardcoded admin credentials
      if (email === 'admin@yetumarket.com' && password === 'adminpass') {
        const adminData = {
          name: 'Admin User',
          email: email,
          role: 'administrator',
        };
        
        setIsAdmin(true);
        
        // Save to localStorage
        localStorage.setItem('adminAuth', JSON.stringify({
          isAdmin: true,
          user: adminData
        }));
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin panel!",
        });
        
        return true;
      } else {
        toast({
          title: "Admin Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during admin login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem('userAuth');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminAuth');
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
