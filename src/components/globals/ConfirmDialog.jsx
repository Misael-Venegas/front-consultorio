import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import React from 'react'

const ConfirmDialog = ({ setOpenModal, setConfirmDialog, text, openModal }) => {
    
    return (
        <Modal isOpen={openModal} onClose={setOpenModal(false)}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Advertencia! Esta acción es irreversible</ModalHeader>
                <ModalBody>
                    <p>{text}</p>
                    <div className="flex justify-end gap-2">
                        <Button auto flat color="error" onClick={setConfirmDialog(true)}>
                            Eliminar
                        </Button>
                        <Button auto flat onClick={setConfirmDialog(false)}>
                            Cancelar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmDialog