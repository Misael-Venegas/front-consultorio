import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalContent, Input, Button } from '@nextui-org/react'
import ErrorAlert from '../globals/ErrorAlert';
import NotificationAlertSucces from '../globals/SuccesNotificationLogin';
const ModalRecuperarContrasenha = ({ openModal, setOpenModal }) => {

    const [loading, setloading] = useState(false)
    const [correoElectronico, setcorreoElectronico] = useState('')
    const [error, seterror] = useState('')
    const [succesNotification, setSuccesNotification] = useState('')
    const enviarCorreo = async () => {
        seterror('')
        setSuccesNotification('')
        try {
            setloading(true)
            if (correoElectronico === '') {
                seterror('Ingresa el correo electrónico')
                return
            }

            const url = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${url}users/recuperar-contrasenha/${correoElectronico}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                const erroData = await response.json()
                throw new Error(erroData.message)
            }

            setSuccesNotification('El correo se envió de manera exitosa')

            setTimeout(() => {
                setOpenModal(false)
            }, 1000);
        } catch (error) {
            seterror(error.message)
        } finally {
            setloading(false)
        }
    }
    return (
        <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
        >
            <ModalContent>
                <ModalHeader> Recuperar contraseña</ModalHeader>
                <ModalBody>
                    <span >Ingresa tu correo electrónico </span>
                    <Input type='email' placeholder='Ejemplo: user@gmail.com' onChange={(e) => setcorreoElectronico(e.target.value)} />
                    <Button color='primary' onClick={() => enviarCorreo()} isLoading={loading} > Enviar </Button>
                    {
                        error != '' && <ErrorAlert mensaje={error} />
                    }

                    {
                        succesNotification != '' && <NotificationAlertSucces mensaje={succesNotification} />
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalRecuperarContrasenha