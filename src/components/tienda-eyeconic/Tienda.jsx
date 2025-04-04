import React, { useEffect, useState, useMemo } from 'react'
import { Spinner, Input } from '@nextui-org/react'
import { peticionGet } from '@/helpers/peticionesAPI'
import { useNotification } from '@/helpers/NotificationContext';
import { CardProducto } from './CardProducto';

const Tienda = () => {
    const { showNotification } = useNotification()
    const [loading, setLoading] = useState(false)
    const [dataProductos, setDataProductos] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

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

            const productosData = await response.json()
            setDataProductos(productosData)
        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    // Filtra productos basado en la búsqueda usando useMemo
    const productosFiltrados = useMemo(() => {
        return dataProductos.filter((producto) =>
            producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, dataProductos])

    return (
        <>
            <div className='w-full mb-4'>
                <Input
                    type="text"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3"
                />
            </div>
            <div className='flex flex-col md:flex-row pt-5'>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-5'>
                    {
                        loading ?
                            <div className='w-full flex justify-center'><Spinner size="lg" /></div>
                            :
                            productosFiltrados.map((producto, index) => (
                                <CardProducto producto={producto} key={index} />
                            ))
                    }
                </div>
            </div>
        </>
    )
}

export default Tienda
