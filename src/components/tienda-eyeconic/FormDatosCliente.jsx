import React from 'react'

const FormDatosCliente = () => {
    return (
        <>
            <span>Datos del destino del envío</span>

            <div className='flex flex-col md:flex-row gap-4 ' >
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="aPaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido paterno <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="aPaterno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 ' >
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="aMaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido materno</label>
                    <input type="text" id="aMaterno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="correo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 ' >
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="telefono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="calle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calle <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="calle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 ' >
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="noExterior" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. Exterior <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="noExterior" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="noInterior" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. Interior</label>
                    <input type="text" id="noInterior" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
            <div className="flex-grow flex-basis-2  mb-5">
                <label htmlFor="referencia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Referencias </label>
                <textarea id="referencia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='flex flex-col md:flex-row gap-4 ' >
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="cp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código postal <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="cp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="municipio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Municipio <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="municipio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 ' >
                <div className="flex-grow flex-basis-2  mb-5">
                    <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="estado" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>

        </>
    )
}

export default FormDatosCliente