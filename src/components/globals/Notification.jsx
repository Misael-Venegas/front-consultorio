// src/components/globals/Notification.jsx
"use client";
import React, { useEffect } from 'react';
import { useNotification } from '@/helpers/NotificationContext';

const Notification = () => {
    const { notification, hideNotification } = useNotification();

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                hideNotification();
            }, notification.duration);
            return () => clearTimeout(timer);
        }
    }, [notification, hideNotification]);

    if (!notification.message) return null;
    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg transition-opacity duration-300 ease-in-out ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
            {notification.message}
        </div>
    );
};

export default Notification;
