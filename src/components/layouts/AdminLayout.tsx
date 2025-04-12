import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SideNav from '@/components/admin/SideNav';
import AdminHeader from '@/components/admin/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="fixed inset-y-0 z-50">
        <SideNav 
          isCollapsed={isSideNavCollapsed} 
          onToggle={() => setIsSideNavCollapsed(!isSideNavCollapsed)} 
        />
      </div>
      <div className={`flex-1 ${isSideNavCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-200`}>
        <div className="sticky top-0 z-40 bg-white">
          <AdminHeader 
            onMenuClick={() => setIsSideNavCollapsed(!isSideNavCollapsed)}
            user={user}
            onSignOut={signOut}
          />
        </div>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 