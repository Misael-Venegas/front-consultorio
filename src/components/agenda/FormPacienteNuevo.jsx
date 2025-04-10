import { calcularEdad } from '@/helpers/globals'
import { DatePicker, Divider, Input } from '@nextui-org/react'
import React, { useState } from 'react'

const FormPacienteNuevo = ({ formData, error, handleChange }) => {
  
    const enviarFecha = (e) => {
        if (e != "") {
            const fechaPaciente = e.year + '-' + e.month + '-' + e.day
            const datoEdad = calcularEdad(fechaPaciente)
            handleChange('edadPaciente', datoEdad)
        }
        handleChange('fechaNacimientoPaciente', e)
    }

    const edadPaciente = (e) => {
        handleChange('edadPaciente', e)
    }

    return (
        <>
            <Divider />
            <p className='text-center'> <strong> Datos del paciente</strong></p>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-[50%] ml-5 mr-5' >
                    <span>Nombre</span> <span style={{ color: 'red' }} >*</span>
                    <Input
                        onChange={(e) => handleChange('nombrePaciente', e.target.value)}
                        value={formData.nombrePaciente}
                        isRequired
                        isInvalid={error.nombrePaciente ? true : false}
                        errorMessage={error.nombrePaciente && "Este campo es obligatorio"}
                    ></Input>
                </div>
                <div className='w-full md:w-[50%] ml-5 mr-5' >
                    <span>Apellido paterno</span> <span style={{ color: 'red' }} >*</span>
                    <Input
                        onChange={(e) => handleChange('aPaternoPaciente', e.target.value)}
                        value={formData.aPaternoPaciente}
                        isRequired
                        isInvalid={error.aPaternoPaciente ? true : false}
                        errorMessage={error.aPaternoPaciente && "Este campo es obligatorio"}
                    ></Input>
                </div>
            </div>

            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-[50%] ml-5 mr-5' >
                    <span>Apellido materno</span>
                    <Input
                        onChange={(e) => handleChange('aMaternoPaciente', e.target.value)}
                        value={formData.aMaternoPaciente}
                    ></Input>
                </div>
                <div className='w-full md:w-[50%] ml-5 mr-5' >
                    <span>Teléfono</span> <span style={{ color: 'red' }} >*</span>
                    <Input
                        onChange={(e) => handleChange('telefonoPaciente', e.target.value)}
                        value={formData.telefonoPaciente}
                        isRequired
                        isInvalid={error.telefonoPaciente ? true : false}
                        errorMessage={error.telefonoPaciente && "Este campo es obligatorio"}
                        maxLength={10}
                        minLength={10}
                    ></Input>
                </div>
            </div>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-[50%] ml-5 mr-5' >
                    <span>Fecha de nacimiento</span>
                    <DatePicker
                        showMonthAndYearPickers
                        onChange={(value) => enviarFecha(value)}
                        color='primary'

                    />
                </div>
                <div className='w-full md:w-[50%] ml-5 mr-5' >
                    <span>Edad</span>
                    <Input
                        value={formData.edadPaciente}
                        onChange={(e) => edadPaciente(e.target.value)}
                    />

                </div>


            </div>
            <Divider />
        </>
    )
}

export default FormPacienteNuevo