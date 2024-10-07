import React from 'react'
import CardsVentas from './CardsVentas'
import TablaProductosCantidadMinima from './TablaProductosCantidadMinima'
import TablaCumpleanhos from './TablaCumpleanhos'

const Inicio = () => {
    return (
        <>
            <CardsVentas />
            <div className='flex flex-col  md:flex-row'  >
                <div className='w-full md:w-[60%]' >

                    <TablaProductosCantidadMinima />
                </div>
                <div className='w-full md:w-[40%]' >
                    <TablaCumpleanhos />
                </div>
            </div>
        </>

    )
}

export default Inicio