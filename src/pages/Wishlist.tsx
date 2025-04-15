
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart, AlertCircle } from "lucide-react";

// Sample wishlist data
const SAMPLE_WISHLIST = [
  {
    id: "1",
    title: "iPhone 13 Pro Max - 256GB",
    price: 120000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000",
    inStock: true
  },
  {
    id: "2",
    title: "Samsung 55\" 4K Smart TV",
    price: 85000,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000",
    inStock: true
  },
  {
    id: "3",
    title: "Sofa Set - 3+1+1",
    price: 45000,
    location: "Sarbet, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
    inStock: false
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(SAMPLE_WISHLIST);
  
  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };
  
  return (
    <div className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <nav className="flex items-center space-x-1">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Wishlist</span>
          </nav>
        </div>
        
        {/* Wishlist Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 p-4 rounded-full">
                  <AlertCircle className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Browse our products and add items you love to your wishlist</p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-md">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-green-600">
                        {item.title}
                      </Link>
                      <div className="mt-2 font-bold text-green-600">
                        {item.price.toLocaleString()} ETB
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.location}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button 
                          className="flex-1"
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Separator className="my-8" />
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600">Total items: </span>
                  <span className="font-semibold">{wishlist.length}</span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setWishlist([])}>
                    Clear Wishlist
                  </Button>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add All to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
