"use client"

import { createContext, useContext, useState } from "react"

//Se crea el contexto del carrito
const CarritoContext = createContext();

//crear proveedor del contexto
export const CarritoProvider = ({ children }) => {
    //const [totalProductosCarrito, setTotalProductosCarrito] = useState(0)
    const [carrito, setCarrito] = useState([])

    //funcion para agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        console.log(producto)
        let indice = null
        carrito.find((element, i) => {

            if (producto.id == element.id) {
                indice = i
            }
        })

        if (indice != null) {
            carrito[indice].cantidadProductos = parseInt(carrito[indice].cantidadProductos + 1)
        } else {
            producto.cantidadProductos = 1
            setCarrito((prev) => [...prev, producto])
        }

    }

    const quitarProducto = (e) => {
        const arrayNuevo = carrito.filter((item) => item.id != e)
        setCarrito(arrayNuevo)
    }

    return (

        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarProducto }} >
            {children}
        </CarritoContext.Provider>
    )

}

export const useCarrito = () => {
    return useContext(CarritoContext)
}


