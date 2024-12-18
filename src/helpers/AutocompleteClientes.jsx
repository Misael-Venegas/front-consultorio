import { useNotification } from '@/helpers/NotificationContext'
import { peticionGet } from '@/helpers/peticionesAPI'
import { Input, Card } from '@nextui-org/react'
import React, { useState } from 'react'

const AutoCompleteClientes = ({ setIdPaciente, setArrayDatos }) => {
    const { showNotification } = useNotification()
    const [listaPacientes, setListaPacientes] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const [nombre, setnombre] = useState('')


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

            } catch (error) {
                showNotification(error.message, 'error')
            }

        }
    }
    const seleccionarPaciente = async (paciente) => {
        try {

            setIsDropdownVisible(false)
            setnombre(paciente?.nombre + ' ' + paciente?.apaterno + ' ' + paciente?.amaterno)
            setIdPaciente(paciente.id)

            const response = await peticionGet(`obtener-citas-por-usuario/${paciente.id}`, true)

            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()
            console.log(data)
            setArrayDatos(data)
            setIsDropdownVisible(true)

        } catch (error) {
            showNotification(error.message, 'error')
        }
    }


    return (
        <>
            <Input
                onChange={(e) => filtrarPacientes(e.target.value)}
                placeholder='Ingresa el nombre o apellidos'
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
                                <span > {paciente.nombre + ' ' + paciente.apaterno + ' ' + paciente.amaterno}</span>
                            </div>
                        ))
                    }
                </Card>
            }

        </>
    )
}

export default AutoCompleteClientes