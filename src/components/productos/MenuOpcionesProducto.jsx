import React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useNotification } from '@/helpers/NotificationContext';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import ModalAgregarProductos from './ModalAgregarProductos';

const MenuOpcionesProducto = ({ datosProducto, setUpdateProducto }) => {
  
    const { showNotification } = useNotification()
    const [confirDialogOpen, setconfirDialogOpen] = useState(false)
    const [openModalEditarProducto, setopenModalEditarProducto] = useState(false)

    const eliminarProducto = async () => {
        try {

            const token = sessionStorage.getItem('token')
            const urlAPI = process.env.NEXT_PUBLIC_API_URL
         
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

    const abrirModalEditar = _ => {
        setopenModalEditarProducto(true)
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
                        onClick={() => abrirModalEditar()}
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
            <ModalAgregarProductos openModal={openModalEditarProducto} producto={datosProducto} setOpenModal={setopenModalEditarProducto} setUpdateTable={setUpdateProducto} />
            <ConfirmDialog isConfirmDialogOpen={confirDialogOpen} handleCloseDialog={closeDialog} handleConfirmDelete={eliminarProducto} />
        </>
    )
}

export default MenuOpcionesProducto