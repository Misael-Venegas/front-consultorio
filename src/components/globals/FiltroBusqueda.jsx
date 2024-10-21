import { Input } from '@nextui-org/react'
import React from 'react'
import { IoSearch } from "react-icons/io5";
const FiltroBusqueda = ({ setArray, arrayAuxiliar, textoPlaceholder, campoBusqueda }) => {

    const filtrarDatosBusqueda = (e) => {
        if (e === '') {
            setArray(arrayAuxiliar)
        } else {
            const arrayFiltro = arrayAuxiliar.filter(item => {
                return item[campoBusqueda]?.toLowerCase().includes(e.toLowerCase())
            })
            setArray(arrayFiltro)
        }

    }

    return (
        <><div className="w-full flex flex-col gap-2 max-w-[300px]">
            <Input placeholder={textoPlaceholder}
                onChange={(e) => filtrarDatosBusqueda(e.target.value)}
                endContent={
                    <IoSearch color='#559DED' />
                }
            />
        </div>
        </>
    )
}

export default FiltroBusqueda