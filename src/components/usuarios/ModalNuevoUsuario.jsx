'use client'

import { Button, Modal, ModalBody, ModalContent, ModalHeader, DatePicker } from '@nextui-org/react'
import React from 'react'

const ModalNuevoUsuario = ({ isOpen, setIsOpen }) => {

    const guardarUsuario = (event) => {
        event.preventDefault();
        try {
            const nombre = event.target.elements.nombre.value;
            const aPaterno = event.target.elements.aPaterno.value;
            const aMaterno = event.target.elements.aMaterno.value;
            const correo = event.target.elements.correo.value;
            const telefono = event.target.elements.telefono.value;
            const rol = event.target.rol.value;
            const cumpleanhos = event.target.fechaCumpleanhos.value
             // Aquí puedes hacer algo con los valores obtenidos
            console.log("Nombre:", nombre);
            console.log("Apellido Paterno:", aPaterno);
            console.log("Apellido Materno:", aMaterno);
            console.log("Correo Electrónico:", correo);
            console.log("Teléfono:", telefono);
            console.log('Rol,', rol)
            console.log('cumpleanhos,', cumpleanhos)
        } catch (error) {
console.log(error.message)
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
                                <input type="text" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="aPaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido paterno</label>
                                <input type="text" id="aPaterno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="aMaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido materno</label>
                                <input type="text" id="aMaterno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">e-mail</label>
                                <input type="email" id="correo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                                <input type="text" id="telefono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
                                <select type="text" id="rol" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
                                    <option>Admin</option>
                                    <option>Recepcionista</option>
                                </select>
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="fechaCumpleanhos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de cumpleaños</label>
                                <input type="date" id="fechaCumpleanhos" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                         
                           </div>
                        </div>
                        <div className='float-end' >

                            <Button type='submit' color='primary' >Guardar</Button>
                        </div>
                    </form>

                </ModalBody>

            </ModalContent>

        </Modal>
    )
}

export default ModalNuevoUsuario