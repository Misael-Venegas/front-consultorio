import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNotification } from '@/helpers/NotificationContext'
import { peticionGet } from '@/helpers/peticionesAPI'
import ConfirmDialog from '@/helpers/ConfirmDialog'
import { FaCheck } from "react-icons/fa6";
import { BiBlock } from "react-icons/bi";
import ModalEditarCita from './ModalEditarCita'

const MenuOpciones = ({ cita, setActualizarTabla, especialistas }) => {
    const { showNotification } = useNotification()
    const [confirDialogOpen, setconfirDialogOpen] = useState(false)
    const [openModalEditarCita, setopenModalEditarCita] = useState(false)

    const cancelarCita = async () => {
        try {
            const response = await peticionGet(`cancalar-cita/${cita.id}`, true)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            setActualizarTabla(Math.random())
            showNotification('Cita cancelada', 'success')
            closeDialog()
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

    const concluirCita = async (tipo) => {
        try {
            const response = await peticionGet(`aprobar-cita/${cita.id}/${tipo}`, true)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            setActualizarTabla(Math.random())
            showNotification('Cita concluida', 'success')
        } catch (error) {
            showNotification(error.message, 'error')
        }
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
                        onClick={() => setopenModalEditarCita(true)}
                    >
                        <span className='inline-flex'>Editar <MdEdit /> </span>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => concluirCita(2)}
                    >
                        <span className='inline-flex'>Concluir cita <FaCheck /> </span>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => concluirCita(4)}
                    >
                        <span className='inline-flex'>No asistió <BiBlock /> </span>
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
            <ModalEditarCita openModal={openModalEditarCita} setOpenModal={setopenModalEditarCita} especialistas={especialistas} setActualizarCards={setActualizarTabla} cita={cita} />
        </>
    )
}

export default MenuOpciones