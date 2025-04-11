
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Info, X, Plus, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SellProduct = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Predefined options
  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "vehicles", label: "Vehicles" },
    { value: "property", label: "Property" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home & Garden" },
    { value: "jobs", label: "Jobs" },
    { value: "services", label: "Services" },
    { value: "others", label: "Others" }
  ];
  
  const subcategories = {
    electronics: [
      { value: "phones", label: "Mobile Phones" },
      { value: "computers", label: "Laptops & Computers" },
      { value: "tv", label: "TV & Audio" },
      { value: "cameras", label: "Cameras" },
      { value: "accessories", label: "Accessories" }
    ],
    vehicles: [
      { value: "cars", label: "Cars" },
      { value: "motorcycles", label: "Motorcycles" },
      { value: "commercial", label: "Commercial Vehicles" },
      { value: "parts", label: "Vehicle Parts" }
    ],
    property: [
      { value: "apartments-sale", label: "Apartments for Sale" },
      { value: "houses-sale", label: "Houses for Sale" },
      { value: "rentals", label: "Rentals" },
      { value: "land", label: "Land & Plots" },
      { value: "commercial", label: "Commercial Property" }
    ]
  };
  
  const conditions = [
    { value: "new", label: "New" },
    { value: "like-new", label: "Used - Like New" },
    { value: "good", label: "Used - Good" },
    { value: "fair", label: "Used - Fair" }
  ];
  
  const locations = [
    { value: "addis", label: "Addis Ababa" },
    { value: "adama", label: "Adama" },
    { value: "bahir-dar", label: "Bahir Dar" },
    { value: "hawassa", label: "Hawassa" },
    { value: "mekelle", label: "Mekelle" },
    { value: "gondar", label: "Gondar" },
    { value: "dire-dawa", label: "Dire Dawa" }
  ];
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files) {
      const newImages = Array.from(files);
      
      if (images.length + newImages.length > 10) {
        toast({
          title: "Image limit exceeded",
          description: "You can upload a maximum of 10 images",
          variant: "destructive"
        });
        return;
      }
      
      setImages(prev => [...prev, ...newImages]);
      
      // Generate previews
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setImagesPreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(imagesPreviews[index]);
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validation
    if (!title || !price || !category || !location || !description || images.length === 0) {
      toast({
        title: "Please fill all required fields",
        description: "Title, price, category, location, description and at least one image are required.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Product listed successfully!",
        description: "Your product has been listed on YetuMarket.",
      });
      setLoading(false);
      // In a real app, you would redirect to the new listing
    }, 1500);
  };
  
  // Get subcategories based on selected category
  const availableSubcategories = category && subcategories[category as keyof typeof subcategories] 
    ? subcategories[category as keyof typeof subcategories] 
    : [];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Post Your Product</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div>
                  <Label className="text-base block mb-2">
                    Product Images <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-2">
                    {imagesPreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-lg border overflow-hidden bg-gray-50">
                        <img 
                          src={preview} 
                          alt={`Preview ${index}`} 
                          className="w-full h-full object-cover"
                        />
                        <button 
                          type="button"
                          className="absolute top-1 right-1 p-0.5 rounded-full bg-gray-800/70 text-white hover:bg-red-600"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add Image Button */}
                    {images.length < 10 && (
                      <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 bg-gray-50">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">Add Image</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                          multiple
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    <span>You can upload up to 10 images. First image will be the main product image.</span>
                  </p>
                </div>
                
                {/* Basic Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                  
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title">
                        Product Title <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="title" 
                        placeholder="e.g. iPhone 13 Pro Max 256GB - Sierra Blue" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    {/* Price */}
                    <div>
                      <Label htmlFor="price">
                        Price (ETB) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          ETB
                        </span>
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="0.00" 
                          className="pl-12"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Category & Subcategory */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger id="category" className="mt-1">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="subcategory">
                          Subcategory
                        </Label>
                        <Select 
                          value={subcategory} 
                          onValueChange={setSubcategory} 
                          disabled={!category || availableSubcategories.length === 0}
                        >
                          <SelectTrigger id="subcategory" className="mt-1">
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSubcategories.map((subcat) => (
                              <SelectItem key={subcat.value} value={subcat.value}>{subcat.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Condition & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="condition">
                          Condition
                        </Label>
                        <Select value={condition} onValueChange={setCondition}>
                          <SelectTrigger id="condition" className="mt-1">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map((cond) => (
                              <SelectItem key={cond.value} value={cond.value}>{cond.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="location">
                          Location <span className="text-red-500">*</span>
                        </Label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger id="location" className="mt-1">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a detailed description of your product..." 
                    className="mt-1 h-36 resize-y"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include details such as brand, model, size, color, condition, features, etc.
                  </p>
                </div>
                
                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="e.g. 0911234567" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-md text-yellow-800 text-sm">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p>Your contact information will be visible to potential buyers. Make sure to provide a valid phone number.</p>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Your Ad'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellProduct;
