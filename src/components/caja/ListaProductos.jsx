import React, { useEffect } from 'react'
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { MdDelete } from "react-icons/md";

const ListaProductos = ({ listaProductos, setListaProductos, setTotalVentas }) => {

    useEffect(() => {
        const total = listaProductos.reduce((acc, producto) => {
            return acc + producto.precioFinal
        }, 0)
        setTotalVentas(total)
    }, [listaProductos])

    const quitarProducto = (index) => {

        const arrayAuxiliar = listaProductos

        arrayAuxiliar.splice(index, 1)
        setListaProductos([...arrayAuxiliar])

    }

    return (
        <>
            {
                listaProductos.length > 0 && <Table className='pt-8'>
                    <TableHeader>
                        <TableColumn>
                            Producto
                        </TableColumn>
                        <TableColumn>
                            Cantidad
                        </TableColumn>
                        <TableColumn>
                            Precio unitario
                        </TableColumn>
                        <TableColumn>
                            Descuento %
                        </TableColumn>
                        <TableColumn>
                            Precio Final
                        </TableColumn>
                        <TableColumn>
                            Opciones
                        </TableColumn>

                    </TableHeader>
                    <TableBody>

                        {
                            listaProductos.map((producto, key) => {
                                return <TableRow key={key} >
                                    <TableCell>
                                        {producto.nombre_producto}
                                    </TableCell>

                                    <TableCell>
                                        {producto.cantidad}
                                    </TableCell>
                                    <TableCell>
                                        ${producto.precio_venta}
                                    </TableCell>
                                    <TableCell className='text-center' >
                                        {producto.descuento > 0 ? <Chip color='warning' radius='sm' variant='flat' > {producto.descuento} %</Chip> : ''}
                                    </TableCell>
                                    <TableCell >
                                        <Chip color='success' variant='light' >${producto.precioFinal}</Chip>
                                    </TableCell>
                                    <TableCell style={{ color: 'red' }} >

                                        <MdDelete className='seccionar-item' onClick={() => quitarProducto(key)} />
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            }
        </>
    )
}

export default ListaProductos