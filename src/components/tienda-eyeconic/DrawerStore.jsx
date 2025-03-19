import React, { useEffect, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,

} from '@heroui/drawer'
import { Button, Divider, Image } from '@nextui-org/react'
import { useCarrito } from '@/helpers/CarritoContext'
import PaymentPage from '@/helpers/PayForm'

const DrawerStore = ({ isOpen, setOpenChange }) => {
    const { carrito, quitarProducto } = useCarrito()
    const [total, settotal] = useState(0.0)

    const calcularTotal = () => {
        let totalVenta = 0.0

        carrito.map(item => {
            console.log(item)
            totalVenta = (parseFloat(totalVenta) + parseFloat(item.precio_venta * item.cantidadProductos))
        })
        settotal(totalVenta)
        return totalVenta
    }



    return (
        <>
            <Drawer isOpen={isOpen} onOpenChange={() => setOpenChange(false)}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Productos</DrawerHeader>
                            <DrawerBody>
                                {
                                    carrito.map((item, key) => {

                                        return <div key={key} className='flex flex-col md:flex-row' >
                                            <div className='w-full md:w-[30%]' >
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src={`http://localhost:3001/imagenesProductos/${item.url.split('\\').pop().split('/').pop()}`}
                                                    width={70}
                                                    height={70}
                                                />
                                            </div>
                                            <div className='w-full md:w-[70%]' >
                                                <span>{item.nombre_producto}</span> <br />
                                                <strong>${item.precio_venta} mxn</strong> <br />
                                                <span>Cantidad {item.cantidadProductos} </span>
                                            </div>
                                            <span className='text-red-700 seccionar-item' onClick={() => quitarProducto(item.id)} >Eliminar</span>
                                        </div>
                                    })
                                }
                                <Divider />
                                <div className='w-full text-right' >
                                    <strong  >Total ${calcularTotal()} </strong>
                                </div>

                                <PaymentPage monto={total} />

                            </DrawerBody>

                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerStore