
import { Link } from 'react-router-dom';
import { Car, Home, Smartphone, ShoppingBag, Briefcase, Gift, Building2, Sofa } from 'lucide-react';

interface CategoryItemProps {
  icon: React.ReactNode;
  name: string;
  link: string;
  count: number;
}

const CategoryItem = ({ icon, name, link, count }: CategoryItemProps) => {
  return (
    <Link to={link} className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition-colors">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2 text-brand-green">
        {icon}
      </div>
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs text-gray-500">{count} ads</span>
    </Link>
  );
};

const CategorySection = () => {
  const categories = [
    { icon: <Car size={28} />, name: "Vehicles", link: "/category/vehicles", count: 2543 },
    { icon: <Building2 size={28} />, name: "Property", link: "/category/property", count: 1892 },
    { icon: <Smartphone size={28} />, name: "Electronics", link: "/category/electronics", count: 3754 },
    { icon: <ShoppingBag size={28} />, name: "Fashion", link: "/category/fashion", count: 4265 },
    { icon: <Sofa size={28} />, name: "Home & Garden", link: "/category/home", count: 1576 },
    { icon: <Briefcase size={28} />, name: "Jobs", link: "/category/jobs", count: 865 },
    { icon: <Gift size={28} />, name: "Services", link: "/category/services", count: 1243 },
    { icon: <Home size={28} />, name: "Others", link: "/category/others", count: 2187 },
  ];

  return (
    <section className="py-8 bg-white shadow-sm rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              icon={category.icon}
              name={category.name}
              link={category.link}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
