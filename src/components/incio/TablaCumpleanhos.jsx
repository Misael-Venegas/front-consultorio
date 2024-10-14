import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Spinner } from '@nextui-org/react'
import { useNotification } from '@/helpers/NotificationContext'
import { peticionGet } from '@/helpers/peticionesAPI'
const TablaCumpleanhos = () => {
    const [listaCumpleanhos, setlistaCumpleanhos] = useState([])
    const { showNotification } = useNotification()
    const [loading, setloading] = useState(false)
    useEffect(() => {
        obtenerListaCumpleanhos()
    }, [])

    const obtenerListaCumpleanhos = async () => {
        try {
            setloading(true)

            const response = await peticionGet('obtener-lista-cumpleanhos', true)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError)
            }
            const data = await response.json()
            setlistaCumpleanhos(data)
        } catch (error) {
            showNotification(error.message, 'error')
        }
        finally {
            setloading(false)
        }
    }

    return (
        <div className='my-8'>
            <h4 className='font-bold text-large' >Cumpleaños próximo</h4>
            {
                loading && <Spinner />
            }
            {!loading && <Table className='pl-3'  >
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
            </Table>}
        </div>
    )
}

export default TablaCumpleanhos