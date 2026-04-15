import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, User, CheckCircle2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { bookingsAPI } from '../services/api';
import { motion } from 'framer-motion';

export default function BookingConfirmation() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await bookingsAPI.getByUid(uid);
        setBooking(res.data);
      } catch (err) {
        setError('Could not fetch booking confirmation.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [uid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="h-6 w-6 animate-spin rounded-full border border-white/10 border-t-white" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-8">
          <h2 className="text-xl font-medium text-white uppercase tracking-widest">Entry Hidden</h2>
          <button onClick={() => navigate('/')} className="text-[12px] font-medium uppercase tracking-[0.3em] text-gray-500 underline">Dismiss</button>
        </div>
      </div>
    );
  }

  const startTime = parseISO(booking.start_time);
  const endTime = parseISO(booking.end_time);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-12 md:p-24 selection:bg-white selection:text-black">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-lg"
      >
        <div className="bg-black border border-white/5 p-16 text-center space-y-16">
          <div className="space-y-4">
            <h1 className="text-2xl font-medium text-white tracking-widest uppercase mb-2">Confirmed</h1>
            <p className="text-[11px] font-medium text-gray-600 uppercase tracking-[0.4em]">
              Invitation dispatched to recipient
            </p>
          </div>

          <div className="text-left space-y-10 py-12 border-y border-white/5">
             <div className="space-y-2">
                <div className="text-xl font-medium text-white tracking-tight leading-none uppercase">{booking.event_title}</div>
                <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest pt-4">
                   {format(startTime, 'EEEE, MMMM d, yyyy')}
                </div>
                <div className="text-[14px] font-medium text-white pt-2">
                   {format(startTime, 'h:mm a')} — {format(endTime, 'h:mm a')}
                </div>
             </div>

             <div className="space-y-5 text-[10px] font-medium uppercase tracking-[0.3em] text-gray-700">
                <div className="flex items-center gap-6">
                   <MapPin size={14} className="opacity-20" />
                   <span>Virtual Workspace</span>
                </div>
                <div className="flex items-center gap-6">
                   <User size={14} className="opacity-20" />
                   <span>{booking.booker_name} & Administrator</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => navigate(`/toshan/${booking.event_slug}?rescheduleUid=${booking.uid}`)}
               className="h-12 bg-white text-black font-medium text-[10px] uppercase tracking-[0.3em] flex items-center justify-center hover:bg-gray-200 transition-all rounded-sm"
             >
               Reschedule
             </button>
             <button 
               className="h-12 border border-white/5 text-gray-700 hover:text-white font-medium text-[10px] uppercase tracking-[0.3em] transition-all rounded-sm"
               onClick={() => navigate('/')}
             >
               Dismiss
             </button>
          </div>
        </div>

        <div className="mt-16 text-center opacity-10">
           <div className="text-[9px] font-medium text-white uppercase tracking-[0.5em] flex items-center justify-center gap-3">
              <CheckCircle2 size={12} /> Formal Operation Completed
           </div>
        </div>
      </motion.div>
    </div>
  );
}
