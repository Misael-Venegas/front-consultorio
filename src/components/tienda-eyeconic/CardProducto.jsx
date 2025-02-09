import React from 'react'
import { Card, CardHeader, CardBody, Image, Button, CardFooter } from '@nextui-org/react'
import { BsCartPlusFill } from "react-icons/bs";
import { useCarrito } from '@/helpers/CarritoContext';

export const CardProducto = ({ producto }) => {
    //console.log(producto)
    const { agregarAlCarrito } = useCarrito()


    return (
        <Card isPressable shadow="sm" className='mr-4 seccionar-item transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg' >
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start' >
                <h4 className="font-bold text-large">{producto?.nombre_producto}</h4>

            </CardHeader>
            <CardBody className='overflow-visible py-2' >
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={`http://localhost:3001/imagenesProductos/${producto.url.split('\\').pop().split('/').pop()}`}
                    width={300}
                    height={200}

                />


            </CardBody>
            <CardFooter className="flex flex-col items-center gap-2 p-4">
                {/* Contenedor para precio y cantidad */}
                <div className="flex justify-between w-full">
                    <span>
                        {producto?.cantidad > 0 ? (
                            <span>{producto.cantidad} unidades disponibles</span>
                        ) : (
                            <span style={{ color: 'red' }}>Sin existencia</span>
                        )}
                    </span>

                    <p><b>${producto?.precio_venta} MXN</b></p>
                </div>

                {/* Botón grande y centrado */}
                <Button className="w-full py-4 text-lg font-semibold mt-2" color="warning" onClick={() => agregarAlCarrito(producto)} >
                    Agregar al carrito <BsCartPlusFill />
                </Button>
            </CardFooter>

        </Card>
    )
}
