import { Card, Input, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { useNotification } from '@/helpers/NotificationContext'

const SelectProductos = ({ setProducto, producto }) => {
    const { showNotification } = useNotification()
    const [listaProductos, setListaProductos] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const obtenerProductos = async (e) => {
        try {
            if (e == '') {
                setIsDropdownVisible(false)
                setListaProductos([])
                return
            }
            const url = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${url}users/obtener-lista-productos-codigo-barras/${e}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            const data = await response.json()

            setListaProductos(data)
            setIsDropdownVisible(true)
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    const seleccionarProducto = (item) => {

        setProducto(item)
        setIsDropdownVisible(false)
    }

    return (
        <>
            <span>Nombre del producto / Código de barras</span>
            <Input
                className='pt-3'
                placeholder="Ingrese el nombre del producto o el código de barras"
                onChange={(e) => obtenerProductos(e.target.value)}
                value={producto?.nombre_producto}
            />

            {
                isDropdownVisible && listaProductos.length > 0 &&
                <Card style={{ zIndex: 1 }} className="absolute mt-2 md:w-[42%] ">
                    {listaProductos.map((producto, index) => (
                        <div
                            key={index}
                            onClick={() => seleccionarProducto(producto)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            <span>{producto.nombre_producto}</span>
                        </div>
                    ))}
                </Card>

            }
        </>
    )
}

export default SelectProductos