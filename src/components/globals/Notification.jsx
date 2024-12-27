// src/components/globals/Notification.jsx
"use client";
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
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

    // Contenido de la notificación
    const notificationContent = (
        <div
            className={`fixed top-0 left-0 w-full z-[9999] p-4 text-center rounded shadow-lg transition-opacity duration-300 ease-in-out ${notification.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
        >
            {notification.message}
        </div>
    );

    // Renderización en el body para asegurar que esté sobre todos los componentes
    return ReactDOM.createPortal(notificationContent, document.body);
};

export default Notification;
