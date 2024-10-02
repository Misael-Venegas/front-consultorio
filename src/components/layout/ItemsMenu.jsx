import React from 'react'

const ItemsMenu = ({ rolUsuario }) => {
    console.log(rolUsuario)
    return (
        <>

            {(rolUsuario === 'root' || rolUsuario === 'Administrador') && <>
                <a href="/usuarios" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                    Usuarios
                </a>

                <a href="/productos" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                    Productos
                </a>
                <a href="/inicio" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                    Inicio
                </a>
            </>
            }

            {
                rolUsuario === 'Gerente' &&
                <>
                    <a href="/productos" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                        Validar productos
                    </a>

                    <a href="/inicio" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                        Inicio
                    </a>
                </>
            }

            {
                rolUsuario === 'Recepcionista' &&
                <>
                    <a href="/productos" className='text-white hover:bg-white hover:text-[#1D94CC] rounded-lg p-2' >
                        Productos
                    </a>
                </>
            }


        </>
    )
}

export default ItemsMenu