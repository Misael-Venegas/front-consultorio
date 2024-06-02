"use client";
import React, { useEffect, useState } from 'react'
import { Avatar, Input, Button } from '@nextui-org/react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ErrorAlert from '../globals/ErrorAlert';
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
 


    const [isVisible, setIsVisible] = React.useState(false);
    const [usuario, setusuario] = useState('')
    const [contrasenha, setcontrasenha] = useState('')
    const [mesgError, setMesgError] = useState('')
    const [loading, setloading] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible);

    const logIn = async () => {
        setMesgError('')
        if (usuario == '' || contrasenha == '') {
            setMesgError('Verifica que los campos usuario y/o contraseña no estén vacíos')
            return
        }
        const url = process.env.NEXT_PUBLIC_API_URL
        try {
            setloading(true)
            const response = await fetch(`${url}users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: contrasenha,
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json()
            if (data.token) {
                localStorage.setItem('token', data.token)
                router.push('/inicio')
            } else {
                throw new Error('Error al inciar sesión (token)')
            }
            setloading(false)
        } catch (error) {
            setloading(false)
            setMesgError(error.message)
        }
    }

    return (
        <>
            <div className='principal-div-login' >
                <div className='div-secundario-login' >
                    <p className='mb-5 tituloLogin' >Eyeconic mx</p>
                    <img src="/assets/Images/Eyeconic_2.PNG" width={250} alt="" />
                    <Input label='Usuario' className='mb-5'
                        onChange={(e) => setusuario(e.target.value)}
                    />
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
                        onChange={(e) => setcontrasenha(e.target.value)}

                    />
                    <Button isLoading={loading} color='primary' style={{ width: '100%' }} onClick={() => logIn()}  >  Iniciar Sesión</Button>
                    {
                        mesgError != '' && <ErrorAlert mensaje={mesgError} />
                    }
                </div>
            </div>
        </>
    )
}

export default Login