import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Share2, Globe, AlertCircle } from 'lucide-react';
import { userAPI } from '../services/api';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';

export default function PublicProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await userAPI.getByUsername(username);
        setUser(userRes.data);
        
        const eventsRes = await userAPI.getEventTypes(username);
        setEventTypes(eventsRes.data);
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] font-sans flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-200/40 overflow-hidden p-16 text-center space-y-10">
          <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-inner">
            <AlertCircle className="h-10 w-10 text-gray-300" />
          </div>
          <div className="space-y-4">
             <h3 className="text-4xl font-black tracking-tighter text-black">User not found</h3>
             <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-[280px] mx-auto">
                The link you followed might be broken or the user might have been deactivated.
             </p>
          </div>
          <div className="pt-4">
             <Button 
                className="bg-black text-white px-10 h-14 rounded-2xl font-black shadow-xl shadow-black/10 transition-transform hover:scale-105 active:scale-95" 
                onClick={() => navigate('/')}
             >
                Go to Homepage
             </Button>
          </div>
          <div className="pt-8 opacity-20 grayscale pointer-events-none">
             <span className="text-lg font-black tracking-tighter">Cal.com</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative mb-6">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} className="h-24 w-24 rounded-full border-4 border-background shadow-xl" />
            ) : (
              <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-3xl font-black text-primary-foreground shadow-xl">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 border-4 border-background" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">{user.name}</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium">
            <Globe size={14} />
            <span>cal.com/{user.username}</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {eventTypes.length === 0 ? (
            <Card className="text-center p-12 border-dashed">
              <p className="text-muted-foreground">No public event types available.</p>
            </Card>
          ) : (
            eventTypes.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <button 
                  onClick={() => navigate(`/${username}/${event.slug}`)}
                  className="w-full text-left group"
                >
                  <Card 
                  className="transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden"
                  style={{ borderColor: `${event.color}30` }}
                >
                    <div className="flex items-center">
                      <div className="w-2 self-stretch" style={{ backgroundColor: event.color }} />
                      <div className="flex-1 p-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground font-medium">
                            <Clock size={14} />
                            <span>{event.duration} minutes</span>
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full border flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </button>
              </motion.div>
            ))
          )}
        </motion.div>
        
        <div className="mt-16 text-center">
          <Button variant="ghost" size="sm" className="text-muted-foreground rounded-full">
            <Share2 className="mr-2 h-3 w-3" /> Share Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
