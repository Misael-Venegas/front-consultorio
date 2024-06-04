import React from 'react';
import NavBar from './NavBar';
import { AuthProvider } from '../../helpers/AuthContext';
import { NotificationProvider } from '@/helpers/NotificationContext';
import Notification from '@/components/globals/Notification';

const Layout = ({ children }) => {
    return (
        <div className='bg-[#F9FAFB] min-h-screen'>
            <NavBar />
            <div className='bg-white container mx-auto px-4 pt-5 my-3 min-h-screen'>
                <AuthProvider>
                    <NotificationProvider>
                        {children}
                        <Notification />
                    </NotificationProvider>
                </AuthProvider>
            </div>
        </div>
    );
};

export default Layout;
