import React from 'react'
import CardsVentas from './CardsVentas'
import TablaProductosCantidadMinima from './TablaProductosCantidadMinima'

const Inicio = () => {
    return (
        <>
            <CardsVentas />
            <div className='flex flex-col  md:flex-row'  >
                <div className='w-full md:w-[60%]' >

                    <TablaProductosCantidadMinima />
                </div>
            </div>
        </>

    )
}

export default Inicio