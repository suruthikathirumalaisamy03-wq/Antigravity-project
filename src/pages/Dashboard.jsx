import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LogOut, Calendar, MapPin, Users, User } from 'lucide-react';

export default function Dashboard() {
    const { events, deleteEvent, departments } = useEvents();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [filterDept, setFilterDept] = useState('All');

    const filteredEvents = filterDept === 'All'
        ? events
        : events.filter(e => e.department === filterDept);

    return (
        <div className="min-h-screen p-8">
            <header className="flex justify-between items-center mb-8 glass-card p-4">
                <div>
                    <h1 className="text-2xl font-bold">Event Dashboard</h1>
                    <p className="text-sm opacity-80">Welcome, {user?.name}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full transition" title="Logout">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="max-w-xs"
                >
                    <option value="All" className="text-black">All Departments</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept} className="text-black">{dept}</option>
                    ))}
                </select>

                <button onClick={() => navigate('/add')} className="btn-primary flex items-center gap-2">
                    <Plus size={18} /> Add Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card p-6 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => deleteEvent(event.id)} className="text-red-400 hover:text-red-300">Delete</button>
                            </div>

                            <div className="mb-4">
                                <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 border border-white/20">
                                    {event.department}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-white">{event.name}</h3>

                            <div className="text-sm space-y-2 opacity-90">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-secondary" />
                                    <span>{event.resourcePerson}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-secondary" />
                                    <span>{event.date} at {event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-secondary" />
                                    <span>{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-secondary" />
                                    <span>{event.participants} Participants</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
                                <p>Welcome: {event.welcomeAddress}</p>
                                <p>Vote of Thanks: {event.voteOfThanks}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredEvents.length === 0 && (
                    <div className="col-span-full text-center py-20 opacity-50">
                        <p className="text-xl">No events found. Add one to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
