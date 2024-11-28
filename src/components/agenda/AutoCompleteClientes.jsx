import { useNotification } from '@/helpers/NotificationContext'
import { peticionGet } from '@/helpers/peticionesAPI'
import { Input, Card } from '@nextui-org/react'
import React, { useState } from 'react'

const AutoCompleteClientes = () => {
    const { showNotification } = useNotification()
    const [listaPacientes, setListaPacientes] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleChange = (e) => {
        console.log(e)
    }

    const filtrarPacientes = async (e) => {
        if (e !== '') {
            try {
                console.log(e)
                const response = await peticionGet(`filtrar-pacientes/${e}`, true)

                if (!response.ok) {
                    const dataError = await response.json()
                    throw new Error(dataError.message)
                }
                const data = await response.json()
                setListaPacientes(data)
                setIsDropdownVisible(true)
                console.log(data)
            } catch (error) {
                showNotification(error.message, 'error')
            }

        }
    }
    const seleccionarPaciente = (paciente) => {
        setIsDropdownVisible(false)
        console.log(paciente)
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
                                <span onClick={()=> handleChange(paciente)} > {paciente.nombre}</span>
                            </div>
                        ))
                    }
                </Card>
            }
        </>
    )
}

export default AutoCompleteClientes