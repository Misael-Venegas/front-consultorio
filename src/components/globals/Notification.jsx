"use client";
import React, { useEffect } from 'react'

const Notification = ({ message, type, duration = 3000, onClose }) => {

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [message, duration, onClose])

    if (!message) return null
    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg transition-opacity duration-300 ease-in-out ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
        >
            {message}
        </div>
    )
}

export default Notification