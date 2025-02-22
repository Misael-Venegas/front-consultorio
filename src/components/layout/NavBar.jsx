'use client'

import React, { useEffect, useState } from 'react'
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { Avatar, Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useAuth } from '@/helpers/AuthContext';
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbExchange } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import ModalCambiarContrasenha from './ModalCambiarContrasenha';
import { BsCartPlusFill } from "react-icons/bs";
import ItemsMenu from './ItemsMenu';
import ItemsMenuMobile from './ItemsMenuMobile';
import DrawerStore from '@/components/tienda-eyeconic/DrawerStore';
import { useCarrito } from '@/helpers/CarritoContext';

const NavBar = () => {
    const { carrito } = useCarrito()
    const router = useRouter()
    const { userInformation } = useAuth()
    const [isClick, setisClick] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openModalContrasenha, setopenModalContrasenha] = useState(false)
    const toggleNabVar = () => {
        setisClick(!isClick)
    }

    const iconClasses = "text-lg text-default-500 pointer-events-none flex-shrink-0";
    const cerrarSesion = () => {
        sessionStorage.removeItem('token')
        router.push('/')
    }
    return (
        <nav className='bg-[#2A84E9]' >
            <div className='max-w-13xl mx-auto px-4 sm:px-6 lg:px-8' >
                <div className='flex items-center justify-between h-16' >
                    <div className='flex items-center' >
                        <div className='flex-shrink-0' >
                            <a href={userInformation.nombre ? "/inicio" : "/"} className='text-white' >
                                <img src="/assets/Images/Eyeconic_2.PNG" width={100} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className='hidden md:block' >
                        <div className='ml-4 flex items-center space-x-4'>

                            <ItemsMenu rolUsuario={userInformation.rol} />
                            <span className='text-3xl seccionar-item' onClick={() => setOpenDrawer(true)} >
                                <Badge color='warning' size='sm' content={carrito.length}>
                                    <BsCartPlusFill />
                                </Badge>
                            </span>
                            <span  >
                                {userInformation.nombre ? <Dropdown>

                                    <DropdownTrigger>
                                        <Avatar name={userInformation.nombre ? userInformation.nombre : userInformation.nombre} className='seccionar-item' />
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem key='ChangPaswword' startContent={<TbExchange className={iconClasses} />} onClick={() => setopenModalContrasenha(true)}>Cambiar contrasenha</DropdownItem>
                                        <DropdownItem color='danger' key='logOut' startContent={<RiLogoutBoxLine className={iconClasses} />} onClick={() => cerrarSesion()}>Cerrar sesión</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown> : <Avatar />
                                }</span>
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
                            <ItemsMenuMobile rolUsuario={userInformation.rol} />
                            <span className='text-3xl seccionar-item' onClick={() => setOpenDrawer(true)} >
                                <Badge color='warning' size='sm' content={carrito.length} >
                                    <BsCartPlusFill />
                                </Badge>
                            </span>
                            <span  >
                                <Avatar name={userInformation.usuario} className='seccionar-item' />
                            </span>
                        </div>
                    </div>
                )
            }
            <ModalCambiarContrasenha openModal={openModalContrasenha} setOpenModal={setopenModalContrasenha} />
            <DrawerStore isOpen={openDrawer} setOpenChange={setOpenDrawer} />
        </nav>
    )
}

export default NavBar