
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

const ComingSoon = ({
  title = "Coming Soon",
  message = "We're working hard to bring you something amazing. Stay tuned!",
  buttonText = "Back to Home",
  buttonLink = "/"
}: ComingSoonProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <CalendarClock className="h-12 w-12" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{title}</h1>
        
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          {message}
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild>
            <Link to={buttonLink}>
              {buttonText}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
