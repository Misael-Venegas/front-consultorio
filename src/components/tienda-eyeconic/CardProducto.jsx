import React from 'react'
import { Card, CardHeader, CardBody, Image, Button, CardFooter } from '@nextui-org/react'


export const CardProducto = ({ producto }) => {
    console.log(producto)
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
            <CardFooter className="text-small justify-between">

                <span>
                    {
                        producto?.cantidad > 0 ? <span>{producto.cantidad} unidades disponibles</span> : <span style={{ color: 'red' }} >Sin existencia</span>
                    }
                </span>
                <p>

                    <b>${producto?.precio_venta} MXN.</b>
                </p>


            </CardFooter>

        </Card>
    )
}
