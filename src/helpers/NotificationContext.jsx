
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({ message: '', type: '', duration: 3000 });

    const showNotification = (message, type = 'success', duration = 3000) => {
        setNotification({ message, type, duration });
    };

    const hideNotification = () => {
        setNotification({ message: '', type: '', duration: 3000 });
    };

    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
