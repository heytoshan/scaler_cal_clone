import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, Clock, ChevronLeft, ChevronRight, Video, Globe, CheckCircle2, RotateCcw } from 'lucide-react';
import { 
  format, addMonths, subMonths, getDaysInMonth, startOfMonth, 
  getDay, isSameDay, isBefore, startOfToday, parseISO, isSameMonth
} from 'date-fns';
import { eventTypesAPI, availabilityAPI, bookingsAPI } from '../services/api';
import { useToast } from '../components/Toast';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function PublicBookingPage() {
  const { username, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const rescheduleUid = queryParams.get('rescheduleUid');
  
  const [eventType, setEventType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [calendarTimezone, setCalendarTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  
  const [step, setStep] = useState('calendar'); 
  const [formData, setFormData] = useState({ name: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEventType();
  }, [slug]);

  useEffect(() => {
    if (selectedDate && eventType) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, eventType]);

  const fetchEventType = async () => {
    try {
      const res = await eventTypesAPI.getBySlug(slug);
      if (res.data.username !== username) {
        setError('Event not found for this user');
        return;
      }
      setEventType(res.data);
    } catch (err) {
      setError('Event type not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (date) => {
    setLoadingSlots(true);
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const res = await availabilityAPI.getSlots(dateStr, slug);
      setAvailableSlots(res.data.slots || []);
      if (res.data.timezone) setCalendarTimezone(res.data.timezone);
    } catch (err) {
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleNextStep = () => setStep('form');
  const handleBook = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Combine regular notes and custom question responses
      const combinedNotes = [
        formData.notes,
        ...(formData.extra_responses ? Object.entries(formData.extra_responses).map(([q, a]) => `${q}: ${a}`) : [])
      ].filter(Boolean).join('\n\n');

      const res = await bookingsAPI.create({
        event_type_id: eventType.id,
        booker_name: formData.name,
        booker_email: formData.email,
        start_time: selectedTimeSlot.startTime,
        end_time: selectedTimeSlot.endTime,
        notes: combinedNotes,
        rescheduleUid: rescheduleUid
      });
      navigate(`/booking/confirmation/${res.data.uid}`);
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to complete booking', 'error');
      setIsSubmitting(false);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  const today = startOfToday();

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isPast = isBefore(date, today);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isTodayDate = isSameDay(date, today);
      
      days.push(
        <button 
          key={i} 
          disabled={isPast}
          onClick={() => setSelectedDate(date)}
          className={`
            h-10 w-10 md:h-11 md:w-11 rounded text-[13px] font-medium transition-all relative
            ${isPast ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}
            ${isSelected ? 'bg-black text-white hover:bg-black' : ''}
            ${isTodayDate && !isSelected ? 'border border-gray-200 text-black' : ''}
          `}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-white"><div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" /></div>;
  if (error || !eventType) return <div className="flex min-h-screen items-center justify-center p-4 text-center bg-white"><div className="max-w-sm space-y-8"><h2 className="text-xl font-medium uppercase tracking-widest">{error}</h2><button onClick={() => navigate('/')} className="text-[12px] font-medium uppercase tracking-[0.2em] underline">Return Home</button></div></div>;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-10 md:p-20 selection:bg-black selection:text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="border border-black/[0.05] rounded shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden bg-white">
          <div className="flex flex-col md:flex-row min-h-[640px]">
            {/* Left Context Side */}
            <div className="md:w-[380px] p-16 border-b md:border-b-0 md:border-r border-black/[0.05] space-y-12">
              <div className="space-y-4">
                 <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">{username}</div>
                 <h1 className="text-2xl font-medium tracking-tight leading-none text-black">{eventType.title}</h1>
                 <div className="flex items-center gap-4 text-[11px] font-medium text-gray-600 uppercase tracking-widest pt-4">
                   <Clock size={13} strokeWidth={2} />
                   <span>{eventType.duration} Minutes</span>
                 </div>
              </div>

              <p className="text-[14px] text-gray-500 leading-relaxed font-normal">
                {eventType.description || "Schedule a formal meeting with the requested party."}
              </p>

              {selectedDate && selectedTimeSlot && (
                 <div className="pt-12 border-t border-black/[0.05] space-y-4">
                    <div className="flex items-start gap-4">
                      <CalendarIcon size={16} className="mt-1 text-gray-400" />
                      <div className="font-medium text-md tracking-tight text-black">
                        {format(selectedDate, 'EEEE, MMMM d, yyyy')}<br/>
                        <span className="text-gray-400 text-[14px]">{format(parseISO(selectedTimeSlot.startTime), 'h:mm a')} - {format(parseISO(selectedTimeSlot.endTime), 'h:mm a')}</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest flex items-center gap-2 pl-8">
                      <Globe size={11} /> {calendarTimezone}
                    </div>
                 </div>
              )}
            </div>

            {/* Right Interactive Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {step === 'calendar' ? (
                  <motion.div 
                    key="calendar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col lg:flex-row"
                  >
                    <div className="flex-1 p-16">
                      <div className="flex items-center justify-between mb-16">
                        <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-600">Select Date</h2>
                        <div className="flex gap-2">
                           <button onClick={prevMonth} disabled={isSameMonth(currentMonth, today)} className="p-2 hover:bg-gray-50 transition-all rounded disabled:opacity-20">
                              <ChevronLeft size={16} />
                           </button>
                           <button onClick={nextMonth} className="p-2 hover:bg-gray-50 transition-all rounded">
                              <ChevronRight size={16} />
                           </button>
                        </div>
                      </div>

                      <div className="max-w-xs mx-auto">
                        <div className="font-medium text-[13px] mb-8 uppercase tracking-[0.2em] text-center">{format(currentMonth, 'MMMM yyyy')}</div>
                        <div className="grid grid-cols-7 gap-y-2 text-center">
                           {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                             <div key={day} className="text-[10px] font-medium text-gray-300 uppercase mb-6">{day}</div>
                           ))}
                           {renderCalendar()}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedDate && (
                        <motion.div 
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 340, opacity: 1 }}
                          className="border-l border-black/[0.05] bg-[#fdfdfd] p-16 overflow-y-auto max-h-[640px]"
                        >
                          <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-10">
                            Availability
                          </h3>
                          <div className="space-y-2">
                             {loadingSlots ? (
                               <div className="flex justify-center py-20"><div className="h-5 w-5 animate-spin rounded-full border border-black border-t-transparent" /></div>
                             ) : availableSlots.length === 0 ? (
                               <div className="text-center py-12 text-[11px] font-medium text-gray-400 uppercase tracking-widest">No availability</div>
                             ) : (
                               availableSlots.map((slot, idx) => (
                                 <div key={idx} className="space-y-2">
                                    {selectedTimeSlot?.startTime === slot.startTime ? (
                                       <div className="flex flex-col gap-2">
                                          <button className="w-full h-11 bg-gray-100 text-gray-400 font-medium text-[12px] rounded uppercase tracking-widest" onClick={() => setSelectedTimeSlot(null)}>
                                            {format(parseISO(slot.startTime), 'h:mm a')}
                                          </button>
                                          <button className="w-full h-11 bg-black text-white font-medium text-[12px] rounded uppercase tracking-[0.2em] transition-all active:scale-[0.98]" onClick={handleNextStep}>Confirm</button>
                                       </div>
                                    ) : (
                                       <button 
                                        className="w-full h-11 border border-black/[0.05] hover:border-black/20 text-black font-medium text-[12px] transition-all rounded"
                                        onClick={() => setSelectedTimeSlot(slot)}
                                       >
                                         {format(parseISO(slot.startTime), 'h:mm a')}
                                       </button>
                                    )}
                                 </div>
                               ))
                             )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-20 h-full flex flex-col justify-center max-w-lg mx-auto"
                  >
                    <button onClick={() => setStep('calendar')} className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400 hover:text-black mb-12 transition-colors">
                       <ChevronLeft size={14} /> Retrace
                    </button>
                    <h2 className="text-xl font-medium mb-12 uppercase tracking-widest text-black">Booking Details</h2>
                    <form onSubmit={handleBook} className="space-y-10">
                       <div className="space-y-3">
                          <label className="text-[10px] font-medium uppercase tracking-widest text-gray-400">FullName</label>
                          <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full h-11 bg-white border-b border-black/[0.05] focus:border-black outline-none transition-all text-[13px] font-medium" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-medium uppercase tracking-widest text-gray-400">Email Address</label>
                          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full h-11 bg-white border-b border-black/[0.05] focus:border-black outline-none transition-all text-[13px] font-medium" />
                       </div>
                       {/* Dynamic Custom Questions */}
                       {eventType.custom_questions && eventType.custom_questions.split(',').map((q, i) => (
                         <div key={i} className="space-y-3">
                            <label className="text-[10px] font-medium uppercase tracking-widest text-gray-400">{q.trim()}</label>
                            <input 
                              required 
                              name={`q-${i}`}
                              className="w-full h-11 bg-white border-b border-black/[0.05] focus:border-black outline-none transition-all text-[13px] font-medium" 
                              onChange={(e) => {
                                const newNotes = { ...formData.extra_responses, [q.trim()]: e.target.value };
                                setFormData({ ...formData, extra_responses: newNotes });
                              }}
                            />
                         </div>
                       ))}

                       <div className="space-y-3">
                          <label className="text-[10px] font-medium uppercase tracking-widest text-gray-400">Notes (Optional)</label>
                          <textarea 
                            className="w-full border-b border-black/[0.05] bg-white pt-4 pb-2 text-[13px] font-medium focus:border-black outline-none transition-all min-h-[80px] resize-none"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          />
                       </div>
                       <button 
                         type="submit" 
                         disabled={isSubmitting} 
                         className="w-full h-12 bg-black text-white text-[11px] font-medium rounded uppercase tracking-[0.3em] transition-all active:scale-[0.98] disabled:opacity-50"
                       >
                           {isSubmitting ? "Finalizing..." : "Register Booking"}
                       </button>
                    </form>
                  </motion.div>
                ) }
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 opacity-10">
           <div className="text-[9px] font-medium uppercase tracking-[0.4em] text-black">
              Formal Protocol Integration
           </div>
        </div>
      </motion.div>
    </div>
  );
}
