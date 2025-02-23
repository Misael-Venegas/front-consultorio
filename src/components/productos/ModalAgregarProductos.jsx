import { Button, Modal, ModalBody, ModalContent, ModalHeader, Checkbox } from '@nextui-org/react'
import React, { useState } from 'react'
import { useNotification } from '@/helpers/NotificationContext'
import { convertirImagen } from '@/helpers/imageToBase64'

const ModalAgregarProductos = ({ openModal, setOpenModal, setUpdateTable, producto }) => {

    const { showNotification } = useNotification()

    const [loading, setloading] = useState(false)
    const [productoExterno, setProductoExterno] = useState(false)

    const guardarProducto = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("nombreProducto", e.target.elements.nombre.value);
            formData.append("cantidad", e.target.elements.cantidad.value);
            formData.append("unidad", e.target.elements.unidad.value);
            formData.append("descripcion", e.target.elements.descripcion.value);
            formData.append("precioUnitario", e.target.elements.precio.value);
            formData.append("importe", e.target.elements.importe.value);
            formData.append("precioVenta", e.target.elements.precioVenta.value);
            formData.append("codigoBarras", e.target.elements.codigoBarras.value);
            formData.append("productoFarmacia", e.target.elements.productoFarmacia.checked);
            formData.append("ventaExterna", e.target.elements.ventaExterna.checked);

            const imagen = e.target.elements.imagen.files[0];
            
            if (imagen) {
                formData.append("image", imagen);
            }

            const token = sessionStorage.getItem('token')
            console.log(token)
            const url = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${url}registrar-producto`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al guardar el producto');
            }

            showNotification('El producto se guardó de manera correcta', 'success');
            setUpdateTable(Math.random());
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setOpenModal(false);
        }
    };


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
                                <input type="text" defaultValue={producto?.nombre_producto} id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="cantidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                                <input type="number" defaultValue={producto?.cantidad} id="cantidad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="unidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidad</label>
                                <input type="text" defaultValue={producto?.unidad} id="unidad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className='flex md:flex-row gap-4 ' >
                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descipción</label>
                                <textarea type="text" defaultValue={producto?.descripcion} id="descripcion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio unitario</label>
                                <input type="number" step='0.01' defaultValue={producto?.precio_unitario} id="precio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>



                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="importe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Importe</label>
                                <input type="number" step='0.01' defaultValue={producto?.importe} id="importe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                        </div>
                        <div className='flex flex-col md:flex-row gap-4 ' >

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="codigoBarras" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código de barras</label>
                                <input type="text" defaultValue={producto?.codigo_barras} id="codigoBarras" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div className="flex-grow flex-basis-2  mb-5">
                                <label htmlFor="precioVenta" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio de venta</label>
                                <input type="number" step='0.01' defaultValue={producto?.precio_venta} id="precioVenta" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-grow flex-basis-2  mb-5">
                                <input id="productoFarmacia" defaultChecked={producto?.producto_farmacia} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="productoFarmacia" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">¿Es de farmacia?</label>
                            </div>
                            <div className="flex-grow flex-basis-2  mb-5">
                                <input id="ventaExterna" defaultChecked={producto?.ventaExterna} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="ventaExterna" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">¿Es para venta externa?</label>
                            </div>
                        </div>
                        <div>
                            <h1>Cargar una imagen</h1>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                id="imagen"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>

                        <div className='float-end' >
                            <Button type='submit' color='primary' > {producto ? 'Editar producto' : 'Guardar producto'} </Button>
                        </div>
                    </form>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalAgregarProductos