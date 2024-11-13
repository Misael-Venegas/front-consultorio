import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from '@nextui-org/react'
import React from 'react'

const CardCitas = ({ datosConsultas }) => {
    return (
        <>
            {
                datosConsultas.map(consulta =>
                    <Card className='mb-5' >
                        <CardHeader className="flex gap-3 ">
                            <Image
                                alt={"nextui logo"}
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">{consulta.paciente}</p>
                                <p className="text-small text-default-500">{consulta.fecha}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{consulta.motivo_consulta}</p>
                        </CardBody>

                        <CardFooter>
                           <p>
                            Dr. Misaeel Nava Venegas
                           </p>
                        </CardFooter>
                    </Card>
                )
            }
        </>
    )
}

export default CardCitas