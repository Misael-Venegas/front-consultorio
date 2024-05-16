'use client'
import React, { useState } from 'react'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import { IoMdAdd } from "react-icons/io";
import ModalAgregarProductos from './ModalAgregarProductos';
const Productos = () => {
    const [openModal, setopenModal] = useState(false)
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
                            Descuento
                        </TableColumn>
                        <TableColumn>
                            Importe
                        </TableColumn>
                        <TableColumn>
                            Código de barras
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
                            <TableCell>$0.0</TableCell>
                            <TableCell>$20,750.00</TableCell>
                            <TableCell>7506425600380</TableCell>
                            <TableCell><Chip color='warning' variant='bordered' > $250.00 </Chip></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>50</TableCell>
                            <TableCell>Pieza</TableCell>
                            <TableCell>Trazil ofteno 15 ml Original</TableCell>
                            <TableCell>$298.24</TableCell>
                            <TableCell>$0.0</TableCell>
                            <TableCell>$4463.60</TableCell>
                            <TableCell>7702031291534 </TableCell>
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