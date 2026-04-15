import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Code, Terminal, Cpu, Zap, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import { MarketingNav } from '../components/MarketingNav';

const DevelopersPage = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] overflow-x-hidden font-sans flex flex-col items-center">
      
      <MarketingNav />

      <div className="relative bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-200/40 overflow-hidden min-h-[calc(100vh-8rem)] w-[calc(100%-4rem)] max-w-6xl mt-32 mb-12 py-24 px-12">
        
        <div className="max-w-5xl mx-auto space-y-32">
            
            <div className="text-center space-y-8">
                <span className="inline-block px-3 py-1 text-xs font-bold text-gray-900 bg-gray-100 rounded-lg uppercase tracking-widest leading-loose">Developers</span>
                <h1 className="text-7xl font-black tracking-tighter leading-[0.9]">Built by developers, for developers</h1>
                <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed italic">Our entire platform is open-source. Build what you want, how you want, with the most flexible scheduling API on the planet.</p>
                <div className="flex items-center justify-center gap-4 pt-6">
                   <Button size="lg" className="bg-black text-white px-10 h-14 rounded-2xl font-black shadow-xl shadow-black/10 flex items-center gap-2">
                     <GithubIcon size={20} /> View on GitHub
                   </Button>
                   <Button variant="outline" size="lg" className="border-gray-200 px-10 h-14 rounded-2xl font-black">Read the API Docs</Button>
                </div>
            </div>

            {/* Code Block Experience */}
            <div className="bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden relative group">
               <div className="flex items-center gap-2 mb-4 px-4 overflow-hidden border-b border-white/5 pb-4">
                  <div className="flex gap-1.5 leading-none">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-orange-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-4">npm install @calcom/embed</span>
               </div>
               <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-blue-500/30">
                  <pre className="text-blue-400">
                     {`import { getCalApi } from "@calcom/embed-react";\n\n`}
                     <span className="text-white/40">{'// Initialize Cal.com Embed API\n'}</span>
                     <span className="text-emerald-400">{'const cal = await getCalApi();\n\n'}</span>
                     <span className="text-purple-400">{'cal'}</span>
                     <span className="text-white">{'.'}</span>
                     <span className="text-blue-300">{'ui'}</span>
                     <span className="text-white">({'{'}</span>
                     <br />
                     <span className="text-orange-300 pl-4">{'theme: "light",'}</span>
                     <br />
                     <span className="text-orange-300 pl-4">{'styles: { branding: { brandColor: "#000000" } }'}</span>
                     <br />
                     <span className="text-white">{' });'}</span>
                  </pre>
               </div>
               <div className="absolute top-8 right-8 text-white/5 pointer-events-none group-hover:text-white/10 transition-colors">
                  <Code size={120} strokeWidth={1} />
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { title: 'Open Source', desc: "We are an open-core company. Our source code is public and ready for contribution.", icon: <GithubIcon size={24}/> },
                 { title: 'API-First', desc: "Everything you see in our UI is reachable via our robust REST and GraphQL APIs.", icon: <Terminal size={24}/> },
                 { title: 'Extensible', desc: "Build custom integrations and apps directly on top of the Cal.com platform.", icon: <Cpu size={24}/> }
               ].map(item => (
                 <motion.div key={item.title} whileHover={{ y: -10 }} className="space-y-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black">
                       {item.icon}
                    </div>
                    <h4 className="text-2xl font-black tracking-tight">{item.title}</h4>
                    <p className="text-sm text-gray-400 font-bold leading-relaxed">{item.desc}</p>
                    <a href="#" className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">Learn more <ExternalLink size={10} /></a>
                 </motion.div>
               ))}
            </div>

        </div>

      </div>
      
      <footer className="w-full max-w-6xl pb-12 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-tighter">© 2026 Cal.com, Inc. — By developers, for developers.</p>
      </footer>
    </div>
  );
};

export default DevelopersPage;
