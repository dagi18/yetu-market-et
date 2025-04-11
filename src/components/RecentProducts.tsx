
import { useState } from 'react';
import ProductCard, { ProductProps } from './ProductCard';
import { Button } from '@/components/ui/button';

const RecentProducts = () => {
  // Mock data for recent products
  const [products] = useState<ProductProps[]>([
    {
      id: "5",
      title: "MacBook Pro 16\" 2021 M1 Pro",
      price: 205000,
      location: "Bole, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
      date: "Today"
    },
    {
      id: "6",
      title: "Sofa Set - 3+1+1",
      price: 45000,
      location: "Sarbet, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      date: "Today"
    },
    {
      id: "7",
      title: "Sony PlayStation 5 Digital Edition",
      price: 85000,
      location: "Kazanchis, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1000",
      date: "Yesterday"
    },
    {
      id: "8",
      title: "Nike Air Jordan 1 High OG",
      price: 12000,
      location: "Piassa, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80&w=1000",
      date: "Yesterday"
    },
    {
      id: "9",
      title: "Hyundai Tucson 2020 SUV",
      price: 3200000,
      location: "Bole, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&q=80&w=1000",
      date: "2 days ago"
    },
    {
      id: "10",
      title: "Canon EOS R6 Camera with Lens",
      price: 175000,
      location: "Megenagna, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000",
      date: "2 days ago"
    },
    {
      id: "11",
      title: "2 Bedroom House for Sale",
      price: 3500000,
      location: "CMC, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1000",
      date: "3 days ago"
    },
    {
      id: "12",
      title: "Office Desk with Chair",
      price: 8500,
      location: "Bole, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000",
      date: "3 days ago"
    }
  ]);
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Products</h2>
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

export default RecentProducts;
