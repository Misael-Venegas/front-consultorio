import { Input } from '@nextui-org/react'
import React from 'react'

const SelectProductos = ({ setProducto }) => {

    const obtenerProductos = (e) => {
        console.log(e)
    }

    return (
        <>
            <span>Nombre del producto / Código de barras</span>
            <Input
                className='pt-3'
                placeholder="Ingrese el nombre del producto o el código de barras"
                onChange={(e) => obtenerProductos(e.target.value)}
            />

        </>
    )
}

export default SelectProductos