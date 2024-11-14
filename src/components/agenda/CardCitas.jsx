import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from '@nextui-org/react'
import React from 'react'
import { FaUserLarge } from "react-icons/fa6";

const CardCitas = ({ datosConsultas }) => {
    return (
        <>
            {
                datosConsultas.map(consulta =>
                    <Card className='mb-5' >
                        <CardHeader className="flex gap-3 ">
                            <span style={{ fontSize: '23px' }}><FaUserLarge className='mr-3' /></span>
                            <div className="flex flex-col">
                                <p className="text-md">{consulta.paciente}</p>
                                <p className="text-small text-default-500">{consulta.fecha} {consulta.hora}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{consulta.motivo_consulta}</p>
                        </CardBody>

                        <CardFooter>
                            <p>
                                Dr. {consulta.especialista}
                            </p>
                        </CardFooter>
                    </Card>
                )
            }
        </>
    )
}

export default CardCitas