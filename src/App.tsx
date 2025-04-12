import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import SellProduct from "./pages/SellProduct";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import CustomersManagement from "./pages/admin/CustomersManagement";
import ReviewsManagement from "./pages/admin/ReviewsManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/Login";
import NotFound from "./pages/NotFound";
import CreateTestUser from "./pages/CreateTestUser";
import Register from "@/pages/Register";
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Profile from '@/pages/Profile';
import VerificationPending from '@/pages/VerificationPending';

// Category Pages
import Fashion from "./pages/categories/Fashion";
import Home from "./pages/categories/Home";
import Jobs from "./pages/categories/Jobs";
import Services from "./pages/categories/Services";
import Others from "./pages/categories/Others";

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

const queryClient = new QueryClient();

// Admin route guard component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      setIsAdmin(profile?.is_admin || false);
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verification-pending" element={<VerificationPending />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/category/:categoryId/:subcategoryId" element={<Category />} />
            <Route path="/sell" element={<SellProduct />} />
            
            {/* Category Pages */}
            <Route path="/pages/categories/Fashion" element={<Fashion />} />
            <Route path="/pages/categories/Home" element={<Home />} />
            <Route path="/pages/categories/Jobs" element={<Jobs />} />
            <Route path="/pages/categories/Services" element={<Services />} />
            <Route path="/pages/categories/Others" element={<Others />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AuthGuard requiredRole="admin">
                <AdminDashboard />
              </AuthGuard>
            } />
            <Route path="/admin/products" element={
              <AuthGuard requiredRole="admin">
                <ProductsManagement />
              </AuthGuard>
            } />
            <Route path="/admin/categories" element={
              <AuthGuard requiredRole="admin">
                <CategoriesManagement />
              </AuthGuard>
            } />
            <Route path="/admin/orders" element={
              <AuthGuard requiredRole="admin">
                <OrdersManagement />
              </AuthGuard>
            } />
            <Route path="/admin/customers" element={
              <AuthGuard requiredRole="admin">
                <CustomersManagement />
              </AuthGuard>
            } />
            <Route path="/admin/reviews" element={
              <AuthGuard requiredRole="admin">
                <ReviewsManagement />
              </AuthGuard>
            } />
            <Route path="/admin/analytics" element={
              <AuthGuard requiredRole="admin">
                <Analytics />
              </AuthGuard>
            } />
            <Route path="/admin/settings" element={
              <AuthGuard requiredRole="admin">
                <Settings />
              </AuthGuard>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/create-test-user" element={<CreateTestUser />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
