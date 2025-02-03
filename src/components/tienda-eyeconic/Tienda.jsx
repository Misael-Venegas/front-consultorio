import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'
import { peticionGet } from '@/helpers/peticionesAPI'
import { useNotification } from '@/helpers/NotificationContext';
import { CardProducto } from './CardProducto';

const Tienda = () => {
    const { showNotification } = useNotification()
    const [loading, setLoading] = useState(false)
    const [dataProductos, setdataProductos] = useState([])
    useEffect(() => {
        obtenerProductos()
    }, [])

    const obtenerProductos = async () => {
        try {
            setLoading(true)
            const response = await peticionGet('users/obtener-productos-tienda', false)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }

            //console.log(await response.json())

            const productosData = await response.json()
            setdataProductos(productosData)

        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='flex flex-col md:flex-row pt-5' >
                <div className='w-full md:w-[20%]' >
                    <h1>Filtros</h1>
                </div>
                <div className='flex' >

                    {
                        dataProductos.map((e, key) => {
                            return <CardProducto producto={e} key={key} />
                        })
                    }


                </div>
            </div>
        </>
    )
}

export default Tienda