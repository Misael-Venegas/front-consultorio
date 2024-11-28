import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNotification } from '@/helpers/NotificationContext'
import { peticionGet } from '@/helpers/peticionesAPI'
import ConfirmDialog from '@/helpers/ConfirmDialog'

const MenuOpciones = ({ cita, setActualizarTabla }) => {
    const { showNotification } = useNotification()
    const [confirDialogOpen, setconfirDialogOpen] = useState(false)
    const [openModalEditarProducto, setopenModalEditarProducto] = useState(false)

    const cancelarCita = async () => {
        try {

            console.log(cita.id)
            const response = await peticionGet(`cancalar-cita/${cita.id}`, true)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            setActualizarTabla(Math.random())
            showNotification('Cita cancelada', 'success')
        } catch (error) {
            showNotification(error.message, 'error')
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
                        <FaChevronDown />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="edit" textValue='Editar'

                    >
                        <span className='inline-flex'>Editar <MdEdit /> </span>
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        textValue='Cancelar'
                        onClick={() => abrirVentanaConfirmarEliminacion()}
                    >
                        <span className='inline-flex'>Cancelar cita <MdDelete /></span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <ConfirmDialog isConfirmDialogOpen={confirDialogOpen} handleCloseDialog={closeDialog} handleConfirmDelete={cancelarCita} texto={'¿Deseas cancelar esta cita?'} encabezado={'Cancelar cita'} textoBoton={'Cancelar cita'} />

        </>
    )
}

export default MenuOpciones