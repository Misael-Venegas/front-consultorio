import { useNotification } from '@/helpers/NotificationContext'
import { peticionGet } from '@/helpers/peticionesAPI'
import { Input, Card } from '@nextui-org/react'
import React, { useState } from 'react'

const AutoCompleteClientes = ({ formData, error, handleChange }) => {
    const { showNotification } = useNotification()
    const [listaPacientes, setListaPacientes] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const [nombre, setnombre] = useState('')
    const [fechaNacimiento, setfechaNacimiento] = useState('')
    const [telefono, settelefono] = useState('')


    const filtrarPacientes = async (e) => {
        if (e !== '') {
            try {
                const response = await peticionGet(`filtrar-pacientes/${e}`, true)

                if (!response.ok) {
                    const dataError = await response.json()
                    throw new Error(dataError.message)
                }
                const data = await response.json()

                setListaPacientes(data)
                setIsDropdownVisible(true)
                //  console.log(data)
            } catch (error) {
                showNotification(error.message, 'error')
            }

        }
    }
    const seleccionarPaciente = (paciente) => {
        setIsDropdownVisible(false)
        console.log(paciente)
        setnombre(paciente?.nombre + ' ' + paciente?.apaterno + ' ' + paciente?.amaterno)
        setfechaNacimiento(paciente.fecha_naciemiento)
        settelefono(paciente?.telefono)
        handleChange('idPaciente', paciente.id)

    }
    return (
        <>
            <Input
                onChange={(e) => filtrarPacientes(e.target.value)}
                placeholder='Ingresa el nombre o apellidos'
                isInvalid={error.idPaciente ? true : false}
                errorMessage={error.idPaciente && "Seleccione un paciente"}

            />
            {
                isDropdownVisible && listaPacientes.length > 0 && <Card>
                    {
                        listaPacientes?.map((paciente, key) => (
                            <div
                                key={key}
                                onClick={() => seleccionarPaciente(paciente)}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                <span > {paciente.nombre}</span>
                            </div>
                        ))
                    }
                </Card>
            }
            {
                nombre && <> <div className='flex flex-col md:flex-row pt-5' >
                    <div className='w-full md:w-[50%] ml-5 mr-5' > {nombre} </div>
                    <div className='w-full md:w-[50%] ml-5 mr-5' > {fechaNacimiento} </div>
                </div>
                    <div className='flex flex-col md:flex-row mt-5'>
                        <div className='w-full md:w-[50%] ml-5 mr-5' >

                            {telefono}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default AutoCompleteClientes