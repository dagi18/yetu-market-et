
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'user' | 'admin';
}

const AuthGuard = ({ children, requiredRole = 'user' }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      // Check for admin authentication if admin role is required
      if (requiredRole === 'admin') {
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth) {
          try {
            const parsedAuth = JSON.parse(adminAuth);
            if (parsedAuth.isAdmin) {
              setIsAuthenticated(true);
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.error('Error parsing admin auth data:', error);
          }
        }
        
        // If not authenticated as admin, redirect to admin login
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/admin/login', { state: { from: location } });
      } 
      // Check for user authentication if user role is required
      else {
        const userAuth = localStorage.getItem('userAuth');
        if (userAuth) {
          try {
            const parsedAuth = JSON.parse(userAuth);
            if (parsedAuth.isAuth) {
              setIsAuthenticated(true);
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.error('Error parsing user auth data:', error);
          }
        }
        
        // If not authenticated as user, redirect to regular login
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login', { state: { from: location } });
      }
    };

    checkAuth();
  }, [navigate, location, requiredRole]);

  if (isLoading) {
    // You could replace this with a proper loading component
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
