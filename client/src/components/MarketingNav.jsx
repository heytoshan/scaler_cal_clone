import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export const MarketingNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { name: 'Solutions', to: '/', hasDropdown: true },
    { name: 'Enterprise', to: '/enterprise', hasDropdown: false },
    { name: 'Cal.ai', to: '/', hasDropdown: false },
    { name: 'Developer', to: '/developers', hasDropdown: true },
    { name: 'Resources', to: '/', hasDropdown: true },
    { name: 'Pricing', to: '/pricing', hasDropdown: false },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-6xl px-8 py-4 bg-[#f9fafb]/90 backdrop-blur-md rounded-2xl border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-10">
                <Link to="/" className="text-xl font-bold tracking-tight text-black flex items-center">
                    Cal.com
                </Link>
                <div className="hidden lg:flex items-center gap-8">
                    {links.map(link => (
                      <Link 
                        key={link.to} 
                        to={link.to} 
                        className={`text-[13px] font-medium transition-colors flex items-center gap-1 ${path === link.to ? 'text-black' : 'text-gray-600 hover:text-black'}`}
                      >
                        {link.name} 
                        {link.hasDropdown && (
                          <ChevronDown size={14} className="opacity-40" />
                        )}
                      </Link>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/event-types">
                  <button className="bg-[#292929] text-white hover:bg-black font-medium px-5 h-9 rounded-full transition-all flex items-center gap-2 text-[13px]">
                    Go to app
                    <span className="opacity-50">→</span>
                  </button>
                </Link>
            </div>
        </div>
    </nav>
  );
};
