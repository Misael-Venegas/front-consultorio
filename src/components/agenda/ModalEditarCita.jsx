import { useNotification } from '@/helpers/NotificationContext'
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { today, getLocalTimeZone, parseDate } from '@internationalized/date'
import { peticionesPost } from '@/helpers/peticionesAPI'
const ModalEditarCita = ({ openModal, setOpenModal, setActualizarCards, especialistas, cita }) => {

    const { showNotification } = useNotification()
    const [loading, setloading] = useState(false)

    const [formData, setFormData] = useState(
        {
            id: cita?.id,
            fecha: parseDate(cita.fecha),
            hora: cita?.hora,
            motivo: cita?.motivo_consulta,
            idUsuario: cita?.id_especialista,
        }
    )
    const [error, setError] = useState({}); // Para manejar los errores de cada campo


    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
        setError((prevError) => ({
            ...prevError,
            [field]: !value // Si el valor está vacío, marcar como error
        }));
    };

    const editarCita = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            const newError = {
                fecha: !formData.fecha,
                hora: !formData.hora,
                motivo: !formData.motivo,
                idUsuario: !formData.idUsuario,
            };
            setError(newError);
            // Si hay algún campo vacío, no continuar
            if (Object.values(newError).some((hasError) => hasError)) {
                return;
            }
            console.log(formData)


            const fechaCitaFormateada = formatearFecha(formData.fecha)

            formData.fecha = fechaCitaFormateada

            const response = await peticionesPost('editar-cita', true, formData)

            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }

            showNotification("La cita se editó de manera correcta", 'success')
            setActualizarCards(Math.random())
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    const formatearFecha = (fecha) => {
        try {
            console.log(fecha)
            return fecha.year + "-" + fecha.month.toString().padStart(2, '0') + "-" + fecha.day.toString().padStart(2, '0')
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Modal
            size='4xl'
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
        >


            <ModalContent>
                <ModalHeader>Editar cita - {cita.paciente} - {cita.fecha}</ModalHeader>
                <ModalBody>
                    <form className='space-y-4' onSubmit={editarCita} >
                        <div className='flex flex-col md:flex-row' >

                            <div className='w-full md:w-[50%] ml-5 mr-5 ' >
                                <span>Fecha</span> <span style={{ color: 'red' }} >*</span>
                                <DatePicker
                                    onChange={(value) => handleChange('fecha', value)}
                                    isRequired
                                    isInvalid={error.fecha ? true : false}
                                    errorMessage={error.fecha && "Este campo es obligatorio"}
                                    color='primary'
                                />
                            </div>
                            <div className='w-full md:w-[50%] ml-5 mr-5 ' >
                                <span>Hora</span> <span style={{ color: 'red' }} >*</span>
                                <Input
                                    type='time'
                                    value={formData.hora}
                                    onChange={(e) => handleChange('hora', e.target.value)}
                                    isRequired
                                    isInvalid={error.hora ? true : false}
                                    errorMessage={error.hora && "Este campo es obligatorio"}
                                    color='primary'
                                />
                            </div>
                        </div>
                        <div className='ml-5 mr-5'>
                            <span>Motivo de la consulta</span> <span style={{ color: 'red' }} >*</span>
                            <Textarea
                                value={formData.motivo}
                                onChange={(e) => handleChange('motivo', e.target.value)}
                                isRequired
                                isInvalid={error.motivo ? true : false}
                                errorMessage={error.motivo && "Este campo es obligatorio"}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row' >
                            <div className='w-full md:w-[50%] ml-5 mr-5' >
                                <span>Especialista</span> <span style={{ color: 'red' }} >*</span>
                                <Select
                                    placeholder={cita.especialista}
                                    value={formData.idUsuario}
                                    onChange={(value) => handleChange('idUsuario', value.target.value)}
                                    isRequired
                                    isInvalid={error.idUsuario ? true : false}
                                    errorMessage={error.idUsuario && "Este campo es obligatorio"}
                                    defaultSelectedKeys={formData.idUsuario}
                                >
                                    {
                                        especialistas?.map(especialista => {
                                            return <SelectItem key={especialista.id} >{especialista.nombre}</SelectItem>
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                        <Button isLoading={loading} className='float-end' type="submit" color="primary"  >Guardar cita</Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalEditarCita