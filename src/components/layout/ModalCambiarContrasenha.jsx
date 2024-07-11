import React from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader, Button } from '@nextui-org/react'

const ModalCambiarContrasenha = ({ openModal, setOpenModal }) => {

    const resetearContrasenha = async (e) => {
        e.preventDefault()
        try {
            const contrasenha = e.target.elements.contrasenha.value
            const validarContrasenha = e.target.elements.validarContrasenha.value

            if (contrasenha !== validarContrasenha) {
                throw new Error('Error: Las contraseñas no coinciden')
            }

            console.log('se cambia la contrasenha')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            size='2xl'
        >
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1' >Cambiar contraseña</ModalHeader>
                <ModalBody>
                    <form className='w-full'
                        onSubmit={resetearContrasenha}
                    >

                        <div className='flex flex-col md:flex-row gap-4' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="contrasenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva contraseña</label>
                                <input type="password" id="contrasenha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="validarContrasenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Validar contraseña</label>
                                <input type="password" id="validarContrasenha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='float-end'>
                            <Button type='submit' color='primary' >Cambiar contraseña</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalCambiarContrasenha