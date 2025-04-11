
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { Calendar, Check, ChevronRight, Heart, Map, MessageSquare, Phone, Share, ShieldCheck, Star, Truck, User } from "lucide-react";

// Mock product data
const PRODUCT = {
  id: "1",
  title: "iPhone 13 Pro Max - 256GB",
  price: 120000,
  location: "Bole, Addis Ababa",
  images: [
    "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1604164448130-d1df648211fc?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1581795669356-1d8b1d9c7433?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1000"
  ],
  condition: "Used - Like New",
  description: "Apple iPhone 13 Pro Max with 256GB storage. The phone is in excellent condition with no scratches or dents. Original accessories included (charger and cable). Still under warranty until December 2023. Reason for selling: upgrading to newer model.\n\nFeatures:\n- A15 Bionic chip\n- 6.7-inch Super Retina XDR display with ProMotion\n- Pro camera system with 12MP cameras\n- Cinematic mode in 1080p at 30 fps\n- Up to 28 hours video playback\n- Face ID\n- Ceramic Shield front",
  features: [
    "256GB Storage",
    "6.7-inch display",
    "A15 Bionic chip",
    "Sierra Blue color",
    "Face ID"
  ],
  seller: {
    id: "seller1",
    name: "Abebe Kebede",
    rating: 4.8,
    reviewsCount: 56,
    joinDate: "January 2021",
    verified: true,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  posted: "3 days ago",
  views: 154,
  category: "Electronics",
  subcategory: "Mobile Phones"
};

// Sample related products 
const RELATED_PRODUCTS = [
  {
    id: "2",
    title: "Samsung Galaxy S23 Ultra - 512GB",
    price: 145000,
    location: "Bole, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5d572a3?auto=format&fit=crop&q=80&w=1000",
    date: "Yesterday"
  },
  {
    id: "3",
    title: "Google Pixel 7 Pro - 128GB",
    price: 95000,
    location: "Megenagna, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=1000",
    date: "2 days ago"
  },
  {
    id: "4",
    title: "iPhone 14 - 128GB",
    price: 110000,
    location: "CMC, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=1000",
    date: "Today"
  },
  {
    id: "5",
    title: "OnePlus 10 Pro - 256GB",
    price: 87000,
    location: "Piassa, Addis Ababa",
    imageUrl: "https://images.unsplash.com/photo-1598346762291-aee88549193f?auto=format&fit=crop&q=80&w=1000",
    date: "5 days ago"
  }
];

// Sample reviews
const REVIEWS = [
  {
    id: "r1",
    user: "Dawit Solomon",
    rating: 5,
    date: "2 months ago",
    comment: "Great product and very responsive seller. The phone was in excellent condition as described.",
    userImage: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: "r2",
    user: "Sara Haile",
    rating: 4,
    date: "3 months ago",
    comment: "Good phone, fast delivery. Minor scratch that wasn't mentioned but otherwise as described.",
    userImage: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(PRODUCT.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white py-2 shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-500">
              <ol className="flex items-center space-x-1">
                <li><a href="/" className="hover:text-brand-green">Home</a></li>
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <a href={`/category/${PRODUCT.category.toLowerCase()}`} className="hover:text-brand-green">{PRODUCT.category}</a>
                </li>
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <a href={`/category/${PRODUCT.category.toLowerCase()}/${PRODUCT.subcategory.toLowerCase()}`} className="hover:text-brand-green">{PRODUCT.subcategory}</a>
                </li>
                <li className="flex items-center space-x-1">
                  <span>/</span>
                  <span className="text-gray-900 truncate max-w-[180px]">{PRODUCT.title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Images */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="mb-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={mainImage} 
                      alt={PRODUCT.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {PRODUCT.images.map((image, index) => (
                    <button 
                      key={index} 
                      className={`aspect-square rounded-md overflow-hidden border-2 ${mainImage === image ? 'border-brand-green' : 'border-transparent'}`} 
                      onClick={() => setMainImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${PRODUCT.title} - View ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{PRODUCT.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Map className="h-4 w-4" />
                  <span>{PRODUCT.location}</span>
                  <span>•</span>
                  <span>Posted {PRODUCT.posted}</span>
                  <span>•</span>
                  <span>{PRODUCT.views} views</span>
                </div>
                
                <div className="text-3xl font-bold text-brand-green mb-4">
                  {PRODUCT.price.toLocaleString()} ETB
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium mr-2">Condition:</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{PRODUCT.condition}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 mb-4">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Chat with Seller</span>
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>Show Phone Number</span>
                  </Button>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${isFavorite ? 'bg-pink-50 border-pink-200 text-pink-600' : ''}`}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span>Save</span>
                    </Button>
                    
                    <Button variant="outline" className="flex-1">
                      <Share className="h-5 w-5 mr-2" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
                
                {/* Safety Tips */}
                <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800 mb-4">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Safety Tips</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Meet in a safe public place</li>
                        <li>Don't pay in advance</li>
                        <li>Inspect the item before buying</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Seller Information */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium mb-4">Seller Information</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img 
                      src={PRODUCT.seller.image} 
                      alt={PRODUCT.seller.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{PRODUCT.seller.name}</span>
                      {PRODUCT.seller.verified && (
                        <Check className="h-4 w-4 text-brand-green" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>{PRODUCT.seller.rating}</span>
                      <span>({PRODUCT.seller.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Member since {PRODUCT.seller.joinDate}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View Seller Profile</Button>
              </div>
            </div>
          </div>
          
          {/* Description and Features */}
          <div className="mt-6">
            <Tabs defaultValue="description" className="bg-white rounded-lg shadow-sm">
              <TabsList className="p-0 border-b border-gray-200 w-full rounded-t-lg bg-transparent h-auto">
                <TabsTrigger 
                  value="description"
                  className="py-3 px-6 border-b-2 border-transparent data-[state=active]:border-brand-green rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="features"
                  className="py-3 px-6 border-b-2 border-transparent data-[state=active]:border-brand-green rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="py-3 px-6 border-b-2 border-transparent data-[state=active]:border-brand-green rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Reviews ({REVIEWS.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-6 mt-0">
                <div className="whitespace-pre-line">{PRODUCT.description}</div>
              </TabsContent>
              <TabsContent value="features" className="p-6 mt-0">
                <ul className="space-y-2">
                  {PRODUCT.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-brand-green" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="p-6 mt-0">
                <div className="space-y-6">
                  {REVIEWS.map(review => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={review.userImage} 
                            alt={review.user} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{review.user}</h3>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center text-yellow-400 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Related Products</h2>
              <a href="#" className="text-brand-green flex items-center hover:underline">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {RELATED_PRODUCTS.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
