import React from 'react'
import CardVentasPorDia from './CardVentasPorDia';
import CardVentasPormes from './CardVentasPormes';
import CardVentasUsuarioPorDia from './CardVentasUsuarioPorDia';
import CardVentasUsuarioPorMes from './CardVentasUsuarioPorMes';
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
                <CardVentasUsuarioPorMes />
            </div>

        </div>
    )
}

export default CardsVentas