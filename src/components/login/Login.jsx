"use client";
import React from 'react'
import { Avatar, Input, Button } from '@nextui-org/react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const Login = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div className='principal-div-login' >
                <div className='div-secundario-login' >
                    <p className='mb-5 tituloLogin' >Eyeconic mx</p>
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large mb-5" />
                    <Input label='Usuario' className='mb-5' />

                    <Input
                        label='Contraseña'
                        className='mb-5'
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />

                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}

                    />
                    <Button color='primary' style={{ width: '100%' }} >  Iniciar Sesión</Button>
                </div>
            </div>
        </>
    )
}

export default Login