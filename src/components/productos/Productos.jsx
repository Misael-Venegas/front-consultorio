'use client'
import React, { useState, useEffect } from 'react'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import { IoMdAdd } from "react-icons/io";
import ModalAgregarProductos from './ModalAgregarProductos';
import { useNotification } from '@/helpers/NotificationContext';

const Productos = () => {
    const [arrayProductos, setarrayProductos] = useState([])
    const [openModal, setopenModal] = useState(false)
    const { showNotification } = useNotification()
    useEffect(() => {
        obtenerProductos()
    }, [])

    const obtenerProductos = async () => {
        try {
            const urlAPI = process.env.NEXT_PUBLIC_API_URL
            const token = sessionStorage.getItem('token')

            const response = await fetch(`${urlAPI}obtenerProductos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            const data = await response.json()
            console.log(data)
            setarrayProductos(data)
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }
    return (
        <>
            <div className='float-end mb-5' >
                <Button color='primary' onClick={() => setopenModal(true)} >Agregar producto <IoMdAdd /></Button>
            </div>

            <div className='mt-8' >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>
                            Cantidad
                        </TableColumn>
                        <TableColumn>
                            Unidad
                        </TableColumn>
                        <TableColumn>
                            Descripción
                        </TableColumn>
                        <TableColumn>
                            Precio Unitario
                        </TableColumn>

                        <TableColumn>
                            Importe
                        </TableColumn>
                        <TableColumn>
                            Código de barras
                        </TableColumn>
                        <TableColumn>
                            Establecimiento
                        </TableColumn>
                        <TableColumn>
                            Precio de venta
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>50</TableCell>
                            <TableCell>Pieza</TableCell>
                            <TableCell>Humylub ofteno PF duo pack (10 ML por frasco)</TableCell>
                            <TableCell>$415.00</TableCell>

                            <TableCell>$20,750.00</TableCell>
                            <TableCell>7506425600380</TableCell>

                            <TableCell> <Chip color='primary' variant='flat' >Optica</Chip> </TableCell>
                            <TableCell><Chip color='warning' variant='bordered' > $250.00 </Chip></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>50</TableCell>
                            <TableCell>Pieza</TableCell>
                            <TableCell>Trazil ofteno 15 ml Original</TableCell>
                            <TableCell>$298.24</TableCell>

                            <TableCell>$4463.60</TableCell>
                            <TableCell>7702031291534 </TableCell>
                            <TableCell> <Chip color='success' variant='flat' >Farmacia</Chip> </TableCell>
                            <TableCell><Chip color='warning' variant='bordered' > $100.00 </Chip></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <ModalAgregarProductos openModal={openModal} setOpenModal={setopenModal} />
            </div>
        </>
    )
}

export default Productos