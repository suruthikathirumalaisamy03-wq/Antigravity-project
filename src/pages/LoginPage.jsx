import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
            navigate('/');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 w-full max-w-md text-center"
            >
                <h1 className="text-3xl font-bold mb-6">Event Manager</h1>
                <p className="mb-6 text-gray-300">Welcome! Please enter your name to continue.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="text-lg"
                    />
                    <button type="submit" className="btn-primary w-full py-3 text-lg">
                        Enter
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
