import React, { useState } from 'react'
import { Button, Divider, RadioGroup, Radio, Input } from '@nextui-org/react'
import ModalCodigoVendedor from './ModalCodigoVendedor'
import { useNotification } from '@/helpers/NotificationContext'
const InformacionVenta = ({ total, listaProductos, limpiarCampos }) => {

    const { showNotification } = useNotification()
    const [openModal, setOpenModal] = useState(false)
    const [codigoVendedor, setcodigoVendedor] = useState('')
    const [metodoPago, setmetodoPago] = useState('efectivo')
    const [codigoTicketTerminal, setCodigoTicketTerminal] = useState('')
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
                    codigoTicketTerminal,
                    pagoEfectivo: metodoPago === 'efectivo' ? true : false
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            showNotification('La venta se registró de manera correcta', 'success')
            limpiarCampos(true)
            limpiarCamposInternos()
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    const limpiarCamposInternos = () => {
        setCodigoTicketTerminal('')
        setmetodoPago('efectivo')
    }

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
                    </RadioGroup>
                </div >
                {

                    metodoPago == 'tarjeta' && <div className='pt-3'>
                        <span>Ingresa el código del ticket </span>
                        <Input onChange={(e) => setCodigoTicketTerminal(e.target.value)} />
                    </div>
                }
                <Button className='float-end mt-5' color='primary' onClick={() => setOpenModal(true)} >
                    Realizar venta
                </Button>
            </>}
            <ModalCodigoVendedor openModal={openModal} setOpenModal={setOpenModal} realizarVenta={concluirVenta} setCodigoVendedor={setcodigoVendedor} />
        </>
    )
}

export default InformacionVenta