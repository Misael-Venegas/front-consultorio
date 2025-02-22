import React from 'react';
import NavBar from './NavBar';
import { AuthProvider } from '../../helpers/AuthContext';
import { NotificationProvider } from '@/helpers/NotificationContext';
import Notification from '@/components/globals/Notification';

import { CarritoProvider } from '@/helpers/CarritoContext'
const Layout = ({ children }) => {
    return (
        <>
            <CarritoProvider>
                <AuthProvider>
                    <NotificationProvider>
                        <div className='bg-[#F9FAFB] min-h-screen'>
                            <NavBar />
                            <div className='bg-white container mx-auto px-4 pt-5 my-3 min-h-screen'>

                                {children}
                                <Notification />

                            </div>
                        </div>
                    </NotificationProvider>
                </AuthProvider>
            </CarritoProvider>
        </>
    );
};

export default Layout;
