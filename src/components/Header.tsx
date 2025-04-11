
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Heart, 
  ShoppingCart, 
  Bell, 
  PlusCircle, 
  LogIn 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Demo state - replace with real auth
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-green">Yetu<span className="text-brand-orange">Market</span></span>
          </Link>
          
          {/* Search bar - hidden on mobile, shown on desktop */}
          <div className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full max-w-lg">
              <Input 
                type="search" 
                placeholder="What are you looking for?" 
                className="w-full pr-10 rounded-full bg-gray-50 border-gray-200 focus:border-brand-green"
              />
              <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-brand-green">
              <Link to="/sell" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Sell</span>
              </Link>
            </Button>
            
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-brand-green">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-brand-green">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-brand-green">
                  <User className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
            )}
            
            <Button className="bg-brand-green hover:bg-green-700">
              <Link to="/sell" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Sell</span>
              </Link>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden py-2 pb-3">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="w-full pr-10 rounded-full bg-gray-50 border-gray-200"
            />
            <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link to="/sell" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                <PlusCircle className="h-5 w-5 text-brand-green" />
                <span>Sell</span>
              </Link>
              <Link to="/login" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                <LogIn className="h-5 w-5 text-brand-green" />
                <span>Login</span>
              </Link>
              <Link to="/favorites" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                <Heart className="h-5 w-5 text-brand-green" />
                <span>Favorites</span>
              </Link>
              <Link to="/notifications" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                <Bell className="h-5 w-5 text-brand-green" />
                <span>Notifications</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
