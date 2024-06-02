'use client'
import Layout from '@/components/layout/Layout'
import Usuarios from '@/components/usuarios/Usuarios'
import ProtectedRoute from '@/helpers/ProtectedRoute '
import React from 'react'
const page = () => {
    return (
        <Layout>
            <ProtectedRoute>
                <Usuarios />
            </ProtectedRoute>
        </Layout>
    )
}

export default page