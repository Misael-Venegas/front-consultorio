import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import React from 'react'

const ConfirmDialog = ({ isConfirmDialogOpen, handleCloseDialog, handleConfirmDelete }) => {
    return (
        <Modal isOpen={isConfirmDialogOpen} onClose={handleCloseDialog}>
            <ModalContent>
                <ModalHeader> Eliminar producto</ModalHeader>
                <ModalBody >
                    <div className="p-4 md:p-5 text-center">
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
    )
}

export default ConfirmDialog