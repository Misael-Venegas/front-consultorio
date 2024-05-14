'use client'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import React, { useState } from 'react'
import { IoMdPersonAdd } from "react-icons/io";
import ModalNuevoUsuario from './ModalNuevoUsuario';


const Usuarios = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <div className='float-end' >
                <Button color='primary' onClick={() => setOpenModal(true)} >Agregar usuario <IoMdPersonAdd /> </Button>
            </div>
            <br />
            <div className='mt-8' >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Teléfono</TableColumn>
                        <TableColumn>e-mail</TableColumn>
                        <TableColumn>Tipo</TableColumn>
                        <TableColumn>Opciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
                            <TableCell>7471236589</TableCell>
                            <TableCell>tony@gmail.com</TableCell>
                            <TableCell><Chip color='primary' variant='flat' >Admin</Chip></TableCell>
                            <TableCell>---</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Isaias Garcia</TableCell>
                            <TableCell>7471236589</TableCell>
                            <TableCell>chai@gmail.com</TableCell>
                            <TableCell><Chip color='success' variant='flat' >Rececepcionista</Chip></TableCell>
                            <TableCell>---</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <ModalNuevoUsuario isOpen={openModal} setIsOpen={setOpenModal} />


        </>
    )
}

export default Usuarios