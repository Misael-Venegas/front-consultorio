import React, { useState } from 'react'
import {
    Modal, ModalBody, ModalContent, ModalHeader, Button, DatePicker, Input, Textarea,
    Select, SelectItem, Switch, Autocomplete, AutocompleteItem
} from '@nextui-org/react'
import FormPacienteNuevo from './FormPacienteNuevo';
import { peticionesPost } from '@/helpers/peticionesAPI';
import { useNotification } from '@/helpers/NotificationContext';
import AutoCompleteClientes from './AutoCompleteClientes';

const ModalNuevaCita = ({ openModal, setOpenModal, setActualizarCards, especialistas }) => {
    const { showNotification } = useNotification()
    const [loading, setloading] = useState(false)
    const [formData, setFormData] = useState(
        {
            fecha: "",
            hora: "",
            motivo: "",
            idUsuario: "",
            idPaciente: "",
            nombrePaciente: "",
            aPaternoPaciente: "",
            aMaternoPaciente: "",
            telefonoPaciente: "",
            pacienteNuevo: false,
            fechaNacimientoPaciente: ""
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
    const guardarCita = async (e) => {
        e.preventDefault()
        // Verificar si algún campo está vacío
        try {
            setloading(true)
            const newError = {
                fecha: !formData.fecha,
                hora: !formData.hora,
                motivo: !formData.motivo,
                idUsuario: !formData.idUsuario,
                idPaciente: formData.pacienteNuevo ? '' : !formData.idPaciente,
                nombrePaciente: !formData.pacienteNuevo ? '' : !formData.nombrePaciente,
                aPaternoPaciente: !formData.pacienteNuevo ? '' : !formData.aPaternoPaciente,
                telefonoPaciente: !formData.pacienteNuevo ? '' : !formData.telefonoPaciente,
                fechaNacimientoPaciente: !formData.pacienteNuevo ? '' : !formData.fechaNacimientoPaciente
            };
            setError(newError);

            // Si hay algún campo vacío, no continuar
            if (Object.values(newError).some((hasError) => hasError)) {
                return;
            }
            const fechaCitaFormateada = formatearFecha(formData.fecha)
            const fechaNacimientoClienteFormateada = formatearFecha(formData.fechaNacimientoPaciente)

            formData.fecha = fechaCitaFormateada
            formData.fechaNacimientoPaciente = fechaNacimientoClienteFormateada

            const response = await peticionesPost('agendar-cita', true, formData)

            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }

            showNotification("La cita se agrego de manera correcta", 'success')
            setActualizarCards(Math.random())
            setOpenModal(false)
        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setloading(false)
        }

    }

    const formatearFecha = (fecha) => {
        try {

            return fecha.year + "-" + fecha.month.toString().padStart(2, '0') + "-" + fecha.day.toString().padStart(2, '0')
        } catch (error) {
            console.log(error.message)
        }
    }

    const obtnerPacientes = (e) => {
        console.log(e)
    }

    return (
        <Modal
            size='4xl'
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
        >


            <ModalContent>
                <ModalHeader>Agregar cita</ModalHeader>
                <ModalBody>
                    <form className='space-y-4' onSubmit={guardarCita} >

                        <div className='mr-5 ml-5' >
                            <Switch
                                size='sm'
                                checked={formData.pacienteNuevo}
                                onChange={(e) => handleChange('pacienteNuevo', e.target.checked)}
                            >¿El paciente es nuevo?
                            </Switch>
                        </div>
                        {
                            formData.pacienteNuevo && <>
                                <FormPacienteNuevo formData={formData} error={error} handleChange={handleChange} />
                            </>
                        }
                        {
                            !formData.pacienteNuevo && <div className='flex flex-col md:flex-row'>
                                <div className='w-full md:w-[50%] ml-5 mr-5' >
                                    { /* <Autocomplete
                                        value={formData.idPaciente}
                                        isRequired
                                        isInvalid={error.idPaciente ? true : false}
                                        errorMessage={error.idPaciente && "Este campo es obligatorio"}
                                        onChange={(e) => obtnerPacientes(e.target.value)}
                                    ></Autocomplete>
                                    */}
                                    <AutoCompleteClientes />
                                </div>

                            </div>
                        }
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
                                    placeholder='Selecciona un especialista'
                                    value={formData.idUsuario}
                                    onChange={(value) => handleChange('idUsuario', value.target.value)}
                                    isRequired
                                    isInvalid={error.idUsuario ? true : false}
                                    errorMessage={error.idUsuario && "Este campo es obligatorio"}
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

export default ModalNuevaCita