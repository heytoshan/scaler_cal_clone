import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Users, Briefcase, Heart, Rocket, CheckCircle2, ChevronRight, User } from 'lucide-react';

import { MarketingNav } from '../components/MarketingNav';

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] overflow-x-hidden font-sans flex flex-col items-center">
      
      <MarketingNav />

      <div className="relative bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-200/40 overflow-hidden min-h-[calc(100vh-8rem)] w-[calc(100%-4rem)] max-w-6xl mt-32 mb-12 py-24 px-12">
        
        <div className="max-w-5xl mx-auto space-y-32">
            
            <div className="text-center space-y-8">
                <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg uppercase tracking-widest">Solutions</span>
                <h1 className="text-7xl font-black tracking-tighter leading-[0.9]">Tailored scheduling for every industry</h1>
                <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">Whether you're a solo founder or a global healthcare provider, Cal.com adapts to your unique workflow.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {[
                 { title: 'Sales Teams', desc: 'Close deals faster with round-robin and instant booking.', icon: <Rocket className="text-orange-500" />, color: 'bg-orange-50' },
                 { title: 'Customer Success', desc: 'Manage renewals and support calls with shared calendars.', icon: <Heart className="text-pink-500" />, color: 'bg-pink-50' },
                 { title: 'Recruiters', desc: 'Streamline interviews and candidate screening calls.', icon: <Users className="text-blue-500" />, color: 'bg-blue-50' },
                 { title: 'Professional Services', desc: 'Bill for your time and manage client consultations.', icon: <Briefcase className="text-indigo-500" />, color: 'bg-indigo-50' }
               ].map((item, i) => (
                 <motion.div 
                   key={item.title}
                   whileHover={{ y: -10 }}
                   className="p-10 rounded-[2.5rem] border border-gray-100 space-y-6 group cursor-default"
                 >
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                       {item.icon}
                    </div>
                    <h3 className="text-3xl font-black tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 font-bold text-sm leading-relaxed">{item.desc}</p>
                    <ul className="space-y-4 pt-4">
                       {['Team Sync', 'Workflow Automation', 'Analytics Panel'].map(f => (
                         <li key={f} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                            <CheckCircle2 size={16} className="text-emerald-500" /> {f}
                         </li>
                       ))}
                    </ul>
                 </motion.div>
               ))}
            </div>

            <div className="text-center space-y-12 py-20 border-t border-gray-50">
               <h2 className="text-4xl font-black tracking-tighter italic">"Cal.com shifted our conversion rate by 24%"</h2>
               <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mb-4 overflow-hidden">
                     <img src="https://i.pravatar.cc/150?u=jane" alt="Jane" />
                  </div>
                  <h4 className="font-bold">Jane Cooper</h4>
                  <p className="text-xs text-gray-400 font-bold">VP of Sales, Acme Corp</p>
               </div>
            </div>

        </div>

      </div>
      
      <footer className="w-full max-w-6xl pb-12 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-tighter">© 2026 Cal.com, Inc. — Powering global interactions.</p>
      </footer>
    </div>
  );
};

export default SolutionsPage;
