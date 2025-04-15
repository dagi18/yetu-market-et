
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Mail } from "lucide-react";

const Jobs = () => {
  return (
    <div className="flex-grow bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 text-left">
          <nav className="flex items-center space-x-1">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Jobs</span>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Briefcase className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-xl text-gray-600 mb-8">
            Our jobs marketplace is under construction and will be available soon. We're working hard to bring you the best job opportunities across Ethiopia.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
            <div className="flex items-center">
              <Calendar className="text-green-600 mr-2" />
              <span>Launching Q2 2023</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="text-green-600 mr-2" />
              <span>1000+ Jobs Ready</span>
            </div>
            <div className="flex items-center">
              <Mail className="text-green-600 mr-2" />
              <span>Early Access Available</span>
            </div>
          </div>
          
          <Button className="px-8 py-6 text-lg" size="lg">
            Get notified when we launch
          </Button>
          
          <div className="mt-10 text-gray-500 text-sm">
            <p>
              Want to list your job openings when we launch? Contact us at{" "}
              <a href="mailto:jobs@yetumarket.com" className="text-green-600 hover:underline">
                jobs@yetumarket.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
