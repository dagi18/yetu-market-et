
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SideNav from '@/components/admin/SideNav';
import AdminHeader from '@/components/admin/AdminHeader';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<{ full_name: string; email: string; is_admin: boolean } | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('full_name, email, is_admin')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (!userProfile?.is_admin) {
          navigate('/');
          return;
        }

        setProfile(userProfile);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const containerVariants = {
    collapsed: {
      marginLeft: "5rem", // 80px
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    expanded: {
      marginLeft: "16rem", // 256px
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 mx-auto animate-spin text-green-600" />
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 z-50">
        <SideNav 
          isCollapsed={isSideNavCollapsed} 
          onToggle={() => setIsSideNavCollapsed(!isSideNavCollapsed)} 
        />
      </div>
      
      <AnimatePresence>
        <motion.div 
          className="flex-1 transition-all duration-300"
          initial={false}
          animate={isSideNavCollapsed ? "collapsed" : "expanded"}
          variants={containerVariants}
        >
          <div className="sticky top-0 z-40">
            <AdminHeader 
              onMenuClick={() => setIsSideNavCollapsed(!isSideNavCollapsed)}
              user={user}
              profile={profile}
              onSignOut={signOut}
            />
          </div>
          <main className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
