import React from 'react'

import { Modal, ModalContent, ModalHeader, ModalBody, Input, Button } from '@nextui-org/react'
const ModalCodigoVendedor = ({ openModal, setOpenModal, setCodigoVendedor, realizarVenta }) => {


    return (
        <>
            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <ModalContent>

                    <ModalHeader>
                        Datos del vendedor
                    </ModalHeader>
                    <ModalBody>

                        <div>
                            <span>Ingresa tu código de vendedor para concluir el proceso</span>
                            <Input type='password' placeholder='Código vendedor' className='pt-2' onChange={(e) => setCodigoVendedor(e.target.value)} />
                        </div>
                        <div className='pt-3'>
                            <Button color='primary' onClick={() => realizarVenta()} className='float-end' > Concluir venta </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalCodigoVendedor