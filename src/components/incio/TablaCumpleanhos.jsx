import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react'
import { useNotification } from '@/helpers/NotificationContext'
const TablaCumpleanhos = () => {
    const [listaCumpleanhos, setlistaCumpleanhos] = useState([])
    const { showNotification } = useNotification()
    useEffect(() => {
        obtenerListaCumpleanhos()
    }, [])

    const obtenerListaCumpleanhos = async () => {
        try {
            const url = process.env.NEXT_PUBLIC_API_URL
            const token = sessionStorage.getItem('token')
            const response = await fetch(`${url}obtener-lista-cumpleanhos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError)
            }
            const data = await response.json()
            setlistaCumpleanhos(data)
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }
    
    return (
        <div className='my-8'>
            <h4 className='font-bold text-large' >Cumpleaños próximo</h4>
            <Table className='pl-3'  >
                <TableHeader>

                    <TableColumn>#</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Fecha</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No hay datos disponibles'} >
                    {
                        listaCumpleanhos?.map((usuario, key) => {
                            return <TableRow key={key} >
                                <TableCell>
                                    {key + 1}
                                </TableCell>

                                <TableCell>
                                    {usuario.nombre}
                                </TableCell>

                                <TableCell>
                                    {usuario.fecha_cumpleanhos}
                                </TableCell>

                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default TablaCumpleanhos