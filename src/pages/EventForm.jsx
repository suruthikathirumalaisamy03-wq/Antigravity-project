import { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EventForm() {
    const { addEvent, departments } = useEvents();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        resourcePerson: '',
        date: '',
        time: '',
        participants: '',
        venue: '',
        welcomeAddress: '',
        voteOfThanks: '',
        department: departments[0],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent(formData);
        navigate('/');
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8"
            >
                <h2 className="text-2xl font-bold mb-6">Add New Event</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="name" placeholder="Event Name" onChange={handleChange} required />
                    <input name="resourcePerson" placeholder="Resource Person Name" onChange={handleChange} required />

                    <div className="flex gap-4">
                        <input name="date" type="date" onChange={handleChange} required />
                        <input name="time" type="time" onChange={handleChange} required />
                    </div>

                    <input name="participants" type="number" placeholder="No. of Participants" onChange={handleChange} required />
                    <input name="venue" placeholder="Venue" onChange={handleChange} required />
                    <input name="welcomeAddress" placeholder="Welcome Address Given By" onChange={handleChange} required />
                    <input name="voteOfThanks" placeholder="Vote of Thanks Given By" onChange={handleChange} required />

                    <select name="department" onChange={handleChange} value={formData.department} required>
                        {departments.map((dept) => (
                            <option key={dept} value={dept} className="text-black">{dept}</option>
                        ))}
                    </select>

                    <div className="flex gap-4 mt-4">
                        <button type="button" onClick={() => navigate('/')} className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary flex-1">
                            Save Event
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
