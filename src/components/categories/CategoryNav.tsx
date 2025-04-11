
import { Link } from 'react-router-dom';
import { Car, Smartphone, ShoppingBag, Briefcase, Gift, Building2, Sofa, Package } from 'lucide-react';

const CategoryNav = () => {
  const categories = [
    { icon: <Car className="h-5 w-5" />, name: "Vehicles", link: "/pages/categories/vehicles" },
    { icon: <Building2 className="h-5 w-5" />, name: "Property", link: "/pages/categories/property" },
    { icon: <Smartphone className="h-5 w-5" />, name: "Electronics", link: "/pages/categories/electronics" },
    { icon: <ShoppingBag className="h-5 w-5" />, name: "Fashion", link: "/pages/categories/Fashion" },
    { icon: <Sofa className="h-5 w-5" />, name: "Home & Garden", link: "/pages/categories/Home" },
    { icon: <Briefcase className="h-5 w-5" />, name: "Jobs", link: "/pages/categories/Jobs" },
    { icon: <Gift className="h-5 w-5" />, name: "Services", link: "/pages/categories/Services" },
    { icon: <Package className="h-5 w-5" />, name: "Others", link: "/pages/categories/Others" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto py-1 scrollbar-hide md:justify-center">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="flex min-w-max flex-col items-center py-2 px-3 text-sm font-medium text-gray-700 hover:text-brand-green"
            >
              <span className="mb-1">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
