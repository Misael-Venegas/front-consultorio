import { Divider, Input } from '@nextui-org/react'

import React from 'react'
const Ventas = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-[60%] mr-10 ml-10 ' >

                    <span>Nombre del producto / Código de barras</span>
                    <Input className='pt-3' placeholder='Ingrese el nombre del producto o el código de barras' />
                    <Divider className='my-4' />

                    <div className=' pt-3 flex flex-col md:flex-row'  >
                        <div className='w-full md:w-[70%]' >
                            <span>  Producto: Solucion salina</span>
                        </div>
                        <div className='w-full md:w-[30%]'>
                            <span> Stock disponible:</span>
                        </div>
                    </div>

                    <div className='pt-3 flex flex-col md:flex-row' >
                        <div className='pt-3 w-full md:w[33.3%] ' >
                            <span>Precio unitario:</span>
                        </div>
                        <div className='pt-3 w-full md:w[33.3%] ' >
                            Cantidad:
                        </div>
                        <div className='pt-3 w-full md:w[33.3%] ' >
                            <span>Descuento:</span>
                        </div>
                    </div>

                </div>
                <div className='w-full md:w-[40%] mr-10 ml-10' >
                    <span>Productos</span>
                </div>

            </div>

        </>
    )
}

export default Ventas