'use client'
import React, { useState, useEffect } from 'react'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner } from '@nextui-org/react'
import { IoMdAdd } from "react-icons/io";
import ModalAgregarProductos from './ModalAgregarProductos';
import { useNotification } from '@/helpers/NotificationContext';
import MenuOpcionesProducto from './MenuOpcionesProducto';
import FiltroBusqueda from '../globals/FiltroBusqueda';

const Productos = () => {
    const [arrayProductos, setarrayProductos] = useState([])
    const [arrayAuxiliar, setarrayAuxiliar] = useState([])
    const [openModal, setopenModal] = useState(false)
    const { showNotification } = useNotification()
    const [updateTable, setupdateTable] = useState(3.1416)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        obtenerProductos()
    }, [updateTable])

    const obtenerProductos = async () => {
        try {
            setLoading(true)
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
            setarrayAuxiliar(data)
        } catch (error) {
            showNotification(error.message, 'error')
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='float-end mb-5' >
                <Button color='primary' onClick={() => setopenModal(true)} >Agregar producto <IoMdAdd /></Button>
            </div>
            <FiltroBusqueda arrayAuxiliar={arrayAuxiliar} setArray={setarrayProductos} textoPlaceholder={'Ingresa el nombre del producto'} campoBusqueda={'nombre_producto'} />
            <div className='mt-8' >
                {
                    loading && <Spinner />
                }

                {!loading && <Table onLoad={loading} aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>
                            Nombre
                        </TableColumn>

                        <TableColumn>
                            Descripción
                        </TableColumn>
                        <TableColumn>
                            Cantidad
                        </TableColumn>

                        <TableColumn>
                            Unidad
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
                                    <TableCell>{producto?.nombre_producto}</TableCell>
                                    <TableCell>{producto?.descripcion}</TableCell>
                                    <TableCell>{producto?.cantidad}</TableCell>
                                    <TableCell>{producto?.unidad}</TableCell>
                                    <TableCell>{producto?.codigo_barras} </TableCell>
                                    <TableCell>  {producto.producto_farmacia ? <Chip color='success' variant='flat' >Farmacia</Chip> : <Chip color='primary' variant='flat' >Óptica</Chip>}  </TableCell>
                                    <TableCell><Chip color='warning' variant='bordered' > ${producto?.precio_venta} </Chip></TableCell>
                                    <TableCell> <MenuOpcionesProducto datosProducto={producto} setUpdateProducto={setupdateTable} />  </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                }
            </div>
            <ModalAgregarProductos openModal={openModal} setOpenModal={setopenModal} setUpdateTable={setupdateTable} producto={null} />
        </>
    )
}

export default Productos