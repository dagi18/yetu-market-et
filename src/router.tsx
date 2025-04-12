
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import SellProduct from '@/pages/SellProduct';
import Category from '@/pages/Category';
import NotFound from '@/pages/NotFound';

// Protected Route Wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

// Auth Route Wrapper (for login/register pages)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Products /></Layout>,
  },
  {
    path: '/products',
    element: <Layout><Products /></Layout>,
  },
  {
    path: '/products/:id',
    element: <Layout><ProductDetail /></Layout>,
  },
  {
    path: '/categories/:id',
    element: <Layout><Category /></Layout>,
  },
  {
    path: '/sell',
    element: (
      <ProtectedRoute>
        <Layout><SellProduct /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <LoginForm />
      </AuthRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthRoute>
        <RegisterForm />
      </AuthRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <AuthRoute>
        <ForgotPasswordForm />
      </AuthRoute>
    ),
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
]);
