import { Card, CardBody, CardHeader, Select, SelectItem, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { meses, listaAnhos } from '../../helpers/globals'
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { peticionesPost } from '@/helpers/peticionesAPI';
import { useNotification } from '@/helpers/NotificationContext';

const CardVentasPormes = () => {
    const { showNotification } = useNotification()
    const [mes, setmes] = useState((new Date().getMonth() + 1).toString())
    const [anhio, setanhio] = useState(listaAnhos.anhioActual.toString())
    const [total, settotal] = useState(0.0)
    const [loading, setloading] = useState(false)
    useEffect(() => {
        obtenerVentasPorMes()
    }, [mes, anhio])

    const obtenerVentasPorMes = async () => {
        try {
            setloading(true)
            const response = await peticionesPost('obtener-total-ventas-por-mes', true, { mes, anhio })

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
        <Card className="py-4 ">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Ventas por mes</h4>

                <div className='flex w-full flex-wrap md:flex-nowrap gap-4' >
                    <Select
                        label='Mes'
                        size='sm'
                        variant='underlined'
                        defaultSelectedKeys={[mes]}
                        onChange={(e) => setmes(e.target.value)}
                    >
                        {
                            meses.map((item) => (
                                <SelectItem key={item.key} >
                                    {item.label}
                                </SelectItem>
                            ))
                        }
                    </Select>

                    <Select
                        label='Año'
                        size='sm'
                        variant='underlined'
                        defaultSelectedKeys={[anhio]}
                        onChange={(e) => setanhio(e.target.value)}
                    >
                        {
                            listaAnhos.arrayAnnhios.map((item) => (
                                <SelectItem key={item.key} >
                                    {item.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>

            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div  >
                    {
                        loading && <Spinner />
                    }
                    {!loading && <h3 className='font-bold text-4xl' >
                        ${total}
                    </h3>}
                    <FaMoneyBillTrendUp />

                </div>

            </CardBody>

        </Card>
    )
}

export default CardVentasPormes