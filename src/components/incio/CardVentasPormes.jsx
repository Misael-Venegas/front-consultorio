import { Card, CardBody, CardHeader, DatePicker } from '@nextui-org/react';
import React from 'react'

import { FaMoneyBillTrendUp } from "react-icons/fa6";

const CardVentasPormes = () => {
    return (
        <Card className="py-4 ">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Ventas por mes</h4>
                <DatePicker
                    variant='underlined'
                    size='sm' 
                    showMonthAndYearPickers={true}
                    />
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