import React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useNotification } from '@/helpers/NotificationContext';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

const MenuOpcionesProducto = ({ datosProducto, setUpdateProducto }) => {
    console.log(datosProducto)
    const { showNotification } = useNotification()
    const [confirDialogOpen, setconfirDialogOpen] = useState(false)

    const eliminarProducto = async () => {
        try {

            console.log('Se elimina ', datosProducto.id)
            const token = sessionStorage.getItem('token')
            const urlAPI = process.env.NEXT_PUBLIC_API_URL
            console.log(urlAPI)
            const response = await fetch(`${urlAPI}eliminar-producto/${datosProducto.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }

            showNotification('El producto se eliminó de manera correcta', 'success')

        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setUpdateProducto(Math.random())
            setconfirDialogOpen(false)
        }

    }

    const abrirVentanaConfirmarEliminacion = () => {
        setconfirDialogOpen(true)
    }

    const closeDialog = _ => {
        setconfirDialogOpen(false)
    }
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        isIconOnly={true}
                    >
                        <BsThreeDots />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="edit" textValue='Editar'
                    // onClick={() => openModalEditarusuario()}
                    >
                        <span className='inline-flex'>Editar <MdEdit /> </span>
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        textValue='Eliminar'
                        onClick={() => abrirVentanaConfirmarEliminacion()}
                    >
                        <span className='inline-flex'>Eliminar <MdDelete /></span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <ConfirmDialog isConfirmDialogOpen={confirDialogOpen} handleCloseDialog={closeDialog} handleConfirmDelete={eliminarProducto} />
        </>
    )
}

export default MenuOpcionesProducto