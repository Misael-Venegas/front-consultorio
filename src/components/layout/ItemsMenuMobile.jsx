import React from 'react'

const ItemsMenuMobile = ({ rolUsuario }) => {
    return (
        <>
         

            {(rolUsuario == 'root' || rolUsuario == 'Administrador') && <>

                <a href="/usuarios" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                    Usuarios
                </a>
                <a href="/productos" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                    Productos
                </a>
                <a href="/inicio" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                    Inicio
                </a>
            </>
            }

            {
                rolUsuario == 'Gerente' &&
                <>
                    <a href="/productos" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                        Productos
                    </a>
                    <a href="/inicio" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                        Validar productos
                    </a>
                </>
            }

            {
                rolUsuario == 'Recepcionista' &&
                <>

                    <a href="/productos" className='text-white block hover:bg-white hover:text-black rounded-lg p-2' >
                        Productos
                    </a>
                </>
            }

        </>
    )
}

export default ItemsMenuMobile