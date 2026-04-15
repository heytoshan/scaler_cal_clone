import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Clock, 
  Copy, 
  MoreHorizontal, 
  Trash2,
  X,
  Globe,
  Settings,
  Shield
} from 'lucide-react';
import { eventTypesAPI } from '../services/api';
import { useToast } from '../components/Toast';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const EventTypesPage = () => {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [search, setSearch] = useState('');
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    duration: 30,
    color: '#000000',
    location_type: 'google_meet',
    buffer_before: 0,
    buffer_after: 0,
    custom_questions: ''
  });

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    setLoading(true);
    try {
      const response = await eventTypesAPI.getAll();
      setEventTypes(response.data);
    } catch (error) {
      addToast('Failed to fetch event types', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        slug: event.slug,
        description: event.description || '',
        duration: event.duration,
        color: event.color,
        location_type: event.location_type || 'google_meet',
        buffer_before: event.buffer_before || 0,
        buffer_after: event.buffer_after || 0,
        custom_questions: event.custom_questions || ''
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        duration: 30,
        color: '#000000',
        location_type: 'google_meet',
        buffer_before: 0,
        buffer_after: 0,
        custom_questions: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventTypesAPI.update(editingEvent.id, formData);
        addToast('Event type updated');
      } else {
        await eventTypesAPI.create(formData);
        addToast('Event type created');
      }
      setIsModalOpen(false);
      fetchEventTypes();
    } catch (error) {
      addToast(error.response?.data?.error || 'Operation failed', 'error');
    }
  };

  const toggleStatus = async (id) => {
    try {
      await eventTypesAPI.toggle(id);
      fetchEventTypes();
    } catch (error) {
      addToast('Failed to toggle status', 'error');
    }
  };

  const deleteType = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event type?')) return;
    try {
      await eventTypesAPI.delete(id);
      addToast('Event type deleted');
      fetchEventTypes();
    } catch (error) {
      addToast('Failed to delete', 'error');
    }
  };

  const copyLink = (slug) => {
    const url = `${window.location.origin}/toshan/${slug}`;
    navigator.clipboard.writeText(url);
    addToast('Link copied to clipboard');
  };

  const filteredEvents = eventTypes.filter(et => 
    et.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-white tracking-tight">Event Types</h1>
          <p className="text-[13px] text-gray-500">Manage your scheduling configurations.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" size={14} />
              <input 
                placeholder="Search" 
                className="pl-9 w-48 h-10 bg-white/5 border border-white/10 rounded px-4 text-[13px] placeholder:text-gray-700 text-white outline-none focus:border-white/20 transition-all" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <button onClick={() => handleOpenModal()} className="h-10 px-6 font-medium bg-white text-black hover:bg-gray-200 rounded text-[13px] transition-all">
              Create
           </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[1, 2].map(i => <div key={i} className="h-40 bg-white/[0.02] rounded border border-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className={`p-6 rounded border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all ${!event.is_active && 'opacity-40 grayscale'}`}
            >
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${event.is_active ? 'bg-white' : 'bg-gray-800'}`} />
                     <span className="text-[10px] uppercase tracking-widest text-gray-500">{event.is_active ? 'Active' : 'Disabled'}</span>
                  </div>
                  <button onClick={() => toggleStatus(event.id)} className="text-gray-700 hover:text-white transition-colors">
                     <MoreHorizontal size={16} />
                  </button>
               </div>

               <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-0.5">{event.title}</h3>
                  <div className="text-[11px] text-gray-600 font-mono tracking-wider">/toshan/{event.slug}</div>
               </div>

               <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[12px] text-gray-500">
                    <div className="flex items-center gap-1.5 opacity-50">
                       <Clock size={13} />
                       {event.duration}m
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => copyLink(event.slug)} className="text-[11px] font-medium text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                       Link
                    </button>
                    <button onClick={() => handleOpenModal(event)} className="p-1.5 text-gray-700 hover:text-white transition-colors">
                       <Settings size={15} />
                    </button>
                    <button onClick={() => deleteType(event.id)} className="p-1.5 text-gray-700 hover:text-red-400 transition-colors">
                       <Trash2 size={15} />
                    </button>
                  </div>
               </div>
            </div>
          ))}

          <button 
            onClick={() => handleOpenModal()}
            className="flex flex-col items-center justify-center p-8 rounded border border-dashed border-white/10 bg-transparent hover:bg-white/[0.02] hover:border-white/20 transition-all group"
          >
             <Plus size={20} className="text-gray-700 group-hover:text-white mb-2 transition-colors" />
             <span className="text-[12px] font-medium text-gray-700 group-hover:text-white transition-colors uppercase tracking-widest">New Event Type</span>
          </button>
        </div>
      )}

      {/* Modal - Strictly Professional & Minimal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
              className="relative w-full max-w-lg border border-white/10 bg-[#0a0a0a] rounded shadow-2xl overflow-hidden"
            >
              <div className="border-b border-white/5 px-8 pt-8 pb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium text-white">{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
                  <p className="text-[11px] text-gray-600 uppercase tracking-widest mt-1">Fill out the following parameters</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-700 hover:text-white transition-colors"><X size={18} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Title</label>
                    <input 
                      required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Slug</label>
                    <input 
                      required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20 transition-all font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Duration (m)</label>
                      <input 
                        type="number" value={formData.duration} onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20 transition-all px-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Location</label>
                      <select 
                        value={formData.location_type} onChange={(e) => setFormData({...formData, location_type: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20 transition-all appearance-none"
                      >
                         <option value="google_meet" className="bg-black">Google Meet</option>
                         <option value="zoom" className="bg-black">Zoom</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Buffer Before (m)</label>
                      <input 
                        type="number" value={formData.buffer_before} onChange={(e) => setFormData({...formData, buffer_before: parseInt(e.target.value) || 0})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20 transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Buffer After (m)</label>
                      <input 
                        type="number" value={formData.buffer_after} onChange={(e) => setFormData({...formData, buffer_after: parseInt(e.target.value) || 0})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded h-11 px-4 text-[13px] text-white outline-none focus:border-white/20 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Custom Questions (JSON)</label>
                    <textarea 
                      placeholder='[{"label": "What is your website?", "placeholder": "https://..."}]'
                      value={formData.custom_questions} onChange={(e) => setFormData({...formData, custom_questions: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded p-4 text-[13px] text-white outline-none focus:border-white/20 transition-all min-h-[80px] font-mono"
                    />
                    <p className="text-[9px] text-gray-700 uppercase tracking-tighter">Enter as JSON array of objects with "label" and "placeholder"</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-gray-600">Description</label>
                    <textarea 
                      value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded p-4 text-[13px] text-white outline-none focus:border-white/20 transition-all min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 text-[12px] font-medium text-gray-600 hover:text-white uppercase tracking-widest">Cancel</button>
                  <button type="submit" className="h-11 px-8 font-medium bg-white text-black hover:bg-gray-200 rounded text-[13px] transition-all">Submit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventTypesPage;
