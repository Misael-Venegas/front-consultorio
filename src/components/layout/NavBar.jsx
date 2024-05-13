'use client'

import React, { useState } from 'react'
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
const NavBar = () => {

    const [isClick, setisClick] = useState(false)

    const toggleNabVar = () => {
        setisClick(!isClick)
    }

    return (
        <nav className='bg-[#2A84E9]' >
            <div className='max-w-13xl mx-auto px-4 sm:px-6 lg:px-8' >
                <div className='flex items-center justify-between h-16' >
                    <div className='flex items-center' >
                        <div className='flex-shrink-0' >
                            <a href="/" className='text-white' >
                                Logo
                            </a>
                        </div>
                    </div>
                    <div className='hidden md:block' >
                        <div className='ml-4 flex items-center space-x-4'>
                            <a href="/" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                                Home
                            </a>
                            <a href="/" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                                Usuarios
                            </a>
                            <a href="/" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                                Productos
                            </a>
                            <a href="/" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                                Otros
                            </a>
                        </div>
                    </div>
                    <div className='md:hidden flex items-center' >
                        <button
                            className='inline-flex items-center justify-center p-2 rounded-md  text-white   hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                            onClick={toggleNabVar}
                        >
                            {
                                isClick ? (<IoCloseSharp />) : (<RiMenuLine />)
                            }
                        </button>
                    </div>
                </div>
            </div>
            {
                isClick && (
                    <div className='md:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3' >
                            <a href="/" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                                Home
                            </a>
                            <a href="/" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                                Usuarios
                            </a>
                            <a href="/" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                                Productos
                            </a>
                            <a href="/" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                                Otros
                            </a>
                        </div>
                    </div>
                )
            }
        </nav>
    )
}

export default NavBar