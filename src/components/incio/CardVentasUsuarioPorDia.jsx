import { Card, CardBody, CardHeader, DatePicker, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { RiUserStarLine } from "react-icons/ri";
import { today, getLocalTimeZone } from '@internationalized/date';
import { useNotification } from '@/helpers/NotificationContext';
import { peticionesPost } from '@/helpers/peticionesAPI';
const CardVentasUsuarioPorDia = () => {
    const { showNotification } = useNotification()
    const [loading, setloading] = useState(false)
    const [datosUsuario, setdatosUsuario] = useState('')
    const [fechaVentaventasUsuario, setfechaVentaventasUsuario] = useState(today(getLocalTimeZone()))
    useEffect(() => {
        obtenerResultadosVentasUsusario()
    }, [fechaVentaventasUsuario])

    const obtenerResultadosVentasUsusario = async () => {
        setloading(true)
        try {
            const response = await peticionesPost('obtener-usuario-con-mayor-ventas-por-dia', true, { fecha: `${fechaVentaventasUsuario.year}-${fechaVentaventasUsuario.month}-${fechaVentaventasUsuario.day}` })

            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()
    
            setdatosUsuario(data ? (data?.nombre + ' ' + data?.a_paterno) : '')
        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setloading(false)
        }
    }

    return (

        <Card className="py-4 bg-green-200 h-[100%]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold">Usuarios con mayor cantidad de ventas por día</h4>
                <DatePicker
                    size='sm'
                    color='success'
                    variant='underlined'
                    value={fechaVentaventasUsuario}
                    onChange={setfechaVentaventasUsuario}
                />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div  >
                    {
                        loading && <Spinner />
                    }
                    {
                        !loading && <h3 className='font-bold  text-2xl' >

                            {datosUsuario}
                        </h3>
                    }
                </div>
                <RiUserStarLine />
            </CardBody>
        </Card>
    )
}

export default CardVentasUsuarioPorDia