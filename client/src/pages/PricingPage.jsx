import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircle2, ChevronRight, Globe, Zap, Shield, Layout, MessageSquare, Lock, Plus, User } from 'lucide-react';

import { MarketingNav } from '../components/MarketingNav';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] overflow-x-hidden font-sans flex flex-col items-center">
      
      <MarketingNav />

      <div className="relative bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-200/40 overflow-hidden min-h-[calc(100vh-8rem)] w-[calc(100%-4rem)] max-w-6xl mt-32 mb-12 flex flex-col items-center py-24 px-12">
        
        <div className="text-center mb-24 space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-bold text-gray-400 bg-gray-100 rounded-lg uppercase tracking-widest">Pricing</span>
            <h1 className="text-7xl font-black tracking-tighter leading-[0.9]">Plans for every stage of growth</h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto italic">Scale with confidence. Our pricing is straightforward, just like our scheduling.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl items-stretch">
           {/* Free Plan */}
           <motion.div 
             whileHover={{ y: -8 }}
             className="p-10 rounded-3xl border border-gray-100 flex flex-col"
           >
              <h3 className="text-lg font-black mb-2">Individual</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">$0</span>
                <span className="text-sm text-gray-400 font-bold">/ forever</span>
              </div>
              <p className="text-xs text-gray-400 font-bold mb-8 flex-1 leading-relaxed">Everything you need as a solo professional to manage your time and connect with others.</p>
              <div className="space-y-4 mb-10">
                 {['Unlimited Event Types', '1 Active Calendar', 'Google, Outlook, Apple', 'Cal Video', 'Zoom & Google Meet'].map(f => (
                   <div key={f} className="flex items-center gap-2 text-xs font-bold">
                      <CheckCircle2 size={14} className="text-green-500" /> {f}
                   </div>
                 ))}
              </div>
              <Button className="w-full bg-black text-white rounded-xl h-12 font-black transition-transform hover:scale-[1.02] active:scale-95">Get started for free</Button>
           </motion.div>

           {/* Teams Plan */}
           <motion.div 
             whileHover={{ y: -8 }}
             className="p-10 rounded-3xl border-2 border-black flex flex-col relative"
           >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Best for teams</div>
              <h3 className="text-lg font-black mb-2">Team</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">$12</span>
                <span className="text-sm text-gray-400 font-bold">/ user / monthly</span>
              </div>
              <p className="text-xs text-gray-400 font-bold mb-8 flex-1 leading-relaxed">Collaborate with your team. Round-robin, collective bookings, and shared workflows.</p>
              <div className="space-y-4 mb-10">
                 {['Everything in Free', 'Unlimited Calendars', 'Round-Robin Scheduling', 'Collective Bookings', 'Stripe Payments'].map(f => (
                   <div key={f} className="flex items-center gap-2 text-xs font-bold text-gray-900">
                      <CheckCircle2 size={14} className="text-green-500" /> {f}
                   </div>
                 ))}
              </div>
              <Button className="w-full bg-black text-white rounded-xl h-12 font-black shadow-xl shadow-black/20 animate-pulse">Start 14-day trial</Button>
           </motion.div>

           {/* Enterprise Plan */}
           <motion.div 
             whileHover={{ y: -8 }}
             className="p-10 rounded-3xl border border-gray-100 flex flex-col"
           >
              <h3 className="text-lg font-black mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">$30</span>
                <span className="text-sm text-gray-400 font-bold">/ user / monthly</span>
              </div>
              <p className="text-xs text-gray-400 font-bold mb-8 flex-1 leading-relaxed">Enterprise-grade security, governance, and support for large organizations.</p>
              <div className="space-y-4 mb-10">
                 {['Everything in Team', 'SSO & SCIM Provisioning', 'Dedicated Success Manager', 'Audit Logs', 'Custom White-labeling'].map(f => (
                   <div key={f} className="flex items-center gap-2 text-xs font-bold">
                      <CheckCircle2 size={14} className="text-green-500" /> {f}
                   </div>
                 ))}
              </div>
              <Button variant="outline" className="w-full border-gray-200 rounded-xl h-12 font-black transition-transform hover:scale-[1.02] active:scale-95">Contact sales</Button>
           </motion.div>
        </div>

        <div className="mt-32 w-full max-w-4xl text-center space-y-12">
            <h2 className="text-4xl font-black tracking-tighter">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
               {[
                 { q: 'Is there a free version?', a: 'Yes! Our Individual plan is free forever with unlimited events.' },
                 { q: 'Can I cancel anytime?', a: 'Absolutely. You can downgrade or cancel your subscription at any time.' },
                 { q: 'Do you offer non-profit discounts?', a: 'Yes, we love supporting great causes. Contact us for special pricing.' },
                 { q: 'What about data security?', a: 'We are SOC2 Type II, HIPAA, and GDPR compliant.' }
               ].map((faq, i) => (
                 <div key={i} className="space-y-2">
                    <h4 className="font-black text-sm">{faq.q}</h4>
                    <p className="text-xs text-gray-400 font-bold leading-relaxed">{faq.a}</p>
                 </div>
               ))}
            </div>
        </div>

      </div>
      
      <footer className="w-full max-w-6xl pb-12 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-tighter">© 2026 Cal.com, Inc. — Built for a billion people.</p>
      </footer>
    </div>
  );
};

export default PricingPage;
