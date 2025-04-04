import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

const ErrorPage = () => {
    return (
        <div className='succesPageStyles pt-20'>
            <div className='text-center' >
                <span className='text-4xl'>Oops! </span><br />
                <span>Ocurrió un error inesperado, estamos trabajando para resolverlo.</span>
                <br /><br />
                <div className='succesPageStyles' >
                    <span className='text-6xl' style={{ color: '#C54343' }}  >
                        <IoMdCloseCircle />
                    </span>

                </div>
                <br />
                <a href="http://localhost:3000/tienda" style={{ color: '#C54343' }}  >Continuar</a>
            </div>
        </div>
    )
}

export default ErrorPage