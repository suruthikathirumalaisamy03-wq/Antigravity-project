import { createContext, useState, useContext, useEffect } from 'react';

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const addEvent = (event) => {
        setEvents([...events, { ...event, id: Date.now().toString() }]);
    };

    const deleteEvent = (id) => {
        setEvents(events.filter((e) => e.id !== id));
    };

    const departments = [
        'BE EEE',
        'ECE',
        'IT',
        'MCA',
        'MBA',
        'VISCOM',
        'FT',
        'BT',
    ];

    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent, departments }}>
            {children}
        </EventContext.Provider>
    );
};
