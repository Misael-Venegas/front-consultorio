'use client'
import Inicio from '@/components/incio/Inicio'
import Layout from '@/components/layout/Layout'
import ProtectedRoute from '@/helpers/ProtectedRoute '
import React from 'react'
import { AuthProvider } from '@/helpers/AuthContext'

const page = () => {
    return (
        
            <Layout>
                <ProtectedRoute>
                    <Inicio />
                </ProtectedRoute>
            </Layout>
       
    )

}

export default page