import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { MarketingNav } from '../components/MarketingNav';
import { 
  format, 
  addMonths, 
  subMonths, 
  getDaysInMonth, 
  startOfMonth, 
  getDay, 
  isSameDay 
} from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Shield,
  Zap,
  Layout,
  MessageSquare,
  Lock,
  Plus,
  User,
  Link as LinkIcon,
  Settings,
  Video,
  CreditCard,
  Mail,
  Code,
  Cloud
} from 'lucide-react';

const HomePage = () => {
  const containerRef = useRef(null);
  const testimonialRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const logos = [
    { name: 'Ramp', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ramp_logo.svg/1280px-Ramp_logo.svg.png' },
    { name: 'PlanetScale', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/PlanetScale_logo.svg/1280px-PlanetScale_logo.svg.png' },
    { name: 'Coinbase', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Coinbase_Logo.svg/1280px-Coinbase_Logo.svg.png' },
    { name: 'Storyblok', url: 'https://a.storyblok.com/f/88751/1000x200/9b2c3a504a/storyblok-logo.png' },
  ];

  const [showAllTestimonials, setShowAllTestimonials] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState('English');
  const [showLangDropdown, setShowLangDropdown] = React.useState(false);

  const languages = ['English', 'Français', 'Deutsch', 'Español', 'Português', '日本語', '한국어', 'हिन्दी'];

  const translations = {
    'English': {
       heroTitle: 'The better way to schedule your meetings',
       heroSub: 'A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.',
       getStarted: 'Get started',
       talkToSales: 'Talk to sales',
       solutions: 'Solutions',
       enterprise: 'Enterprise',
       pricing: 'Pricing',
       developers: 'Developers',
       trusted: 'Trusted by fast-growing companies around the world',
       toolsTitle: 'All your key tools in-sync with your meetings',
       toolsSub: 'Cal.com works with all apps already in your flow ensuring everything works perfectly together.',
       loveTitle: 'See why our users love Cal.com',
       loveSub: "Read the impact we've had from those who matter most — our customers.",
       smarterTitle: 'Smarter, simpler scheduling'
    },
    'Français': {
       heroTitle: 'La meilleure façon de planifier vos réunions',
       heroSub: 'Un logiciel de planification entièrement personnalisable pour les particuliers, les entreprises et les développeurs.',
       getStarted: 'Commencer',
       talkToSales: 'Parler aux ventes',
       solutions: 'Solutions',
       enterprise: 'Entreprise',
       pricing: 'Tarifs',
       developers: 'Développeurs',
       trusted: 'Utilisé par des entreprises en pleine croissance à travers le monde',
       toolsTitle: 'Tous vos outils clés synchronisés avec vos réunions',
       toolsSub: 'Cal.com fonctionne avec toutes les applications déjà présentes dans votre flux.',
       loveTitle: "Voyez pourquoi nos utilisateurs aiment Cal.com",
       loveSub: "Découvrez l'impact que nous avons eu sur ceux qui comptent le plus.",
       smarterTitle: 'Une planification plus intelligente et plus simple'
    },
    'Español': {
        heroTitle: 'La mejor manera de programar tus reuniones',
        heroSub: 'Un software de programación totalmente personalizable para individuos, empresas y desarrolladores.',
        getStarted: 'Empezar',
        talkToSales: 'Hablar con ventas',
        solutions: 'Soluciones',
        enterprise: 'Empresa',
        pricing: 'Precios',
        developers: 'Desarrolladores',
        trusted: 'Confiado por empresas de rápido crecimiento en todo el mundo',
        toolsTitle: 'Todas tus herramientas clave sincronizadas',
        toolsSub: 'Cal.com funciona con todas las aplicaciones de tu flujo de trabajo.',
        loveTitle: 'Por qué nuestros usuarios aman Cal.com',
        loveSub: 'El impacto en quienes más importan: nuestros clientes.',
        smarterTitle: 'Programación más inteligente y sencilla'
    },
    'हिन्दी': {
        heroTitle: 'अपनी मीटिंग शेड्यूल करने का बेहतर तरीका',
        heroSub: 'व्यक्तियों, व्यवसायों और डेवलपर्स के लिए एक पूरी तरह से अनुकूलन योग्य शेड्यूलिंग सॉफ़्टवेयर।',
        getStarted: 'शुरू करें',
        talkToSales: 'सेल्स से बात करें',
        solutions: 'समाधान',
        enterprise: 'एंटरप्राइज',
        pricing: 'कीमतें',
        developers: 'डेवलपर्स',
        trusted: 'दुनिया भर की तेजी से बढ़ती कंपनियों द्वारा विश्वसनीय',
        toolsTitle: 'आपकी मीटिंग के साथ आपके सभी प्रमुख टूल सिंक में',
        toolsSub: 'Cal.com आपके फ्लो में पहले से मौजूद सभी ऐप्स के साथ काम करता है।',
        loveTitle: 'देखें क्यों हमारे उपयोगकर्ता Cal.com को पसंद करते हैं',
        loveSub: 'उन लोगों से प्रभाव पढ़ें जो सबसे ज्यादा मायने रखते हैं - हमारे ग्राहक।',
        smarterTitle: 'शेड्यूलिंग अब और भी आसान'
    }
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations['English'][key];
  };

  const [currentMonth, setCurrentMonth] = React.useState(new Date(2025, 4, 1)); 
  const [selectedDate, setSelectedDate] = React.useState(new Date(2025, 4, 16));

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonthTotal = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getDay(startOfMonth(currentMonth));

  // Smooth scroll springs
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

  const { scrollYProgress: toolsScrollProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const smoothToolsProgress = useSpring(toolsScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toolsY = useTransform(smoothToolsProgress, [0, 1], [150, -150]);
  const textY = useTransform(smoothToolsProgress, [0, 1], [50, -50]);

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }
    for (let i = 1; i <= daysInMonthTotal; i++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
        const isSelected = isSameDay(date, selectedDate);
        days.push(
        <button 
            key={i} 
            onClick={() => setSelectedDate(date)}
            className={`
            h-9 w-9 flex items-center justify-center text-xs font-bold rounded-xl transition-all
            ${isSelected 
                ? 'bg-black text-white shadow-lg shadow-black/20' 
                : 'text-gray-400 hover:bg-gray-200 hover:text-black'}
            `}
        >
            {i}
        </button>
        );
    }
    return days;
  };

  const testimonials = [
    {
      name: "Jean-Philippe Allard",
      handle: "@jpallard",
      text: "What an amazing support experience! Identified a small bug and sent them an e-mail. The bug was fixed (Github pull request as a proof!) in under 24 hours. I've never seen such a fast and efficient support before, call me impressed!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean"
    },
    {
      name: "David Asabina",
      handle: "@vidabina",
      text: "Had an issue logging in and Peer (CEO) tended to the matter within the hour. I haven't had such responsive customer service so this was quite the experience. It's refreshing to find a customer-centric open source project do so well.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
       name: "Francis Lacson",
       handle: "@francislacson",
       text: "Cal.com has really upped the ante for scheduling tools! I knew right away, even when I started using it, that it was one step above the rest. It has an intuitive interface, flexibility in customization options, and seamless integration into my workflow that makes it a must-have.",
       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Francis"
    },
    {
      name: "Farhaj Mayan",
      handle: "@farhajmayan",
      text: "As of today I'm officially a @calcom mani. The product is epic. @peer_rich where can I buy merch??",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhaj"
    },
    {
      name: "Tosin",
      handle: "@theoguyy",
      text: "@calcom is the best thing I discovered this year.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tosin"
    },
    {
       name: "David Guyon",
       handle: "@davidguyon",
       text: "Testing out as an alternative to Calendly and loving it so far. Configurable, good onboarding, simple to use. 🔥",
       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidG"
    },
    {
       name: "Alex River",
       handle: "@ariver",
       text: "Finally a scheduling tool that respects my privacy and is open source. The UI is just the icing on the cake.",
       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
       name: "Sarah Chen",
       handle: "@schen_dev",
       text: "The API is a dream for developers. We integrated Cal into our CRM in less than a day. Highly recommend!",
       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
       name: "Marc Lou",
       handle: "@marclou",
       text: "I moved from Calendly and I'm never looking back. Cal.com is faster, better, and cheaper (free!).",
       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marc"
    }
  ];

  const appIcons = [
    { id: 'cal', icon: Calendar, color: 'text-blue-500' },
    { id: 'slack', icon: MessageSquare, color: 'text-purple-500' },
    { id: 'mail', icon: Mail, color: 'text-red-500' },
    { id: 'cloud', icon: Cloud, color: 'text-sky-500' },
    { id: 'git', icon: Code, color: 'text-black' },
    { id: 'video', icon: Video, color: 'text-blue-600' },
    { id: 'stripe', icon: CreditCard, color: 'text-indigo-500' },
    { id: 'zap', icon: Zap, color: 'text-yellow-500' }
  ];

  const eventTypes = [
    { title: 'Legal Consultation', user: 'Michael Oliver', desc: 'Discuss your legal matters with our experienced attorneys in a private consultation.', duration: '30m' },
    { title: 'Design Review', user: 'Sarah Chen', desc: 'Review your latest product designs and get expert feedback on UI/UX.', duration: '45m' },
    { title: 'Discovery Call', user: 'James Wilson', desc: 'A quick intro call to understand your business needs and how we can help.', duration: '15m' },
    { title: 'Product Demo', user: 'Emma Thompson', desc: 'Detailed walkthrough of our platform features and customization options.', duration: '60m' },
    { title: 'Strategy Session', user: 'David Park', desc: 'Dive deep into your growth strategy and plan the next quarter.', duration: '90m' },
    { title: 'Fitness Coaching', user: 'Alex Rivera', desc: 'Personalized workout planning and nutritional advice for your goals.', duration: '30m' }
  ];

  const [shuffledIcons, setShuffledIcons] = React.useState(appIcons);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setShuffledIcons(prev => {
        const next = [...prev];
        // Pick 3 unique random indices
        const indices = [];
        while(indices.length < 3) {
          const r = Math.floor(Math.random() * next.length);
          if(!indices.includes(r)) indices.push(r);
        }
        
        // Hardcoded 3-way rotation: A -> B -> C -> A
        const [a, b, c] = indices;
        const temp = next[a];
        next[a] = next[c];
        next[c] = next[b];
        next[b] = temp;
        
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentEvent = eventTypes[selectedDate.getDate() % eventTypes.length];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f3f4f6] overflow-x-hidden font-sans flex flex-col items-center">
      
      {/* Navigation - Centered and Aligned with Canvas */}
      <MarketingNav />

      <div className="relative bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-200/40 overflow-hidden min-h-[calc(100vh-8rem)] w-[calc(100%-4rem)] max-w-6xl mt-32 mb-12">
        {/* Main Content Area */}

        {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 pt-12">
        <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold text-gray-500 bg-gray-100 rounded-lg">
                Cal.com launches v4.4 <ChevronRight size={12} />
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                {t('heroTitle')}
              </h1>
              <p className="text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
                {t('heroSub')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link to="/event-types" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-black text-white hover:bg-black/90 font-black px-8 h-14 text-sm rounded-xl">
                   <img src="https://www.google.com/favicon.ico" className="mr-3 w-4 h-4" alt="Google" />
                   Sign up with Google
                </Button>
              </Link>
              <Link to="/event-types" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full border-gray-200 hover:bg-gray-50 font-black px-8 h-14 text-sm rounded-xl">
                   Sign up with email <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-gray-400 font-bold">No credit card required</p>
          </motion.div>

          {/* Interactive Calendar Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex">
               {/* Left Context */}
               <div className="p-8 border-r border-gray-100 w-[40%] min-h-[400px]">
                  <motion.div 
                    key={currentEvent.user}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-6 text-primary"
                  >
                    <User size={20} className="fill-current" />
                    <span className="font-bold text-sm">{currentEvent.user}</span>
                  </motion.div>
                  <motion.h3 
                    key={currentEvent.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-black mb-4 leading-tight"
                  >
                    {currentEvent.title}
                  </motion.h3>
                  <motion.p 
                    key={currentEvent.desc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-gray-400 mb-8 font-medium leading-relaxed"
                  >
                    {currentEvent.desc}
                  </motion.p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <Clock size={14} className="text-black" /> {currentEvent.duration}
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <Globe size={14} className="text-black" /> Europe/London
                     </div>
                  </div>
               </div>
               
               {/* Right Calendar */}
               <div className="p-8 bg-gray-50/30 flex-1">
                  <div className="flex items-center justify-between mb-8">
                     <span className="font-black text-sm uppercase tracking-widest text-gray-900">
                        {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}
                     </span>
                     <div className="flex gap-2">
                        <button onClick={prevMonth} className="p-1 hover:bg-gray-200 rounded transition-colors">
                           <ChevronLeft size={16} />
                        </button>
                        <button onClick={nextMonth} className="p-1 hover:bg-gray-200 rounded transition-colors">
                           <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>
                  <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="text-[10px] font-black text-gray-300 mb-2">{d}</span>)}
                    {renderCalendarDays()}
                  </div>
               </div>
            </div>
            
            {/* Added decorative element to match screenshot better */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary/5 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-primary/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted Logos - Matching Screenshot 1 */}
      <div className="border-t border-b border-gray-100 py-12 px-6 overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center mb-10">{t('trusted')}</p>
            <div className="relative flex overflow-hidden">
              <motion.div 
                className="flex items-center gap-24 whitespace-nowrap opacity-40 grayscale pointer-events-none"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* First Set */}
                <div className="flex items-center gap-24 pr-24">
                  <span className="text-3xl font-black tracking-tighter">ramp</span>
                  <span className="text-3xl font-black tracking-tighter">PlanetScale</span>
                  <span className="text-3xl font-black tracking-tighter">coinbase</span>
                  <span className="text-3xl font-black tracking-tighter">storyblok</span>
                  <span className="text-3xl font-black tracking-tighter">A List</span>
                </div>
                {/* Duplicate Set for seamless loop */}
                <div className="flex items-center gap-24 pr-24">
                  <span className="text-3xl font-black tracking-tighter">ramp</span>
                  <span className="text-3xl font-black tracking-tighter">PlanetScale</span>
                  <span className="text-3xl font-black tracking-tighter">coinbase</span>
                  <span className="text-3xl font-black tracking-tighter">storyblok</span>
                  <span className="text-3xl font-black tracking-tighter">A List</span>
                </div>
              </motion.div>
            </div>
         </div>
      </div>

      {/* And much more section - Matching Screenshot 2 */}
      <section className="py-32 px-12 border-t border-gray-100">
         <div className="max-w-7xl mx-auto">
            <div className="mb-20 space-y-4">
                <span className="inline-block px-3 py-1 text-xs font-bold text-gray-400 bg-gray-100 rounded-lg uppercase tracking-widest">And much more</span>
                <h2 className="text-6xl font-black tracking-tighter">Everything you need to schedule with ease</h2>
            </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
             {[
               { title: '65+ languages', desc: 'Talk to anyone around the globe.', icon: <Globe size={20} /> },
               { title: 'Easy embeds', desc: 'Embed your booking page anywhere.', icon: <Layout size={20} /> },
               { title: 'Favorite apps', desc: 'Integrate with your flow.', icon: <Zap size={20} /> },
               { title: 'Privacy first', desc: 'Designed to keep information private.', icon: <Shield size={20} /> },
               { title: 'Short links', desc: 'Links are short and easy to remember.', icon: <LinkIcon size={20} /> },
               { title: 'Customization', desc: 'Customize to fit your brand.', icon: <Settings size={20} /> },
               { title: 'Cal Video', desc: 'In-house video conferencing.', icon: <Video size={20} /> },
               { title: 'Payments', desc: 'Monetize through Stripe.', icon: <CreditCard size={20} /> }
             ].map((feature, idx) => (
               <motion.div 
                  key={idx} 
                  className="group relative h-40 border border-gray-100/60 rounded-xl hover:border-black transition-all duration-500 overflow-hidden flex flex-col justify-center text-center bg-white cursor-pointer"
                  whileHover="hover"
               >
                    {/* Animated Square Nails */}
                    {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                        <motion.div 
                            key={i}
                            variants={{ hover: { opacity: 1, scale: 1 } }}
                            initial={{ opacity: 0, scale: 0 }}
                            className={`absolute w-1.5 h-1.5 bg-black/20 ${pos}`}
                        />
                    ))}

                    <div className="relative h-full w-full flex items-center justify-center">
                        {/* Front: Logo + Title */}
                        <motion.div 
                            variants={{ hover: { opacity: 0, y: -20, scale: 0.8 } }}
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center space-y-3"
                        >
                           <div className="text-gray-400 group-hover:text-black transition-colors">
                              {feature.icon}
                           </div>
                           <h3 className="text-sm font-black tracking-tight">{feature.title}</h3>
                        </motion.div>

                        {/* Back: Description */}
                        <motion.div 
                            variants={{ hover: { opacity: 1, y: 0, scale: 1 } }}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center p-4"
                        >
                           <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
                              {feature.desc}
                           </p>
                        </motion.div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* "Smarter, simpler scheduling" - Matching Screenshot 3 bottom */}
      <section className="py-32 px-6 border-t border-gray-100">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-7xl md:text-8xl font-black tracking-tighter">{t('smarterTitle')}</h2>
            <div className="flex items-center justify-center gap-4">
               <Link to="/event-types">
                  <Button size="lg" className="bg-black text-white hover:bg-black/90 font-black px-8 h-12 rounded-xl">{t('getStarted')}</Button>
               </Link>
               <Link to="/event-types">
                  <Button variant="outline" size="lg" className="border-gray-200 font-bold px-8 h-12 rounded-xl">{t('talkToSales')}</Button>
               </Link>
            </div>
            
            <div className="pt-24 grid grid-cols-2 md:grid-cols-6 items-center gap-8 opacity-40 grayscale pointer-events-none">
               {['Raycast', 'Vercel', 'supabase', 'udemy', 'Rho', 'deel.'].map(txt => (
                 <span key={txt} className="text-xs font-black italic">{txt}</span>
               ))}
            </div>
         </div>
      </section>

      {/* How it works Section - Matching Screenshot 1 middle cards */}
      <section className="py-32 px-12 bg-gray-50/50 border-t border-gray-100">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24 space-y-4">
                <span className="inline-block px-3 py-1 text-xs font-bold text-gray-400 bg-gray-100 rounded-lg">How it works</span>
                <h2 className="text-6xl font-black tracking-tighter">With us, appointment scheduling is easy</h2>
                <p className="text-gray-500 font-medium max-w-2xl mx-auto">Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { 
                   title: 'Connect your calendar', 
                   desc: "We'll handle all the cross-referencing, so you don't have to worry about double bookings.",
                   icon: <Calendar size={48} className="text-blue-500" />,
                   gradient: 'from-blue-50 to-white'
                 },
                 { 
                   title: 'Set your availability', 
                   desc: "Want to block off weekends? Set up any buffers? We make that easy.",
                   icon: <Clock size={48} className="text-emerald-500" />,
                   gradient: 'from-emerald-50 to-white'
                 },
                 { 
                   title: 'Choose how to meet', 
                   desc: "It could be a video chat, phone call, or a walk in the park!",
                   icon: <Video size={48} className="text-purple-500" />,
                   gradient: 'from-purple-50 to-white'
                 }
               ].map((card, idx) => (
                 <motion.div 
                    key={idx} 
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 flex flex-col h-full"
                 >
                    <div className={`h-48 bg-gradient-to-br ${card.gradient} rounded-3xl overflow-hidden group flex items-center justify-center`}>
                       <motion.div
                         whileHover={{ scale: 1.1, rotate: 5 }}
                         className="p-8 bg-white rounded-2xl shadow-xl shadow-black/[0.02] border border-gray-100"
                       >
                          {card.icon}
                       </motion.div>
                    </div>
                    <div className="space-y-4 flex-1">
                       <h3 className="text-2xl font-black tracking-tight">{card.title}</h3>
                       <p className="text-gray-400 text-sm font-medium leading-relaxed">{card.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Tools Section - Enhanced Parallax & Relaxing Background */}
      <motion.section 
        className="relative py-48 px-6 border-t border-gray-100 overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
         {/* Relaxing Background Element */}
         <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <motion.div 
               animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                  x: [0, 50, 0],
                  y: [0, -50, 0]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[120px]"
            />
            <motion.div 
               animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [45, 0, 45],
                  x: [0, -50, 0],
                  y: [0, 50, 0]
               }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-50/50 rounded-full blur-[120px]"
            />
         </div>

         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <motion.div 
               style={{ y: textY }}
               className="space-y-10"
            >
               <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 rounded-full">
                  App store
               </span>
               <h2 className="text-7xl font-black tracking-tighter leading-[0.85]">
                  {t('toolsTitle')}
               </h2>
               <p className="text-xl text-gray-500 max-w-md leading-relaxed font-medium">
                  {t('toolsSub')}
               </p>
               <div className="flex items-center gap-6">
                  <Link to="/event-types">
                    <Button className="bg-black text-white px-10 h-14 rounded-2xl font-black shadow-xl shadow-black/10 transition-transform hover:scale-105 active:scale-95">{t('getStarted')}</Button>
                  </Link>
                  <Link to="/event-types">
                    <Button variant="outline" className="border-gray-200 px-10 h-14 rounded-2xl font-bold bg-white/50 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95">Explore apps</Button>
                  </Link>
               </div>
            </motion.div>

            <motion.div 
                style={{ y: useTransform(toolsScrollProgress, [0, 1], [150, -150]) }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            >
               {shuffledIcons.map((app) => (
                 <motion.div 
                    layout
                    key={app.id} 
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="aspect-square bg-white border border-gray-100 rounded-2xl md:rounded-[2.5rem] p-5 md:p-7 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all bg-white/80 backdrop-blur-sm"
                 >
                    <app.icon className={`${app.color} opacity-80 w-6 h-6 md:w-8 md:h-8`} />
                 </motion.div>
               ))}
            </motion.div>
         </div>
      </motion.section>

      {/* Draggable Testimonials Section - Matching Screenshot 8 */}
      <section className="py-24 px-6 overflow-hidden bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
               <h2 className="text-4xl font-black tracking-tighter">Trusted by individuals and teams</h2>
               <div className="flex gap-2">
                 <button 
                  onClick={() => testimonialRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-900 transition-colors"
                 >
                    <ChevronLeft size={20} />
                 </button>
                 <button 
                  onClick={() => testimonialRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-black hover:bg-gray-50 transition-colors border-gray-900"
                 >
                    <ChevronRight size={20} />
                 </button>
               </div>
            </div>

            <div 
              ref={testimonialRef}
              className="overflow-x-auto scrollbar-hide"
            >
              <motion.div 
                drag="x"
                dragConstraints={testimonialRef}
                className="flex gap-6 cursor-grab active:cursor-grabbing group/container pb-8"
              >
               {[
                 { name: 'Suhail Doshi', handle: '@suhail', text: 'Cal.com is the best scheduling experience I have ever had.', avatar: 'https://i.pravatar.cc/150?u=suhail' },
                 { name: 'Guillermo Rauch', handle: '@rauchg', text: 'The flexibility of Cal.com is what sets it apart. It handles every edge case.', avatar: 'https://i.pravatar.cc/150?u=guillermo' },
                 { name: 'Lee Robinson', handle: '@leeerob', text: 'Building with Cal.com is a developer\'s dream. Unmatched customizability.', avatar: 'https://i.pravatar.cc/150?u=lee' },
                 { name: 'Amjad Masad', handle: '@amasad', text: 'We use Cal.com for all our meetings. It saved us hundreds of hours.', avatar: 'https://i.pravatar.cc/150?u=amjad' },
                 { name: 'Sahil Lavingia', handle: '@shl', text: 'Minimalist, powerful, and open-source. A truly great tool.', avatar: 'https://i.pravatar.cc/150?u=sahil' },
                 { name: 'Tobi Lütke', handle: '@tobi', text: 'Cal.com is solving scheduling at the infra level. Brilliant.', avatar: 'https://i.pravatar.cc/150?u=tobi' }
               ].map((t, i) => (
                 <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="min-w-[320px] bg-white p-8 rounded-2xl border border-gray-100 space-y-6 shadow-sm transition-all duration-300 relative overflow-hidden group-hover/container:opacity-40 hover:!opacity-100"
                 >
                    {/* The "line" aesthetic from screenshot */}
                    <div className="absolute top-0 left-6 w-[1px] h-full bg-gray-50 -z-10" />

                    <div className="flex items-center gap-3">
                       <img src={t.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt={t.name} />
                       <div>
                          <h4 className="font-bold text-xs">{t.name}</h4>
                          <p className="text-[10px] text-gray-400 font-medium">{t.handle}</p>
                       </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed italic">
                      "{t.text}"
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-500">
                       <CheckCircle2 size={10} /> Verified
                    </div>
                 </motion.div>
               ))}
              </motion.div>
            </div>
         </div>
      </section>

      {/* Wall of Love - Matching Screenshot 3 */}
      <section className="py-32 px-6 bg-gray-50/50 border-t border-gray-100 overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-6">
               <span className="inline-block px-3 py-1 text-xs font-bold text-gray-400 bg-gray-100 rounded-lg">Wall of love</span>
               <h2 className="text-7xl font-black tracking-tighter text-center">{t('loveTitle')}</h2>
               <p className="text-gray-500 font-medium">{t('loveSub')}</p>
               <div className="flex items-center justify-center gap-4">
                  <Button className="bg-black text-white px-8 h-12 rounded-xl font-black">{t('getStarted')}</Button>
                  <Button variant="outline" className="border-gray-200 px-8 h-12 rounded-xl font-bold">Book a demo</Button>
               </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {testimonials.slice(0, showAllTestimonials ? testimonials.length : 6).map((t, i) => (
                 <div key={i} className="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                       <img src={t.avatar} className="w-10 h-10 rounded-full border border-gray-100" alt={t.name} />
                       <div>
                          <h4 className="font-bold text-sm">{t.name}</h4>
                          <p className="text-xs text-gray-400 font-medium">{t.handle}</p>
                       </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed italic">"{t.text}"</p>
                 </div>
               ))}
            </div>
            <div className="mt-16 text-center">
               <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-black font-bold"
                onClick={() => setShowAllTestimonials(!showAllTestimonials)}
               >
                {showAllTestimonials ? 'Show less' : 'Show more'}
               </Button>
            </div>
         </div>
      </section>

      {/* Footer - Matching Screenshot 4 Exactly */}
      <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 text-sm">
            {/* Brand and Certs */}
            <div className="md:col-span-4 space-y-10">
               <div>
                  <span className="text-2xl font-black tracking-tighter mb-4 block">Cal.com</span>
                  <p className="text-gray-400 font-bold text-xs leading-relaxed max-w-[280px]">
                     Cal.com® and Cal™ are a registered trademark by Cal.com, Inc. All rights reserved.
                  </p>
               </div>
               
               <div className="flex gap-4 opacity-50 grayscale">
                  <span className="p-2 border border-gray-200 rounded text-[8px] font-black italic">SOC2 TYPE II</span>
                  <span className="p-2 border border-gray-200 rounded text-[8px] font-black italic">HIPAA COMPLIANT</span>
                  <span className="p-2 border border-gray-200 rounded text-[8px] font-black italic">GDPR READY</span>
               </div>

               <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed max-w-[300px]">
                  Our mission is to connect a billion people by 2031 through calendar scheduling.
               </p>

               <div className="flex gap-2">
                  <div className="relative">
                    <button 
                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                        className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        {currentLanguage} <ChevronRight size={12} className={`transition-transform ${showLangDropdown ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                    {showLangDropdown && (
                        <div className="absolute bottom-full mb-2 left-0 w-40 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
                            {languages.map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => {
                                        setCurrentLanguage(lang);
                                        setShowLangDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors ${currentLanguage === lang ? 'text-black bg-gray-50' : 'text-gray-400'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-bold text-green-500">
                     <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> All systems operational
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Downloads</h4>
                  <div className="grid grid-cols-3 gap-2 grayscale opacity-60">
                     {['iPhone', 'Android', 'Chrome', 'Safari', 'Edge', 'Firefox', 'MacOS', 'Windows', 'Linux'].map(plat => (
                        <div key={plat} className="bg-gray-50 border border-gray-100 p-2 rounded text-[8px] font-black text-center">{plat}</div>
                     ))}
                  </div>
               </div>
            </div>
            
            {/* Columns */}
            <div className="md:col-span-2 space-y-4">
               <h4 className="font-black text-gray-900">Solutions</h4>
               <ul className="space-y-3 text-gray-500 font-bold text-xs">
                  <li><a href="#" className="hover:text-black">Sales</a></li>
                  <li><a href="#" className="hover:text-black">Marketing</a></li>
                  <li><a href="#" className="hover:text-black">Talent Acquisition</a></li>
                  <li><a href="#" className="hover:text-black">Customer Success</a></li>
                  <li><a href="#" className="hover:text-black">Higher Education</a></li>
                  <li><a href="#" className="hover:text-black">Telehealth</a></li>
               </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
               <h4 className="font-black text-gray-900">Use Cases</h4>
               <ul className="space-y-3 text-gray-500 font-bold text-xs">
                  <li><a href="#" className="hover:text-black">Self-hosted</a></li>
                  <li><a href="#" className="hover:text-black">Saas</a></li>
                  <li><a href="#" className="hover:text-black">Marketplace</a></li>
                  <li><a href="#" className="hover:text-black">White-labeling</a></li>
               </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
               <h4 className="font-black text-gray-900">Resources</h4>
               <ul className="space-y-3 text-gray-500 font-bold text-xs">
                  <li><a href="#" className="hover:text-black">Affiliate Program</a></li>
                  <li><a href="#" className="hover:text-black">Help Docs</a></li>
                  <li><a href="#" className="hover:text-black">Blog</a></li>
                  <li><a href="#" className="hover:text-black">Cal Fonts</a></li>
                  <li><a href="#" className="hover:text-black">Developers</a></li>
                  <li><a href="#" className="hover:text-black">App Store</a></li>
               </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
               <h4 className="font-black text-gray-900">Company</h4>
               <ul className="space-y-3 text-gray-500 font-bold text-xs">
                  <li><a href="#" className="hover:text-black">About</a></li>
                  <li><a href="#" className="hover:text-black">Jobs</a></li>
                  <li><a href="#" className="hover:text-black">Support</a></li>
                  <li><a href="#" className="hover:text-black">Privacy</a></li>
                  <li><a href="#" className="hover:text-black">Terms</a></li>
                  <li><a href="#" className="hover:text-black">Security</a></li>
               </ul>
            </div>
          </div>
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-50 pt-8 opacity-40">
             <div className="flex gap-4">
                <span className="text-[10px] font-black">Product of the day 1st</span>
                <span className="text-[10px] font-black">Product of the week 1st</span>
                <span className="text-[10px] font-black">Product of the month 1st</span>
             </div>
             <div className="text-[10px] font-black uppercase tracking-tighter">© 2026 Cal.com, Inc. v4.4.15-d15e362</div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
};

export default HomePage;
