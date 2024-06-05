'use client'

import { Button, Modal, ModalBody, ModalContent, ModalHeader, DatePicker } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useNotification } from '@/helpers/NotificationContext'

const ModalNuevoUsuario = ({ isOpen, setIsOpen, datosUsuario, setActualizarUsuario }) => {


    const { showNotification } = useNotification()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [arrayRoles, setarrayRoles] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        getRoles()
    }, [])

    const getRoles = async _ => {
        try {
            const token = localStorage.getItem('token')

            const response = await fetch(`${apiUrl}getRol`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Agregar el token en los headers
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error('Error al inentar obtener la lista de roles')
            }
            const data = await response.json()
            setarrayRoles(data)
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    const guardarUsuario = async (event) => {
        event.preventDefault();
        try {
            const rutaConsulta = datosUsuario.length === 0 ? `${apiUrl}agregarUsuario` : `${apiUrl}editarUsuario`;
            setloading(true)
            const nombre = event.target.elements.nombre.value;
            const aPaterno = event.target.elements.aPaterno.value;
            const aMaterno = event.target.elements.aMaterno.value;
            const correo = event.target.elements.correo.value;
            const telefono = event.target.elements.telefono.value;
            const rol = event.target.rol.value;
            const cumpleanhos = event.target.fechaCumpleanhos.value

            const token = localStorage.getItem('token')
            const response = await fetch(rutaConsulta, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: datosUsuario.length === 0 ? '' : datosUsuario.id,
                    nombre,
                    aPaterno,
                    aMaterno,
                    correo,
                    telefono,
                    rol,
                    cumpleanhos
                })
            })
            if (!response.ok) {
                const erroData = await response.json()
                throw new Error(erroData.message)
            }
            showNotification(datosUsuario.length === 0 ? 'El usuario se creo de manera correcta' : 'Los datos se actualizaron de manera correcta', 'success');
            const data = await response.json()

            setloading(false)
            setIsOpen(false)
            setActualizarUsuario(Math.random())
        } catch (error) {
            setloading(false)
            showNotification(error.message, 'error');
        }

    }



    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            size='4xl'

        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1" >Nuevo usuario</ModalHeader>
                <ModalBody >
                    <form className="w-full"
                        onSubmit={guardarUsuario}
                    >
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                <input type="text" id="nombre" defaultValue={datosUsuario?.nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="aPaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido paterno</label>
                                <input type="text" id="aPaterno" defaultValue={datosUsuario?.a_paterno} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="aMaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido materno</label>
                                <input type="text" id="aMaterno" defaultValue={datosUsuario.a_materno} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">e-mail</label>
                                <input type="email" id="correo" defaultValue={datosUsuario?.correo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                                <input type="text" id="telefono" defaultValue={datosUsuario?.telefono} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
                                <select type="text" id="rol" defaultValue={datosUsuario?.id_rol} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >

                                    {
                                        arrayRoles.map((e, key) => {
                                            return <option value={e.id} key={key} >{e.rol}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="fechaCumpleanhos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de cumpleaños</label>
                                <input type="date" id="fechaCumpleanhos" defaultValue={new Date(datosUsuario.fecha_cumpleanhos ? datosUsuario.fecha_cumpleanhos : '2000-01-01').toISOString().split('T')[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                            </div>
                        </div>
                        <div className='float-end' >

                            <Button isLoading={loading} type='submit' color='primary' >{datosUsuario.length === 0 ? 'Guardar' : 'Actualizar'}</Button>
                        </div>
                    </form>

                </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export default ModalNuevoUsuario