'use client'
import { Divider, Input, Button, Chip } from '@nextui-org/react'

import React, { useState } from 'react'
import SelectProductos from './SelectProductos'
import ListaProductos from './ListaProductos'
import InformacionVenta from './InformacionVenta'
const Ventas = () => {
    const [listaProductos, setlistaProductos] = useState([])
    const [producto, setProducto] = useState(null)
    const [cantidad, setcantidad] = useState(1)
    const [descuento, setdescuento] = useState(0)
    const [totalVenta, settotalVenta] = useState(0.0)

    const addProductToList = () => {
        producto.descuento = parseFloat(descuento)
        producto.cantidad = parseInt(cantidad)
        producto.precioFinal = parseFloat(calcularPrecioFinal(parseFloat(descuento), parseInt(cantidad), producto.precio_venta))
        setlistaProductos([...listaProductos, producto])
        deleteProductFromSearchView(false)
    }

    const calcularPrecioFinal = (descuento, cantidad, precioProducto) => {
        let precioTotal = precioProducto * cantidad
        let aplicarDescuento = (precioTotal * descuento) / 100
        let precioFinal = precioTotal - aplicarDescuento
        return precioFinal
    }

    const deleteProductFromSearchView = (limpiarListaProductos) => {
        setProducto(null)
        setdescuento(0)
        setcantidad(1)
        if (limpiarListaProductos) {
            setlistaProductos([])
        }
    }
    return (
        <>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-[60%] mr-10 ml-10 ' >

                    <SelectProductos setProducto={setProducto} producto={producto} />
                    <Divider className='my-4' />
                    {producto && <>
                        <div className=' pt-3 flex flex-col md:flex-row'  >
                            <div className='w-full md:w-[70%]' >
                                <b>  Producto</b> <br />
                                <span>{producto.nombre_producto}, {producto.descripcion}</span>
                            </div>
                            <div className='w-full md:w-[30%]'>
                                <b> Stock disponible</b> <br />
                                <div className='text-center' >
                                    <span>{producto.cantidad < 10 ? <Chip color='danger' radius='sm' variant='flat' >{producto.cantidad}</Chip> : <Chip color='success' variant='flat' radius='sm' >{producto.cantidad}</Chip>}</span>
                                </div>
                            </div>
                        </div>

                        <div className='pt-3 flex flex-col md:flex-row' >
                            <div className='pt-3 w-full md:w[33.3%] ' >
                                <b><span>Precio unitario</span></b><br />
                                <span> ${producto.precio_venta} </span>
                            </div>
                            <div className='pt-3 w-full md:w[33.3%] ' >
                                <b><span>Cantidad</span></b>
                                <Input value={cantidad} onChange={(e) => setcantidad(e.target.value)} className='pr-6' type="number" />
                            </div>
                            <div className='pt-3 w-full md:w[33.3%] ' >
                                <b><span>Descuento %</span></b>
                                <Input value={descuento} onChange={(e) => setdescuento(e.target.value)} className='pr-6' type="number" step='0.01' />
                            </div>
                        </div>

                        <div className='pt-7 flex justify-end'  >
                            <Button color='primary' size='md' onClick={() => addProductToList()} >
                                Agregar a la lista
                            </Button>

                            <Button onClick={() => deleteProductFromSearchView()} className='ml-3' color='danger' size='md'>
                                Quitar producto
                            </Button>
                        </div>
                    </>
                    }

                    <ListaProductos listaProductos={listaProductos} setListaProductos={setlistaProductos} setTotalVentas={settotalVenta} />

                </div>
                <div className='w-full md:w-[40%] mr-10 ml-10' >

                    <Divider className='mt-24' />
                    <InformacionVenta total={totalVenta} listaProductos={listaProductos} limpiarCampos={deleteProductFromSearchView} />
                </div>

            </div>

        </>
    )
}

export default Ventas