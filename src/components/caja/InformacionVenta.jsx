
import React, { useEffect, useState } from 'react'
import { Button, Divider, RadioGroup, Radio, Input, Checkbox } from '@nextui-org/react'
import ModalCodigoVendedor from './ModalCodigoVendedor'
import { useNotification } from '@/helpers/NotificationContext'
import { imprimirTicket } from '@/helpers/imprimirTicketDeVenta'

const InformacionVenta = ({ total, listaProductos, limpiarCampos }) => {

    const { showNotification } = useNotification()
    const [openModal, setOpenModal] = useState(false)
    const [codigoVendedor, setcodigoVendedor] = useState('')
    const [metodoPago, setmetodoPago] = useState('efectivo')
    const [codigoTicketTerminal, setCodigoTicketTerminal] = useState('')
    const [telfonoCliente, settelfonoCliente] = useState('')

    const [imprimirTicketVenta, setImprimirTicketVenta] = useState(true)
    useEffect(() => {
        const loadQZTrayScript = () => {
            const script = document.createElement('script');
            script.src = '/js/qz-tray.js';
            script.async = true;
            document.body.appendChild(script)
        }

        if (typeof window !== undefined) {
            loadQZTrayScript()
        }

        return () => {
            if (window.qz) {
                window.qz.disconnect()
            }
        }
    }, [])


    const concluirVenta = async () => {
        try {
            setOpenModal(false)
            if (codigoVendedor === '') {
                throw new Error('Error:Ingresa él tu código de vendedor')
            }
            if (listaProductos.length <= 0) {
                throw new Error('Agrega al menos un producto a la lista')
            }

            if (metodoPago == 'tarjeta' && codigoTicketTerminal == '') {
                throw new Error('Error: Debes ingresar el código del ticket')
            }

            const url = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${url}users/realizar-venta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listaProductos,
                    totalVenta: total,
                    codigoVendedor,
                    codigoTicketTerminal: metodoPago == 'tarjeta' ? codigoTicketTerminal : null,
                    metodoPago,
                    telefonoCliente: metodoPago == 'transferencia' ? telfonoCliente : null
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            showNotification('La venta se registró de manera correcta', 'success')
            if (imprimirTicketVenta) {
                await imprimirTicket(total, listaProductos, metodoPago)
            }
            limpiarCampos(true)
            limpiarCamposInternos()
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    const limpiarCamposInternos = () => {
        setCodigoTicketTerminal('')
        setmetodoPago('efectivo')
        setImprimirTicketVenta(true)
    }



    console.log(imprimirTicketVenta)

    return (
        <>
            <div className='text-3xl pt-2' >
                <b>Total: ${total}</b>
            </div>
            {listaProductos.length > 0 && <>
                < div className='pt-5' >
                    <RadioGroup
                        label='Selecciona el método de pago'
                        defaultValue={metodoPago}
                        value={metodoPago}
                        onChange={(e) => setmetodoPago(e.target.value)}
                    >
                        <Radio value='efectivo' >
                            Efectivo
                        </Radio>
                        <Radio value='tarjeta' >
                            Tarjeta
                        </Radio>
                        <Radio value='transferencia' >
                            Transferencia
                        </Radio>
                    </RadioGroup>
                </div >
                {

                    metodoPago == 'tarjeta' && <div className='pt-3'>
                        <span>Ingresa el código del ticket </span>
                        <Input onChange={(e) => setCodigoTicketTerminal(e.target.value)} />
                    </div>
                }
                {

                    metodoPago == 'transferencia' && <div className='pt-3'>
                        <span>Ingrese el número de teléfono del cliente </span>
                        <Input onChange={(e) => settelfonoCliente(e.target.value)} />
                    </div>
                }
                <Divider className='mt-3' />

                <Checkbox className='mt-3' isSelected={imprimirTicketVenta} onValueChange={setImprimirTicketVenta} >¿Imprimir ticket?</Checkbox>
                <Button className='float-end mt-5' color='primary' onClick={() => setOpenModal(true)} >
                    Realizar venta
                </Button>
            </>}
            <ModalCodigoVendedor openModal={openModal} setOpenModal={setOpenModal} realizarVenta={concluirVenta} setCodigoVendedor={setcodigoVendedor} />
        </>
    )
}

export default InformacionVenta