
import { useState } from 'react';
import ProductCard, { ProductProps } from './ProductCard';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  // Mock data for featured products
  const [products] = useState<ProductProps[]>([
    {
      id: "1",
      title: "iPhone 13 Pro Max - 256GB",
      price: 120000,
      location: "Bole, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000",
      date: "Today",
      isFeatured: true
    },
    {
      id: "2",
      title: "Toyota Corolla 2018 Silver",
      price: 2500000,
      location: "Megenagna, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000",
      date: "Yesterday",
      isFeatured: true
    },
    {
      id: "3",
      title: "3 Bedroom Apartment for Rent",
      price: 35000,
      location: "CMC, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
      date: "2 days ago",
      isFeatured: true
    },
    {
      id: "4",
      title: "Samsung 55\" 4K Smart TV",
      price: 85000,
      location: "Piassa, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000",
      date: "3 days ago",
      isFeatured: true
    }
  ]);
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Featured Products</h2>
          <Button variant="link" className="text-brand-green">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
