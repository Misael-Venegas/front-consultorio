import { Card, CardBody, Input } from '@nextui-org/react'

import React from 'react'
const Ventas = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-[60%] mr-10 ml-10 ' >
                    <span>Nombre del producto / Código de barras</span>
                    <Input className='pt-3' placeholder='Ingrese el nombre del producto o el código de barras' />
                </div>
                <div className='w-full md:w-[40%] mr-10 ml-10' >
                    <span>Productos</span>
                </div>

            </div>

        </>
    )
}

export default Ventas