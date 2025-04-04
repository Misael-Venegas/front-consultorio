import { Button } from '@nextui-org/react'
import React from 'react'
import { IoCheckmarkCircle } from "react-icons/io5"

const SuccesPage = () => {
    return (
        <div className='succesPageStyles pt-20'>
            <div className='text-center' >
                <span className='text-4xl'>Gracias por tu compra </span><br />
                <span>Hemos recibido tu orden, te enviaremos la información de tu pedido vía correo electrónico</span>
                <br /><br />
                <div className='succesPageStyles' >
                    <span className='text-6xl' style={{ color: '#2DBA8B' }}  >
                        <IoCheckmarkCircle />
                    </span>

                </div>
                <br />
                <a href="http://localhost:3000/tienda" style={{ color: '#087EA4' }}  >Continuar</a>
            </div>
        </div>
    )
}

export default SuccesPage