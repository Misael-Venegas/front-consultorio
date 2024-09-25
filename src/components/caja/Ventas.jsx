'use client'
import { Divider, Input, Button, Autocomplete } from '@nextui-org/react'

import React, { useState } from 'react'
const Ventas = () => {
    const [producto, setProducto] = useState([])
    const obtenerProductos = (e) => {
        const value = e.target.value;
        console.log('Se buscaran productos')
    }
    return (
        <>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-[60%] mr-10 ml-10 ' >

                    <span>Nombre del producto / Código de barras</span>

                    <Autocomplete onChange={(e) => obtenerProductos(e)} className='pt-3' placeholder='Ingrese el nombre del producto o el código de barras' >
                    </Autocomplete>

                    <Divider className='my-4' />
                    {producto.length > 0 && <>
                        <div className=' pt-3 flex flex-col md:flex-row'  >
                            <div className='w-full md:w-[70%]' >
                                <span>  Producto</span>
                            </div>
                            <div className='w-full md:w-[30%]'>
                                <span> Stock disponible</span>
                            </div>
                        </div>

                        <div className='pt-3 flex flex-col md:flex-row' >
                            <div className='pt-3 w-full md:w[33.3%] ' >
                                <span>Precio unitario</span>
                            </div>
                            <div className='pt-3 w-full md:w[33.3%] ' >
                                Cantidad
                            </div>
                            <div className='pt-3 w-full md:w[33.3%] ' >
                                <span>Descuento</span>
                            </div>
                        </div>
                        <div className='float-none pt-7' >
                            <Button color='primary' size='md'>
                                Agregar a la lista
                            </Button>
                        </div>
                    </>
                    }

                </div>
                <div className='w-full md:w-[40%] mr-10 ml-10' >
                    <span>Productos</span>
                </div>

            </div>

        </>
    )
}

export default Ventas