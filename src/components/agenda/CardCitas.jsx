import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link, MenuItem } from '@nextui-org/react'
import React from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import MenuOpciones from './MenuOpciones';

const CardCitas = ({ datosConsultas, setActualizarCita, especialistas }) => {
    return (
        <>
            {
                datosConsultas.map(consulta =>
                    <Card className='mb-5' >
                        <CardBody>
                            <div className='flex flex-col md:flex-row' >
                                <div className='w-full md:w-[10%] mr-5 ml-5' >
                                    <div className='text-lg ' >
                                        <FaRegClock />
                                        {consulta.fecha} <br />
                                        {consulta.hora}
                                    </div>
                                </div>

                                <div className='w-full md:w-[80%] mr-5 ml-5 text-start ' >
                                    <Chip color={consulta?.estado == 1 ? 'secondary' : 'success'} variant='flat' className='float-end' > {consulta?.estado == 1 ? 'Pendiente' : 'Concluida'} </Chip>
                                    <p className='text-lg text-[#2A84E9]' >
                                        <div className='flex'>
                                            <span className='pt-2 mr-2 text-sm' ><FaUserLarge /></span>   {consulta.paciente}
                                        </div>
                                    </p>
                                    <p className='text-slate-500 pt-2' >
                                        <b>Motivo:</b>   {consulta.motivo_consulta}
                                    </p>
                                    <p className='pt-2' >
                                        <Chip color='success' variant='flat' >Dr(a). {consulta.especialista} </Chip>
                                    </p>

                                </div>
                                <div className='w-full md:w-[10%]' >
                                    {
                                        consulta?.estado == 1 ? <MenuOpciones cita={consulta} setActualizarTabla={setActualizarCita} especialistas={especialistas} /> : ""
                                    }

                                </div>
                            </div>
                        </CardBody>
                    </Card>
                )
            }
        </>
    )
}

export default CardCitas