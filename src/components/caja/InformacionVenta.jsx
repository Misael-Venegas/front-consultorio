import React, { useState } from 'react'
import { Button, Divider } from '@nextui-org/react'
import ModalCodigoVendedor from './ModalCodigoVendedor'
import { useNotification } from '@/helpers/NotificationContext'
const InformacionVenta = ({ total, listaProductos, limpiarCampos }) => {

    const { showNotification } = useNotification()
    const [openModal, setOpenModal] = useState(false)
    const [codigoVendedor, setcodigoVendedor] = useState('')

    const concluirVenta = async () => {
        try {
            setOpenModal(false)
            if (codigoVendedor === '') {
                throw new Error('Error: Ingresa el tu codigo de vendedor')
            }
            if (listaProductos.length <= 0) {
                throw new Error('Agrega al menos un producto a la lista')
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
                    codigoVendedor
                })
            })
            if (!response.ok) {
                const errorData = await response.json()
                showNotification(errorData.message, 'error')
            }
            console.log(response)
            showNotification('La venta se registro de manera correcta', 'success')
            limpiarCampos(true)
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    return (
        <>

            <div className='text-3xl pt-2' >
                <b>Total: ${total}</b>
            </div>

            <Button className='float-end mt-5' color='primary' onClick={() => setOpenModal(true)} >
                Realizar venta
            </Button>

            <ModalCodigoVendedor openModal={openModal} setOpenModal={setOpenModal} realizarVenta={concluirVenta} setCodigoVendedor={setcodigoVendedor} />
        </>
    )
}

export default InformacionVenta