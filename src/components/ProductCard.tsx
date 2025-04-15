
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ProductProps {
  id: string;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
  date: string;
  isFeatured?: boolean;
}

const ProductCard = ({ id, title, price, location, imageUrl, date, isFeatured = false }: ProductProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };
  
  return (
    <Link to={`/product/${id}`}>
      <Card className="product-card overflow-hidden h-full hover:shadow-lg transition-all duration-300 border-0">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {/* Favorite Button */}
          <button 
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`}
            />
          </button>
          
          {/* Featured Tag */}
          {isFeatured && (
            <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
              Featured
            </span>
          )}
        </div>
        
        {/* Product Details */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[48px]">{title}</h3>
          
          <div className="mt-2">
            <span className="font-bold text-green-600 text-lg">
              {price.toLocaleString()} ETB
            </span>
          </div>
          
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>{location}</span>
            <span>{date}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
