
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Jobs() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Clock className="h-24 w-24 text-green-600 mx-auto" />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Coming Soon
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-xl"
          >
            We're working hard to bring you a great jobs marketplace. Please check back soon!
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4"
          >
            <Button asChild size="lg">
              <Link to="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Homepage
              </Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <AlertCircle className="h-4 w-4 mr-2" />
              Get Notified When We Launch
            </Button>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 p-6 bg-amber-50 rounded-lg max-w-2xl"
          >
            <h3 className="text-xl font-semibold text-amber-800 mb-3">What to expect</h3>
            <ul className="text-left text-amber-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Post job listings and find qualified candidates</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Search for jobs with advanced filtering options</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Create professional profiles and resumes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Direct messaging between employers and candidates</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Integration with popular job posting sites</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
