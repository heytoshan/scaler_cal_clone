import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Shield, Lock, Globe, Zap, CheckCircle2, ChevronRight, Server, Users } from 'lucide-react';

import { MarketingNav } from '../components/MarketingNav';

const EnterprisePage = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] overflow-x-hidden font-sans flex flex-col items-center">
      
      <MarketingNav />

      <div className="relative bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-200/40 overflow-hidden min-h-[calc(100vh-8rem)] w-[calc(100%-4rem)] max-w-6xl mt-32 mb-12 py-24 px-12">
        
        <div className="max-w-4xl mx-auto space-y-24">
            
            <div className="text-center space-y-8">
                <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg uppercase tracking-widest">Enterprise</span>
                <h1 className="text-7xl font-black tracking-tighter leading-[0.9]">Scheduling infrastructure for the modern enterprise</h1>
                <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">Secure, scalable, and fully customizable. Built to meet the rigorous demands of large-scale organizations.</p>
                <div className="flex items-center justify-center gap-4 pt-6">
                   <Button size="lg" className="bg-black text-white px-10 h-14 rounded-2xl font-black shadow-xl shadow-black/10">Talk to Sales</Button>
                   <Button variant="outline" size="lg" className="border-gray-200 px-10 h-14 rounded-2xl font-black">View Security Docs</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
               <motion.div whileHover={{ x: 10 }} className="space-y-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black">
                     <Shield size={24} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight">World-class Security</h3>
                  <p className="text-gray-400 font-bold text-sm leading-relaxed italic">SOC2 Type II, HIPAA, and GDPR compliant. We take your security as seriously as you do.</p>
                  <ul className="space-y-3">
                     {['Single Sign-On (SAML)', 'SCIM User Provisioning', 'Audit Logs & Reporting', 'Data Residency (EU/US)'].map(f => (
                       <li key={f} className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 size={14} className="text-black" /> {f}</li>
                     ))}
                  </ul>
               </motion.div>

               <motion.div whileHover={{ x: -10 }} className="space-y-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black">
                     <Globe size={24} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight">Full Observability</h3>
                  <p className="text-gray-400 font-bold text-sm leading-relaxed italic">Gain insights into how your organization schedules. Optimize every touchpoint.</p>
                  <ul className="space-y-3">
                     {['Organization Dashboard', 'Advanced Workflows', 'Custom Subdomains', 'White-labeling'].map(f => (
                       <li key={f} className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 size={14} className="text-black" /> {f}</li>
                     ))}
                  </ul>
               </motion.div>
            </div>

            <div className="bg-gray-50/50 p-16 rounded-[2.5rem] space-y-12">
               <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter">Your cloud or ours</h2>
                  <p className="text-gray-400 font-bold text-sm">Deploy Cal.com wherever your data needs to live.</p>
               </div>
               <div className="grid md:grid-cols-3 gap-12">
                  {[
                    { title: 'SaaS', desc: 'Managed by us. Secure, fast, and constantly updated.', icon: <Zap size={20}/> },
                    { title: 'Self-Hosted', desc: 'Deploy on your own infrastructure for total control.', icon: <Server size={20}/> },
                    { title: 'Single-Tenant', desc: 'Dedicated instance for extreme isolation and security.', icon: <Users size={20}/> }
                  ].map(item => (
                    <div key={item.title} className="text-center space-y-4">
                       <div className="mx-auto w-10 h-10 border border-black/10 rounded-xl flex items-center justify-center">{item.icon}</div>
                       <h4 className="font-black text-sm">{item.title}</h4>
                       <p className="text-[11px] text-gray-400 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

        </div>

      </div>
      
      <footer className="w-full max-w-6xl pb-12 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-tighter">© 2026 Cal.com, Inc. — Secure enough for governments.</p>
      </footer>
    </div>
  );
};

export default EnterprisePage;
