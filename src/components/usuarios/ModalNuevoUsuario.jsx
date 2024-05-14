import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

const ModalNuevoUsuario = ({ isOpen, setIsOpen }) => {
    const guardarUsuario = () => {
        console.log("Aqui se guardara el usuario")
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            size='4xl'
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1" >Agregar usuario</ModalHeader>
                <ModalBody>

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptatem fugit magnam dolores perferendis reprehenderit, a voluptatum error ipsum, vel quod neque itaque repellat dolorum, nesciunt quas nemo illum qui.
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
                        Cancelar
                    </Button>
                    <Button color="primary" onPress={guardarUsuario()}>
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}

export default ModalNuevoUsuario