import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody
} from '@heroui/drawer'
import { Button, Divider, Image } from '@nextui-org/react'
import { useCarrito } from '@/helpers/CarritoContext'
import { peticionesPost } from '@/helpers/peticionesAPI'
import FormDatosCliente from './FormDatosCliente'
import ErrorAlert from '../globals/ErrorAlert'

const DrawerStore = ({ isOpen, setOpenChange }) => {
    const { push } = useRouter()
    const [loading, setLoading] = useState(false)
    const [mesgError, setMesgError] = useState("");
    const realizarPagoOnline = async (event) => {
        event.preventDefault();
        // console.log(event.target.elements)

        const dataClientes = {
            nombre: event.target.elements.nombre.value,
            aPaterno: event.target.elements.aPaterno.value,
            aMaterno: event.target.elements.aMaterno.value,
            correo: event.target.elements.correo.value,
            telefono: event.target.elements.telefono.value,
            calle: event.target.elements.calle.value,
            noExterior: event.target.elements.noExterior.value,
            noInterior: event.target.elements.noInterior.value,
            referencias: event.target.elements.referencia.value,
            codigoPostal: event.target.elements.cp.value,
            municipio: event.target.elements.municipio.value,
            estado: event.target.elements.estado.value
        }


        let arrayProductos = [];

        carrito.map(producto => {
            const jsonData = {
                price_data: {
                    product_data: {
                        name: producto.nombre_producto,
                        description: producto.descripcion
                    },
                    currency: 'mxn',
                    unit_amount: Math.round(producto.precio_venta * 100)
                },
                quantity: producto.cantidadProductos
            }
            arrayProductos.push(jsonData)
        })

        //console.log(arrayProductos)
        //return
        setLoading(true)
        try {
            const response = await peticionesPost('paymentRoute/create-checkout-session', false, { arrayProductos, dataClientes, carrito, total })

            if (!response.ok) {
                const dataError = await response.json()

                throw new Error(dataError.message)
            }

            const data = await response.json()

            push(data?.url)
        } catch (error) {
            setMesgError(error.message)

        } finally {
            setLoading(false)
        }
    }

    const { carrito, quitarProducto } = useCarrito()
    const [total, settotal] = useState(0.0)

    const calcularTotal = () => {
        let totalVenta = 0.0

        carrito.map(item => {

            totalVenta = (parseFloat(totalVenta) + parseFloat(item.precio_venta * item.cantidadProductos))
        })
        settotal(totalVenta)
        return totalVenta
    }



    return (
        <div>
            <Drawer isOpen={isOpen} onOpenChange={() => setOpenChange(false)} size='5xl'>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">  <span className='pt-4' >Productos</span> </DrawerHeader>
                            <DrawerBody>
                                <form onSubmit={realizarPagoOnline} >
                                    <div className='flex flex-col md:flex-row' >

                                        <div className='w-full md:w-[50%] mr-10 ml-10' >
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

                                        </div>

                                        <div className='w-full md:w-[50%] mr-10 ml-10'>
                                            <FormDatosCliente />
                                        </div>
                                    </div>

                                    <Divider />
                                    <div className='w-full text-right pt-4' >
                                        <b>Total ${calcularTotal()} </b>
                                    </div> <br />
                                    <Button isLoading={loading} color='primary' className='w-full' type='submit' >Realizar pago</Button>
                                </form>
                            </DrawerBody>

                            {mesgError !== "" && <ErrorAlert mensaje={mesgError} />}
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default DrawerStore