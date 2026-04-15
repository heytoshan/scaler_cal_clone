import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Search, 
  Mail, 
  User, 
  MoreHorizontal,
  RotateCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { bookingsAPI } from '../services/api';
import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [search, setSearch] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await bookingsAPI.getAll({ period: activeTab === 'past' ? 'past' : 'upcoming' });
      let data = res.data;
      if (activeTab === 'cancelled') {
        data = data.filter(b => b.status === 'cancelled');
      } else if (activeTab === 'upcoming') {
        data = data.filter(b => b.status === 'confirmed');
      }
      setBookings(data);
    } catch (err) {
      addToast('Failed to fetch bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    const reason = window.prompt("Reason for cancellation:");
    if (reason === null) return;
    try {
      await bookingsAPI.cancel(id, reason);
      addToast('Booking cancelled successfully');
      fetchBookings();
    } catch (err) {
      addToast('Failed to cancel booking', 'error');
    }
  };

  const handleReschedule = (booking) => {
    navigate(`/toshan/${booking.event_slug}?rescheduleUid=${booking.uid}`);
  };

  const filtered = bookings.filter(b => 
    b.booker_name.toLowerCase().includes(search.toLowerCase()) ||
    b.booker_email.toLowerCase().includes(search.toLowerCase()) ||
    (b.event_title && b.event_title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-1">
           <h1 className="text-2xl font-medium text-white tracking-tight">Bookings</h1>
           <p className="text-[13px] text-gray-500">Overview of scheduled sessions and history.</p>
        </div>
        <div className="relative group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" size={14} />
           <input 
             placeholder="Search bookings" 
             className="pl-9 w-64 h-10 bg-white/5 border border-white/10 rounded px-4 text-[13px] text-white outline-none focus:border-white/20 transition-all font-medium" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="flex border-b border-white/5 gap-12">
        {['upcoming', 'past', 'cancelled'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" 
              />
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-24 bg-white/[0.02] rounded border border-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="border border-white/5 rounded overflow-hidden divide-y divide-white/5 bg-white/[0.01]">
          {filtered.map((booking) => (
            <div 
              key={booking.id}
              className="group p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 transition-all hover:bg-white/[0.01]"
            >
              <div className="flex items-start gap-10">
                 <div className="flex flex-col items-center justify-center h-14 w-14 rounded bg-white/5 border border-white/10 text-gray-600">
                    <span className="text-[9px] uppercase tracking-widest font-medium mb-0.5">
                       {format(parseISO(booking.start_time), 'MMM')}
                    </span>
                    <span className="text-lg text-white font-medium">
                       {format(parseISO(booking.start_time), 'd')}
                    </span>
                 </div>

                 <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                       <h3 className="text-[15px] font-medium text-white truncate uppercase tracking-wide">{booking.event_title || 'Meeting'}</h3>
                       <div className="flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-gray-800" />
                          <span className="text-[9px] font-medium uppercase tracking-widest text-gray-700">{booking.status}</span>
                       </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] font-medium text-gray-600 uppercase tracking-[0.1em]">
                       <div className="flex items-center gap-2">
                          <Clock size={13} className="opacity-40" />
                          {format(parseISO(booking.start_time), 'h:mm a')}
                       </div>
                       <div className="flex items-center gap-2">
                          <User size={13} className="opacity-40" />
                          {booking.booker_name}
                       </div>
                       <div className="flex items-center gap-2">
                          <Mail size={13} className="opacity-40" />
                          {booking.booker_email}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4 self-end lg:self-center">
                 {activeTab === 'upcoming' && booking.status === 'confirmed' && (
                   <>
                    <button 
                      className="h-9 px-5 text-[11px] font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded border border-white/10 transition-all uppercase tracking-widest flex items-center gap-2"
                      onClick={() => handleReschedule(booking)}
                    >
                       <RotateCcw className="h-3 w-3" /> Reschedule
                    </button>
                    <button 
                      className="h-9 px-5 text-[11px] font-medium text-gray-700 hover:text-white transition-all uppercase tracking-widest"
                      onClick={() => handleCancel(booking.id)}
                    >
                       Cancel
                    </button>
                   </>
                 )}
                 <button className="p-2 text-gray-900 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                 </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-40 text-center space-y-6">
               <Calendar size={32} strokeWidth={1} className="text-gray-900 mx-auto" />
               <p className="text-[12px] font-medium text-gray-800 uppercase tracking-[0.3em]">
                 Empty records
               </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
