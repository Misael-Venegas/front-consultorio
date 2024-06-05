import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNotification } from '@/helpers/NotificationContext';
import { useState } from 'react';

const MenuOpcionsUsuarios = ({ datosUsuario, setUpdateUsuario }) => {
    const { showNotification } = useNotification()
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const eliminarUsuario = async () => {
        const token = localStorage.getItem('token')
        const urlAPI = process.env.NEXT_PUBLIC_API_URL
        console.log(datosUsuario, token, urlAPI)
        try {

            const response = await fetch(
                `${urlAPI}eliminarUsuario/${datosUsuario.id}`, {
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

            showNotification('El usuario se eliminó de manera correcta', 'success')
            setUpdateUsuario(Math.random())
            setIsConfirmDialogOpen(false)
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    const handleDeleteClick = () => {
        setIsConfirmDialogOpen(true);
    }

    const handleConfirmDelete = () => {
        eliminarUsuario();
    }

    const handleCloseDialog = () => {
        setIsConfirmDialogOpen(false);
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
                    <DropdownItem key="edit" textValue='Editar'>
                        <span className='inline-flex'>Editar <MdEdit /> </span>
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        textValue='Eliminar'
                        onClick={handleDeleteClick}
                    >
                        <span className='inline-flex'>Eliminar <MdDelete /></span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isConfirmDialogOpen} onClose={handleCloseDialog}>
                <ModalContent>
                    <ModalHeader>Eliminar: {datosUsuario.nombre}</ModalHeader>
                    <ModalBody >
                        <div class="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-2 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Estás seguro de que deseas eliminar este usuario?</h3>


                        </div>
                        <div className="flex justify-end gap-2">
                            <Button auto flat color="danger" onClick={handleConfirmDelete}>
                                Eliminar
                            </Button>
                            <Button auto flat onClick={handleCloseDialog}>
                                Cancelar
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MenuOpcionsUsuarios
