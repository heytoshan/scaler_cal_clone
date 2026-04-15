import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link as LinkIcon, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Copy, 
  Settings, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from './Button';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Event types', icon: LinkIcon, path: '/event-types' },
    { name: 'Bookings', icon: Calendar, path: '/bookings' },
    { name: 'Availability', icon: Clock, path: '/availability' },
  ];

  const bottomItems = [
    { name: 'View public page', icon: ArrowUpRight, path: '/toshan' },
    { name: 'Copy public page link', icon: Copy, path: '#' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground flex selection:bg-white/10">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="bg-black border-white/10 text-white"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[#0a0a0a] transition-all duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-9 pb-8">
             <NavLink to="/event-types" className="text-xl font-bold tracking-tight text-white px-1">
                Cal.com
             </NavLink>
          </div>

          {/* User Profile Section */}
          <div className="px-8 pb-4">
            <div className="flex items-center gap-3 py-2 px-1">
              <div className="h-8 w-8 rounded bg-white/5 flex items-center justify-center text-[10px] font-medium border border-white/10 uppercase text-white">
                 T
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium truncate text-white">Toshan</span>
                <span className="text-[9px] text-gray-600 uppercase tracking-widest">Admin</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 pt-4 space-y-1">
            <div className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em] mb-4 px-3">Main</div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center gap-3 rounded px-3 py-2.5 text-[13px] transition-all
                    ${isActive 
                      ? 'bg-white/5 text-white shadow-sm shadow-white/[0.02]' 
                      : 'text-gray-500 hover:text-gray-300'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                  <span className={isActive ? 'font-medium' : ''}>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Footer Section */}
          <div className="px-6 pb-14 space-y-1">
            <div className="text-[10px] font-medium text-gray-700 uppercase tracking-[0.2em] mb-4 px-3">Protocol</div>
            {bottomItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 rounded px-3 py-2.5 text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 min-h-screen bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto p-12 lg:p-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
