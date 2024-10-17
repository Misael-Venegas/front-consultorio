import { Card, CardBody, CardHeader, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react'
import { meses, listaAnhos } from '../../helpers/globals'
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const CardVentasPormes = () => {
    const [mes, setmes] = useState(parseInt(new Date().getMonth()))
    const [anhio, setanhio] = useState(listaAnhos.anhioActual)

    console.log('El mes es', mes, anhio)
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
                        value={mes}
                        onChange={(e) => setmes(e.target.value)}

                    >
                        {
                            meses.map((item) => (
                                <SelectItem key={item.key} value={item.key} >
                                    {item.mes}
                                </SelectItem>
                            ))
                        }
                    </Select>

                    <Select
                        label='Año'
                        size='sm'
                        variant='underlined'
                        defaultSelectedKeys={[anhio]}
                        value={anhio}
                        onChange={(e) => setanhio(e)}
                    >
                        {
                            listaAnhos.arrayAnnhios.map((item, key) => (
                                <SelectItem key={key} value={item.toString()} >
                                    {item.toString()}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>

            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div  >
                    <h3 className='font-bold text-4xl' >
                        $5400
                    </h3>
                    <FaMoneyBillTrendUp />

                </div>

            </CardBody>

        </Card>
    )
}

export default CardVentasPormes