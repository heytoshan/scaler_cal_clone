import { useState, useEffect } from 'react';
import { Globe, Save, Plus, Trash2, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { availabilityAPI } from '../services/api';
import { useToast } from '../components/Toast';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailabilityPage() {
  const [schedules, setSchedules] = useState([]);
  const [activeSchedule, setActiveSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [overrides, setOverrides] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await availabilityAPI.getSchedules();
      setSchedules(response.data);
      if (response.data.length > 0) {
        const schedule = response.data.find(s => s.is_default) || response.data[0];
        setActiveSchedule(schedule);
        setOverrides(schedule.overrides || []);
      }
    } catch (error) {
      addToast('Failed to fetch schedules', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSchedule = (id) => {
    const sched = schedules.find(s => s.id === id);
    setActiveSchedule(sched);
    setOverrides(sched.overrides || []);
  };

  const handleCreateSchedule = async () => {
    const name = window.prompt("Schedule identification:");
    if (!name) return;
    try {
      await availabilityAPI.createSchedule({ name, timezone: 'Asia/Kolkata' });
      addToast('New schedule created');
      fetchSchedules();
    } catch (error) {
      addToast('Failed to create schedule', 'error');
    }
  };

  const handleCreateOverride = async () => {
    const date = window.prompt("Enter date (YYYY-MM-DD):");
    if (!date) return;
    try {
      await availabilityAPI.addOverride({
        schedule_id: activeSchedule.id,
        specific_date: date,
        is_blocked: true
      });
      addToast('Date override registered');
      fetchSchedules();
    } catch (error) {
      addToast('Failed to add override', 'error');
    }
  };

  const handleDeleteOverride = async (id) => {
    try {
      await availabilityAPI.deleteOverride(id);
      addToast('Override removed');
      fetchSchedules();
    } catch (error) {
      addToast('Failed to remove override', 'error');
    }
  };

  const handleRuleChange = (dayIndex, field, value) => {
    const updatedSchedule = { ...activeSchedule };
    const ruleIndex = updatedSchedule.rules.findIndex(r => r.day_of_week === dayIndex);
    
    if (ruleIndex >= 0) {
      updatedSchedule.rules[ruleIndex] = {
        ...updatedSchedule.rules[ruleIndex],
        [field]: value
      };
    } else {
      updatedSchedule.rules.push({
        day_of_week: dayIndex,
        start_time: '09:00',
        end_time: '17:00',
        is_active: field === 'is_active' ? value : true,
        [field]: value
      });
    }
    
    setActiveSchedule(updatedSchedule);
  };

  const saveRules = async () => {
    if (!activeSchedule) {
      addToast('No active schedule to save', 'error');
      return;
    }

    try {
      setLoading(true);
      await availabilityAPI.updateSchedule(activeSchedule.id, { 
        timezone: activeSchedule.timezone,
        name: activeSchedule.name
      });
      await availabilityAPI.updateRules(activeSchedule.id, activeSchedule.rules);
      addToast('Availability rules updated successfully');
      await fetchSchedules();
    } catch (error) {
      console.error(error);
      addToast('Failed to update availability', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="space-y-12">
      <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
      <div className="h-96 w-full bg-white/5 rounded animate-pulse" />
    </div>
  );

  return (
    <div className="space-y-16 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-1">
           <h1 className="text-2xl font-medium text-white tracking-tight">Availability</h1>
           <p className="text-[13px] text-gray-500">Configure your operational hours and exclusions.</p>
        </div>
        <button onClick={saveRules} className="h-10 px-8 font-medium bg-white text-black hover:bg-gray-200 rounded text-[13px] transition-all">
           Save Changes
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-16">
        <div className="space-y-16">
          <div className="border border-white/10 rounded overflow-hidden bg-white/[0.01] divide-y divide-white/5">
            <div className="p-8 bg-white/[0.01]">
               <div className="flex items-center gap-5">
                  <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-gray-400">
                     <Clock size={16} />
                  </div>
                  <div>
                     <input 
                       value={activeSchedule?.name || ''} 
                       onChange={(e) => setActiveSchedule({...activeSchedule, name: e.target.value})}
                       className="bg-transparent border-transparent px-0 font-medium text-lg text-white h-auto focus:border-transparent focus:ring-0 outline-none"
                     />
                     <div className="flex items-center gap-2 text-[10px] font-medium text-gray-600 uppercase tracking-widest mt-0.5">
                        <Globe size={11} /> {activeSchedule?.timezone}
                     </div>
                  </div>
               </div>
            </div>

            {DAYS.map((day, index) => {
              const rule = activeSchedule.rules.find(r => r.day_of_week === index);
              const isActive = rule?.is_active ?? false;
              
              return (
                <div key={day} className="flex items-center justify-between p-8 group transition-colors hover:bg-white/[0.01]">
                  <div className="flex items-center gap-8 w-48">
                     <button 
                       onClick={() => handleRuleChange(index, 'is_active', !isActive)}
                       className={`relative inline-flex h-4.5 w-8.5 items-center rounded-full transition-all focus:outline-none ${isActive ? 'bg-white' : 'bg-gray-900 border border-white/5'}`}
                     >
                       <span className={`inline-block h-3 w-3 transform rounded-full transition-transform ${isActive ? 'translate-x-[20px] bg-black' : 'translate-x-[4px] bg-gray-600'}`} />
                     </button>
                     <span className={`text-[13px] font-medium tracking-tight ${isActive ? 'text-white' : 'text-gray-700'}`}>{day}</span>
                  </div>

                  {isActive ? (
                    <div className="flex items-center gap-4">
                      <input 
                        type="time" 
                        value={rule.start_time} 
                        onChange={(e) => handleRuleChange(index, 'start_time', e.target.value)}
                        className="w-24 h-9 bg-white/5 border border-white/10 text-[12px] text-white text-center rounded outline-none"
                      />
                      <span className="text-gray-800">&ndash;</span>
                      <input 
                        type="time" 
                        value={rule.end_time} 
                        onChange={(e) => handleRuleChange(index, 'end_time', e.target.value)}
                        className="w-24 h-9 bg-white/5 border border-white/10 text-[12px] text-white text-center rounded outline-none"
                      />
                    </div>
                  ) : (
                    <div className="text-[10px] font-medium text-gray-800 uppercase tracking-widest">
                      Disconnected
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="text-md font-medium text-white mb-0.5 tracking-tight">Exclusions</h3>
                  <p className="text-[12px] text-gray-600">Register specific dates for unavailability.</p>
               </div>
               <button onClick={handleCreateOverride} className="h-9 px-5 border border-white/10 bg-white/5 hover:bg-white/10 text-[12px] text-gray-400 hover:text-white transition-all rounded font-medium uppercase tracking-widest">
                  Add Exclusion
               </button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
               {overrides.length > 0 ? overrides.map((over) => (
                 <div key={over.id} className="p-4 bg-white/[0.02] border border-white/5 rounded flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="h-9 w-9 bg-white/5 rounded flex items-center justify-center text-gray-600">
                          <CalendarIcon size={16} />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[13px] font-medium text-white">{format(parseISO(over.specific_date), 'MMM d, yyyy')}</span>
                          <span className="text-[9px] font-medium uppercase tracking-widest text-gray-700">Blocked</span>
                       </div>
                    </div>
                    <button onClick={() => handleDeleteOverride(over.id)} className="p-2 text-gray-800 hover:text-white transition-colors">
                       <Trash2 size={14} />
                    </button>
                 </div>
               )) : (
                 <div className="col-span-full py-12 border border-dashed border-white/10 rounded text-center">
                    <p className="text-[12px] text-gray-700">No active exclusions registered.</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
           <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600">Schedules</span>
              <button onClick={handleCreateSchedule} className="p-1 text-gray-700 hover:text-white transition-all"><Plus size={14} /></button>
           </div>
           <div className="space-y-2">
              {schedules.map(sched => {
                 const isSelected = activeSchedule?.id === sched.id;
                 return (
                   <button 
                     key={sched.id}
                     onClick={() => handleSelectSchedule(sched.id)}
                     className={`w-full flex items-center justify-between p-4 rounded transition-all border ${isSelected ? 'bg-white/[0.05] border-white/10' : 'bg-transparent border-transparent opacity-40 hover:opacity-100'}`}
                   >
                     <div className="text-left">
                        <div className="text-[13px] font-medium text-white tracking-tight">{sched.name}</div>
                        <div className="text-[9px] text-gray-700 uppercase tracking-widest mt-0.5">Primary</div>
                     </div>
                     {isSelected && <CheckCircle2 size={14} className="text-white" />}
                   </button>
                 );
              })}
           </div>
        </div>
      </div>
    </div>
  );
}
