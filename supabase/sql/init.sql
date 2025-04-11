
-- Create tables for YetuMarket

-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR, -- This will be handled by Supabase Auth, not needed here
  full_name VARCHAR,
  phone_number VARCHAR,
  role VARCHAR DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
  product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  category_id UUID,
  seller_id UUID REFERENCES public.users(user_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  images TEXT[] DEFAULT '{}'::TEXT[]
);

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.categories(category_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(user_id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  order_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(order_id),
  product_id UUID REFERENCES public.products(product_id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(product_id),
  user_id UUID REFERENCES public.users(user_id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);

-- RLS Policies
-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT
  USING (auth.uid() = user_id);
  
CREATE POLICY "Admin can view all users" ON public.users
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE user_id = auth.uid() AND role = 'admin'
  ));
  
-- Products policies
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT
  USING (true);
  
CREATE POLICY "Users can create their own products" ON public.products
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);
  
CREATE POLICY "Users can update their own products" ON public.products
  FOR UPDATE
  USING (auth.uid() = seller_id);
  
CREATE POLICY "Users can delete their own products" ON public.products
  FOR DELETE
  USING (auth.uid() = seller_id);
  
CREATE POLICY "Admin can manage all products" ON public.products
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE user_id = auth.uid() AND role = 'admin'
  ));
  
-- Categories policies
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT
  USING (true);
  
CREATE POLICY "Admin can manage categories" ON public.categories
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE user_id = auth.uid() AND role = 'admin'
  ));
  
-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);
  
CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE
  USING (auth.uid() = user_id);
  
CREATE POLICY "Admin can manage all orders" ON public.orders
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE user_id = auth.uid() AND role = 'admin'
  ));
  
-- Order Items policies
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders WHERE order_id = public.order_items.order_id AND user_id = auth.uid()
  ));
  
CREATE POLICY "Users can create their own order items" ON public.order_items
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders WHERE order_id = public.order_items.order_id AND user_id = auth.uid()
  ));
  
CREATE POLICY "Admin can manage all order items" ON public.order_items
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE user_id = auth.uid() AND role = 'admin'
  ));
  
-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT
  USING (true);
  
CREATE POLICY "Users can create their own reviews" ON public.reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE
  USING (auth.uid() = user_id);
  
CREATE POLICY "Users can delete their own reviews" ON public.reviews
  FOR DELETE
  USING (auth.uid() = user_id);
  
CREATE POLICY "Admin can manage all reviews" ON public.reviews
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Insert some demo data
-- Demo categories
INSERT INTO public.categories (name, slug)
VALUES 
  ('Fashion', 'fashion'),
  ('Home & Garden', 'home-garden'),
  ('Electronics', 'electronics'),
  ('Vehicles', 'vehicles'),
  ('Property', 'property'),
  ('Jobs', 'jobs'),
  ('Services', 'services'),
  ('Others', 'others');

-- Note: For password authentication, you'll need to create users through Supabase Auth API,
-- not direct table inserts, as passwords need to be properly hashed.
