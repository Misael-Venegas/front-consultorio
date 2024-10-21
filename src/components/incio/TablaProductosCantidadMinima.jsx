import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Spinner, Chip } from '@nextui-org/react'

import { useNotification } from '@/helpers/NotificationContext'

const TablaProductosCantidadMinima = () => {
    const { showNotification } = useNotification()
    const [stock, setStock] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        obtenerStockMinimo()
    }, [])

    const obtenerStockMinimo = async () => {
        try {
            setloading(true)
            const urlAPI = process.env.NEXT_PUBLIC_API_URL
            const token = sessionStorage.getItem('token')
            const response = await fetch(`${urlAPI}obtener-stock-minimo`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()
            setStock(data)
        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setloading(false)
        }
    }

    return (
        <div className='my-8' >
            <h4 className='font-bold text-large' >Productos con stock bajo </h4>

            {
                loading && <Spinner />
            }
            {
                !loading && <Table className='pr-3 w-[100%] h-[80%]' >
                    <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Código de barras</TableColumn>
                        <TableColumn>Cantidad </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No hay datos disponibles"} >
                        {
                            stock.map((data, key) => {
                                return <TableRow key={key} >
                                    <TableCell>
                                        {key + 1}
                                    </TableCell>

                                    <TableCell>
                                        {data.nombre_producto}
                                    </TableCell>

                                    <TableCell>
                                        {data.codigo_barras}
                                    </TableCell>

                                    <TableCell>
                                        {data.cantidad > 0 ? <Chip color="warning" radius='sm' variant="dot"> {data.cantidad} </Chip> : <Chip color="danger" variant="bordered"> {data.cantidad} </Chip>}
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            }
        </div>
    )
}

export default TablaProductosCantidadMinima