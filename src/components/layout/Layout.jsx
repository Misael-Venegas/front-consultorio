import React from 'react'
import NavBar from './NavBar'
import { AuthProvider } from '../../helpers/AuthContext'

const Layout = ({ children }) => {
    return (
        <div className='bg-[#F9FAFB] min-h-screen' >
            <NavBar />


            <div className=' bg-white container mx-auto px-4 pt-5 my-3 min-h-screen '>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </div>
        </div>
    )
}

export default Layout

//