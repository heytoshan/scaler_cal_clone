import React from 'react';
import { Settings as SettingsIcon, Shield, Lock, Bell, User } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-1">
          <h2 className="text-2xl font-medium text-white tracking-tight">Settings</h2>
          <p className="text-[13px] text-gray-500">Configure your account and organization parameters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
         <div className="space-y-1">
            {[
              { name: 'Profile', icon: User },
              { name: 'Security', icon: Shield },
              { name: 'Appearance', icon: SettingsIcon },
              { name: 'Notifications', icon: Bell },
              { name: 'API Keys', icon: Lock },
            ].map((item, i) => (
              <button 
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] rounded transition-all ${i === 2 ? 'bg-white/5 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                 <item.icon size={16} />
                 <span>{item.name}</span>
              </button>
            ))}
         </div>

         <div className="space-y-8 max-w-xl">
            <div className="p-8 rounded border border-white/5 bg-white/[0.01] space-y-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Administrator Name</label>
                  <input 
                    defaultValue="Toshan"
                    className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Primary Email</label>
                  <input 
                    defaultValue="toshan@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20"
                  />
               </div>
               <div className="pt-4">
                  <button className="h-10 px-8 bg-white text-black text-[12px] font-medium rounded hover:bg-gray-200 transition-all uppercase tracking-widest">
                     Update Settings
                  </button>
               </div>
            </div>

            <div className="p-8 rounded border border-white/5 bg-white/[0.01] space-y-4">
               <h3 className="text-sm font-medium text-white">Advanced Protection</h3>
               <p className="text-[12px] text-gray-500 leading-relaxed">
                  Enable strict mode to require confirmation for all automated interaction protocols. This ensures your availability remains optimized.
               </p>
               <button className="text-[11px] font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest underline underline-offset-8">
                  Configure Protocols
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
