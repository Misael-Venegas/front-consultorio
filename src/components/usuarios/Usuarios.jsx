'use client'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { IoMdPersonAdd } from "react-icons/io";
import ModalNuevoUsuario from './ModalNuevoUsuario';
import MenuOpcionsUsuarios from './MenuOpcionsUsuarios';
import { useNotification } from '@/helpers/NotificationContext';


const Usuarios = () => {
    const { showNotification } = useNotification()
    const [openModal, setOpenModal] = useState(false)
    const [arrayUsuarios, setArrayUsuarios] = useState([])
    const [updateUsuarios, setupdateUsuarios] = useState(3.1416)
    useEffect(() => {
        obtenerUsuarios()
    }, [updateUsuarios])

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
            showNotification(error.message, 'error');
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
                            arrayUsuarios.map((e, key) => {
                                return <TableRow key={key}>
                                    <TableCell>{e.nombre + ' ' + e.a_paterno + ' ' + e.a_materno}</TableCell>
                                    <TableCell>{e.telefono}</TableCell>
                                    <TableCell>{e.correo}</TableCell>
                                    <TableCell><Chip color={e.rol === 'Administrador' ? 'primary' : (e.rol === 'Recepcionista' || e.rol === 'Farmacia') ? 'success' : 'warning'} variant='flat' >{e.rol}</Chip></TableCell>
                                    <TableCell> <MenuOpcionsUsuarios datosUsuario={e} setUpdateUsuario={setupdateUsuarios} /> </TableCell>
                                </TableRow>
                            })
                        }


                    </TableBody>
                </Table>
            </div>
            {
                openModal && <ModalNuevoUsuario isOpen={openModal} setIsOpen={setOpenModal} datosUsuario={[]} setActualizarUsuario={setupdateUsuarios} />

            }
        </>
    )
}

export default Usuarios