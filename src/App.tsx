
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import SellProduct from "./pages/SellProduct";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import AdminLogin from "./pages/admin/Login";
import NotFound from "./pages/NotFound";

// Category Pages
import Fashion from "./pages/categories/Fashion";
import Home from "./pages/categories/Home";
import Jobs from "./pages/categories/Jobs";
import Services from "./pages/categories/Services";
import Others from "./pages/categories/Others";

const queryClient = new QueryClient();

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
            <Route path="/admin" element={
              <AuthGuard requiredRole="admin">
                <AdminDashboard />
              </AuthGuard>
            } />
            <Route path="/admin/products" element={
              <AuthGuard requiredRole="admin">
                <ProductsManagement />
              </AuthGuard>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
