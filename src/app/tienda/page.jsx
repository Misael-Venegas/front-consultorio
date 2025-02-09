'use client'
import Layout from '@/components/layout/Layout'
import Tienda from '@/components/tienda-eyeconic/Tienda'
import { CarritoProvider } from '@/helpers/CarritoContext'
import React from 'react'

const page = () => {
    return (
        <CarritoProvider>
            <Layout>
                <Tienda />
            </Layout>
        </CarritoProvider>
    )
}

export default page