"use client"

import { createContext, useContext, useState } from "react"

//Se crea el contexto del carrito
const CarritoContext = createContext();

//crear proveedor del contexto
export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([])

    //funcion para agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => [...prev, producto])
    }
    console.log(carrito)
    return (

        <CarritoContext.Provider value={{ carrito, agregarAlCarrito }} >
            {children}
        </CarritoContext.Provider>
    )

}

export const useCarrito = () => {
    return useContext(CarritoContext)
}


