
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Heart } from 'lucide-react';

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
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Link to={`/product/${id}`}>
      <Card className="product-card overflow-hidden h-full">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          
          {/* Favorite Button */}
          <button 
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
            onClick={toggleFavorite}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          
          {/* Featured Tag */}
          {isFeatured && (
            <span className="absolute top-2 left-2 bg-brand-orange text-white text-xs font-medium px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
        
        {/* Product Details */}
        <div className="p-3">
          <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
          
          <div className="mt-1">
            <span className="font-bold text-brand-green">
              {price.toLocaleString()} ETB
            </span>
          </div>
          
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>{location}</span>
            <span>{date}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
