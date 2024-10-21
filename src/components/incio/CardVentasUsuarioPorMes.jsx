import { listaAnhos, meses } from '@/helpers/globals';
import { useNotification } from '@/helpers/NotificationContext';
import { peticionesPost } from '@/helpers/peticionesAPI';
import { Card, CardBody, CardHeader, Select, SelectItem, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FiUserCheck } from "react-icons/fi";

const CardVentasUsuarioPorMes = () => {
    const { showNotification } = useNotification()
    const [mes, setmes] = useState((new Date().getMonth() + 1).toString())
    const [anhio, setanhio] = useState(listaAnhos.anhioActual.toString())
    const [loading, setloading] = useState(false)
    const [nombreUsuario, setnombreUsuario] = useState('')
    useEffect(() => {
        obtenerDatosVendedor()
    }, [mes, anhio])

    const obtenerDatosVendedor = async () => {
        try {
            setloading(true)
            const response = await peticionesPost('obtener-usuarios-mayor-ventas-por-mes', true, { mes, anhio })
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()

            setnombreUsuario(data?.nombre_empleado ? data.nombre_empleado : '')
        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setloading(false)
        }
    }

    return (

        <Card className="py-4 bg-orange-200 h-[100%]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold">Usuarios con mayor cantidad de ventas por mes</h4>
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
                {
                    loading && <Spinner />
                }
                {!loading && < div >
                    <h3 className='font-bold text-2xl' >
                        {nombreUsuario}
                    </h3>
                </div>}
                <FiUserCheck />
            </CardBody>

        </Card >
    )
}

export default CardVentasUsuarioPorMes