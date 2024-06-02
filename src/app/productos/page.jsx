'use client'
import Layout from '@/components/layout/Layout'
import Productos from '@/components/productos/Productos'
import ProtectedRoute from '@/helpers/ProtectedRoute '
import React from 'react'

const page = () => {
    return (
        <Layout>
            <ProtectedRoute>
                <Productos />
            </ProtectedRoute>
        </Layout>
    )
}

export default page