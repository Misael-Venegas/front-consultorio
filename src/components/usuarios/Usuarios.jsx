'use client'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { IoMdPersonAdd } from "react-icons/io";
import ModalNuevoUsuario from './ModalNuevoUsuario';


const Usuarios = () => {
    const [openModal, setOpenModal] = useState(false)
    const [arrayUsuarios, setArrayUsuarios] = useState([])
    useEffect(() => {
        obtenerUsuarios()
    }, [openModal])

    const obtenerUsuarios = async _ => {
        try {
            const urlAPI = process.env.NEXT_PUBLIC_API_URL
            const token = localStorage.getItem('token')
            const response = await fetch(`${urlAPI}obtenerUsuarios`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json()
            setArrayUsuarios(data)
        } catch (error) {
            console.log(error)
        }
    }

    //console.log(arrayUsuarios)
    return (
        <>
            <div className='float-end mb-5' >
                <Button color='primary' onClick={() => setOpenModal(true)} >Agregar usuario <IoMdPersonAdd /> </Button>
            </div>

            <div className='mt-8' >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Teléfono</TableColumn>
                        <TableColumn>e-mail</TableColumn>
                        <TableColumn>Rol</TableColumn>
                        <TableColumn>Opciones</TableColumn>
                    </TableHeader>
                    <TableBody>

                        {
                            arrayUsuarios.map(e => {
                                return <TableRow key="1">
                                    <TableCell>{e.nombre}</TableCell>
                                    <TableCell>{e.telefono}</TableCell>
                                    <TableCell>{e.correo}</TableCell>
                                    <TableCell><Chip color={e.rol === 'Administrador' ? 'primary' : (e.rol === 'Recepcionista' || e.rol === 'Farmacia') ? 'success' : 'warning'} variant='flat' >{e.rol}</Chip></TableCell>
                                    <TableCell>---</TableCell>
                                </TableRow>
                            })
                        }


                    </TableBody>
                </Table>
            </div>
            {
                openModal && <ModalNuevoUsuario isOpen={openModal} setIsOpen={setOpenModal} />

            }
        </>
    )
}

export default Usuarios