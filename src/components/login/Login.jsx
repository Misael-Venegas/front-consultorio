import React from 'react'
import { Avatar, Input, Button } from '@nextui-org/react'

const Login = () => {
    return (
        <>
            <div className='principal-div-login' >
                <div className='div-secundario-login' >
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large mb-5" />
                    <Input label='Usuario' className='mb-5' />
                    
                    <Input label='Contraseña'
                        type={"password"}
                        className='mb-5'
                    />
                    <Button color='primary' style={{ width: '100%' }} >  Iniciar Sesión</Button>
                </div>
            </div>
        </>
    )
}

export default Login