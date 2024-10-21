import { Card, CardBody, CardHeader, DatePicker, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { PiMoneyThin } from "react-icons/pi";
import { today, getLocalTimeZone } from '@internationalized/date';
import { useNotification } from '@/helpers/NotificationContext';
import { peticionesPost } from '@/helpers/peticionesAPI';
const CardVentasPorDia = () => {
    const { showNotification } = useNotification()
    const [fechaVenta, setfechaVenta] = useState(today(getLocalTimeZone()))
    const [total, settotal] = useState(0.0)
    const [loading, setloading] = useState(false)
    useEffect(() => {
        obtenerTotalDeVentas()
    }, [fechaVenta])

    const obtenerTotalDeVentas = async () => {
        try {
            setloading(true)
            const response = await peticionesPost('total-ventas-por-dia', true, { fecha: `${fechaVenta.year}-${fechaVenta.month}-${fechaVenta.day}` })
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()
          
            settotal(data.total ? data.total : 0.0)
        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setloading(false)
        }
    }

    return (
        <Card className="py-4 bg-blue-200 h-[100%]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Ventas por día</h4>

                <DatePicker size='sm'
                    color='primary'
                    value={fechaVenta}
                    onChange={setfechaVenta}
                     variant='underlined'
                />

            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div  >
                    {
                        loading && <Spinner />
                    }
                    {!loading && <h3 className='font-bold text-4xl' >
                        ${total}
                    </h3>
                    }
                    <PiMoneyThin />

                </div>

            </CardBody>
        </Card>
    )
}

const stilosDatePicker = {
    backgroundColor: '$blue200', // Color igual que el card 
    color: '$blue800', // Color de texto 
    borderRadius: '8px' // Bordes redondeados
}

export default CardVentasPorDia