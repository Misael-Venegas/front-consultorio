'use client'
import React, { useState, useEffect } from 'react'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import { IoMdAdd } from "react-icons/io";
import ModalAgregarProductos from './ModalAgregarProductos';
import { useNotification } from '@/helpers/NotificationContext';
import MenuOpcionesProducto from './MenuOpcionesProducto';

const Productos = () => {
    const [arrayProductos, setarrayProductos] = useState([])
    const [openModal, setopenModal] = useState(false)
    const { showNotification } = useNotification()
    const [updateTable, setupdateTable] = useState(3.1416)
    useEffect(() => {
        obtenerProductos()
    }, [updateTable])

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
                        <TableColumn>
                            Opciones
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            arrayProductos.map((producto, key) => {
                                return <TableRow key={key}>
                                    <TableCell>{producto?.cantidad}</TableCell>
                                    <TableCell>{producto?.unidad}</TableCell>
                                    <TableCell>{producto?.descripcion}</TableCell>
                                    <TableCell>${producto?.precio_unitario}</TableCell>
                                    <TableCell>${producto?.importe}</TableCell>
                                    <TableCell>{producto?.codigo_barras} </TableCell>
                                    <TableCell>  {producto.producto_farmacia ? <Chip color='success' variant='flat' >Farmacia</Chip> : <Chip color='primary' variant='flat' >Óptica</Chip>}  </TableCell>
                                    <TableCell><Chip color='warning' variant='bordered' > ${producto?.precio_venta} </Chip></TableCell>
                                    <TableCell> <MenuOpcionesProducto datosProducto={producto} setUpdateProducto={setupdateTable} />  </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>

                <ModalAgregarProductos openModal={openModal} setOpenModal={setopenModal} setUpdateTable={setupdateTable} />
            </div>
        </>
    )
}

export default Productos