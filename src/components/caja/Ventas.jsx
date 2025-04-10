'use client'
import { Divider, Input, Button, Chip } from '@nextui-org/react'

import React, { useEffect, useState } from 'react'
import SelectProductos from './SelectProductos'
import ListaProductos from './ListaProductos'
import InformacionVenta from './InformacionVenta'
import { useNotification } from '@/helpers/NotificationContext'

const Ventas = () => {

    //Este codigo se usa solo para ver el nombre de las impresoras disponibles

    /* useEffect(() => {
         // Cargar el script de QZ Tray al montar el componente
         const loadQZTrayScript = () => {
             const script = document.createElement('script');
             script.src = '/js/qz-tray.js';
             script.async = true;
             script.onload = () => {
                 console.log('QZ Tray script loaded');
                 initializeQZ();
             };
             script.onerror = () => console.log('Error al cargar el script de QZ Tray');
             document.body.appendChild(script);
         };
 
         const initializeQZ = async () => {
             try {
                 // Asegúrate de que el script de QZ se cargue antes de acceder a `qz`
                 if (window.qz) {
                     // Conectar a QZ Tray
                     await window.qz.websocket.connect();
 
                     // Obtener la lista de impresoras
                     const impresorasDisponibles = await window.qz.printers.find();
                     console.log(impresorasDisponibles);
                 } else {
                     setError('QZ Tray no está disponible.');
                 }
             } catch (e) {
                 setError('Error al inicializar QZ Tray: ' + e.message);
             }
         };
 
         // Cargar el script si no está ya cargado
         if (!window.qz) {
             loadQZTrayScript();
         } else {
             initializeQZ();
         }
 
         // Desconectar de QZ Tray cuando el componente se desmonte
         return () => {
             if (window.qz) {
                 window.qz.websocket.disconnect();
             }
         };
     }, []);
 */

    const { showNotification } = useNotification()
    const [listaProductos, setlistaProductos] = useState([])
    const [producto, setProducto] = useState(null)
    const [cantidad, setcantidad] = useState(1)
    const [descuento, setdescuento] = useState(0)
    const [totalVenta, settotalVenta] = useState(0.0)

    const addProductToList = () => {

        if (parseInt(descuento) < 0 || parseInt(descuento) > 100) {
            showNotification('Error: El descuento debe estar en un rango entre 0 - 100', 'error')
            return
        }
        if (parseInt(cantidad) <= 0) {
            showNotification('La cantidad de productos debe ser mayor a cero', 'error')
            return
        }

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
                                <Input min='1' value={cantidad} onChange={(e) => setcantidad(e.target.value)} className='pr-6' type="number" />
                            </div>
                            <div className='pt-3 w-full md:w[33.3%] ' >
                                <b><span>Descuento %</span></b>
                                <Input value={descuento} onChange={(e) => setdescuento(e.target.value)} className='pr-6' type="number" step='0.01' min='0' max='100' />
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
                    <InformacionVenta total={totalVenta} listaProductos={listaProductos} limpiarCampos={deleteProductFromSearchView} setTotal={settotalVenta} />
                </div>

            </div>

        </>
    )
}

export default Ventas