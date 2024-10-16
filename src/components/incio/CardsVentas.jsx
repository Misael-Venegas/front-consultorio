import React from 'react'
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { FiUserCheck } from "react-icons/fi";
import CardVentasPorDia from './CardVentasPorDia';
import CardVentasPormes from './CardVentasPormes';
import CardVentasUsuarioPorDia from './CardVentasUsuarioPorDia';
function CardsVentas() {
    return (
        <div className='flex flex-col md:flex-row' >
            <div className='w-full md:w-[25%] mr-10 ml-10' >
                <CardVentasPorDia />
            </div>

            <div className='w-full md:w-[25%] mr-10 ml-10' >
                <CardVentasPormes />
            </div>

            <div className='w-full md:w-[25%] mr-8 ml-8 ' >
                <CardVentasUsuarioPorDia />
            </div>



            <div className='w-full md:w-[25%] mr-10 ml-10' >
                <Card className="py-4 bg-orange-200">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold">Usuarios con mayor cantidad de ventas por mes</h4>
                        <small className="text-default-500"> Noviembre </small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <div  >
                            <h3 className='font-bold text-2xl' >
                                Misael N.
                            </h3>
                        </div>
                        <FiUserCheck />
                    </CardBody>

                </Card>
            </div>

        </div>
    )
}

export default CardsVentas