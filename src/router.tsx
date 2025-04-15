
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
import FAQ from '@/pages/FAQ';
import Charts from '@/pages/Charts';
import Orders from '@/pages/Orders';
import Wishlist from '@/pages/Wishlist';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import Fashion from '@/pages/categories/Fashion';
import Home from '@/pages/categories/Home';
import Jobs from '@/pages/categories/Jobs';
import Services from '@/pages/categories/Services';
import Others from '@/pages/categories/Others';

// Admin pages
import Dashboard from '@/pages/admin/Dashboard';
import ProductsManagement from '@/pages/admin/ProductsManagement';
import CategoriesManagement from '@/pages/admin/CategoriesManagement';
import OrdersManagement from '@/pages/admin/OrdersManagement';
import CustomersManagement from '@/pages/admin/CustomersManagement';
import ReviewsManagement from '@/pages/admin/ReviewsManagement';
import Analytics from '@/pages/admin/Analytics';
import Settings from '@/pages/admin/Settings';
import AdminLogin from '@/pages/admin/Login';

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
    path: '/product/:id',
    element: <Layout><ProductDetail /></Layout>,
  },
  {
    path: '/category/:id',
    element: <Layout><Category /></Layout>,
  },
  {
    path: '/category/:id/:subcategoryId',
    element: <Layout><Category /></Layout>,
  },
  {
    path: '/pages/categories/Fashion',
    element: <Layout><Fashion /></Layout>,
  },
  {
    path: '/pages/categories/Home',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/pages/categories/Jobs',
    element: <Layout><Jobs /></Layout>,
  },
  {
    path: '/pages/categories/Services',
    element: <Layout><Services /></Layout>,
  },
  {
    path: '/pages/categories/Others',
    element: <Layout><Others /></Layout>,
  },
  {
    path: '/faq',
    element: <Layout><FAQ /></Layout>,
  },
  {
    path: '/charts',
    element: <Layout><Charts /></Layout>,
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <Layout><Orders /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/wishlist',
    element: (
      <ProtectedRoute>
        <Layout><Wishlist /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Layout><Profile /></Layout>
      </ProtectedRoute>
    ),
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
  // Admin Routes
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/products',
    element: <ProductsManagement />,
  },
  {
    path: '/admin/categories',
    element: <CategoriesManagement />,
  },
  {
    path: '/admin/orders',
    element: <OrdersManagement />,
  },
  {
    path: '/admin/customers',
    element: <CustomersManagement />,
  },
  {
    path: '/admin/reviews',
    element: <ReviewsManagement />,
  },
  {
    path: '/admin/analytics',
    element: <Analytics />,
  },
  {
    path: '/admin/settings',
    element: <Settings />,
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
]);
