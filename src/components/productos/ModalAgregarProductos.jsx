import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import React from 'react'

const ModalAgregarProductos = ({ openModal, setOpenModal }) => {

    const guardarProducto = (e) => {
        e.preventDefault()
        try {
            console.log(e.target.elements)
        } catch (error) {

        }
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            size='4xl'
        >
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1' > Nuevo Producto </ModalHeader>
                <ModalBody>
                    <form className="w-full"
                        onSubmit={guardarProducto}
                    >
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del producto</label>
                                <input type="text" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="cantidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                                <input type="number" id="cantidad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="unidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidad</label>
                                <input type="text" id="unidad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='flex md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descipción</label>
                                <textarea type="text" id="descripcion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio unitario</label>
                                <input type="number" id="precio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="descuento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descuento</label>
                                <input type="number" id="descuento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="importe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Importe</label>
                                <input type="number" id="importe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="precioVenta" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio de venta</label>
                                <input type="number" id="precioVenta" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="codigoBarras" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código de barras</label>
                                <input type="text" id="codigoBarras" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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

export default ModalAgregarProductos