
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MessageCircle, Heart, Share2, ChevronRight, Truck, Shield, ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Mock product data - in a real app, this would come from an API
const PRODUCT = {
  id: "1",
  title: "iPhone 13 Pro Max - 256GB",
  price: 120000,
  originalPrice: 135000,
  discount: 15000,
  condition: "Used - Like New",
  description: "Apple iPhone 13 Pro Max with 256GB storage. Sierra Blue color. Perfect condition, still under warranty until December 2023. Comes with original box, charger, and unused headphones. Battery health at 95%. No scratches or dents.",
  features: [
    "A15 Bionic chip with 5-core GPU",
    "6.7-inch Super Retina XDR display with ProMotion",
    "Pro camera system with 12MP telephoto, wide, and ultra wide cameras",
    "256GB storage capacity",
    "Face ID facial recognition",
    "iOS 15 operating system"
  ],
  category: "Electronics",
  subcategory: "Mobile Phones",
  location: "Bole, Addis Ababa",
  seller: {
    id: "s123",
    name: "Abebe Kebede",
    joinDate: "January 2021",
    rating: 4.8,
    verified: true,
    listings: 24
  },
  images: [
    "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=1000"
  ],
  datePosted: "2023-07-15",
  viewCount: 386,
  reviews: [
    {
      id: "r1",
      user: "Tigist H.",
      rating: 5,
      date: "2023-08-02",
      comment: "Fast communication, item was exactly as described. Great seller!"
    },
    {
      id: "r2",
      user: "Daniel T.",
      rating: 4,
      date: "2023-07-29",
      comment: "Good seller, but delivery took a bit longer than expected."
    }
  ],
  related: [
    {
      id: "2",
      title: "Samsung Galaxy S22 Ultra",
      price: 110000,
      location: "Kazanchis, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000",
      date: "Yesterday"
    },
    {
      id: "3",
      title: "Google Pixel 7 Pro - 128GB",
      price: 95000,
      location: "CMC, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=1000",
      date: "2 days ago"
    },
    {
      id: "4",
      title: "iPhone 12 - 64GB",
      price: 75000,
      location: "Piassa, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=1000",
      date: "3 days ago"
    },
    {
      id: "5",
      title: "OnePlus 9 Pro - 256GB",
      price: 88000,
      location: "Bole, Addis Ababa",
      imageUrl: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1000",
      date: "Today"
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(PRODUCT.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className="flex-grow bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <nav className="flex items-center space-x-1">
            <a href="/" className="hover:text-brand-green">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-brand-green">{PRODUCT.category}</a>
            <span>/</span>
            <a href={`/category/${PRODUCT.subcategory}`} className="hover:text-brand-green">{PRODUCT.subcategory}</a>
            <span>/</span>
            <span className="text-gray-900">{PRODUCT.title}</span>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={mainImage} 
                  alt={PRODUCT.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="p-4 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                {PRODUCT.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 rounded cursor-pointer ${mainImage === image ? 'ring-2 ring-brand-green' : 'hover:opacity-80'}`}
                    onClick={() => setMainImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${PRODUCT.title} - Image ${index + 1}`} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900">{PRODUCT.title}</h1>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${isFavorite ? 'text-red-500' : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={isFavorite ? "fill-red-500" : ""} />
                </Button>
              </div>
              
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-brand-green">{PRODUCT.price.toLocaleString()}</span>
                  <span className="text-xl ml-1">ETB</span>
                </div>
                
                {PRODUCT.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-gray-500 line-through">
                      {PRODUCT.originalPrice.toLocaleString()} ETB
                    </span>
                    <span className="text-xs text-red-500">
                      Save {PRODUCT.discount.toLocaleString()} ETB
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center space-x-2">
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  {PRODUCT.condition}
                </Badge>
                <Badge variant="outline" className="border-gray-300">
                  {PRODUCT.location}
                </Badge>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Button 
                    className="flex-1 bg-brand-orange hover:bg-orange-600"
                    onClick={() => alert("Contact seller functionality would be implemented here")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Contact Seller
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => alert("Make offer functionality would be implemented here")}
                  >
                    Make Offer
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>YetuMarket Buyer Protection</span>
                </div>
                <div className="flex items-center mt-2 space-x-2 text-sm text-gray-500">
                  <Truck className="h-4 w-4" />
                  <span>Free Delivery Available in Addis Ababa</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Seller Information */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">
                    {PRODUCT.seller.name} {PRODUCT.seller.verified && (
                      <Badge className="ml-1 bg-blue-100 text-blue-800">Verified</Badge>
                    )}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{PRODUCT.seller.rating}</span>
                    <div className="flex ml-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(PRODUCT.seller.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2">{PRODUCT.seller.listings} listings</span>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="text-brand-green hover:text-brand-green/90 hover:bg-brand-green/10"
                  onClick={() => alert("View seller profile functionality would be implemented here")}
                >
                  View Profile <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            {/* Product Stats */}
            <Card className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-medium text-gray-900">Posted</div>
                  <div className="text-gray-500">{PRODUCT.datePosted}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Views</div>
                  <div className="text-gray-500">{PRODUCT.viewCount}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Share</div>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="description">
            <TabsList className="w-full bg-white">
              <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
              <TabsTrigger value="features" className="flex-1">Features & Specs</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews ({PRODUCT.reviews.length})</TabsTrigger>
              <TabsTrigger value="delivery" className="flex-1">Delivery Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="prose max-w-none">
                <p>{PRODUCT.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="mt-4 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Features & Specifications</h3>
              <ul className="list-disc pl-5 space-y-2">
                {PRODUCT.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {PRODUCT.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex items-center mt-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => alert("Write review functionality would be implemented here")}
              >
                Write a Review
              </Button>
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-4 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Delivery Options</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-brand-green" />
                      <span>Free Delivery within Addis Ababa (1-3 days)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-brand-green" />
                      <span>Delivery outside Addis Ababa (3-7 days): 200-500 ETB</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Pickup Options</h4>
                  <p className="mt-1">Meet with the seller at a public location in Bole, Addis Ababa.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Related Products</h2>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {PRODUCT.related.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 hidden lg:block">
              <Button variant="outline" size="icon" className="rounded-full bg-white">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 hidden lg:block">
              <Button variant="outline" size="icon" className="rounded-full bg-white">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
