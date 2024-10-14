import { Card, CardBody, CardHeader, DatePicker } from '@nextui-org/react'
import React, { useState } from 'react'
import { PiMoneyThin } from "react-icons/pi";
const CardVentasPorDia = () => {

    const [fechaVenta, setfechaVenta] = useState(new Date())
    console.log(fechaVenta)
    
    return (
        <Card className="py-4 bg-blue-200 ">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Ventas por día</h4>
                <small className="text-default-500">
                    <DatePicker size='sm'
                        color='primary'
                      
                    />
                </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div  >
                    <h3 className='font-bold text-4xl' >
                        $5400
                    </h3>

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