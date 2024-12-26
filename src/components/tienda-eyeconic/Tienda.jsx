import React from 'react'
import { Image } from '@nextui-org/react'
const Tienda = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row pt-5' >
                <div className='w-full md:w-[20%]' >
                    <h1>Filtros</h1>
                </div>
                <div className='flex' >
                    <Image
                        alt="NextUI hero Image with delay"
                        fallbackSrc="https://via.placeholder.com/300x200"
                        height={200}
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={300}
                    />
                    <Image
                        alt="NextUI hero Image with delay"
                        fallbackSrc="https://via.placeholder.com/300x200"
                        height={220}
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={300}
                    />
                    <Image
                        alt="NextUI hero Image with delay"
                        fallbackSrc="https://via.placeholder.com/300x200"
                        height={200}
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={300}
                    />
                </div>
            </div>
        </>
    )
}

export default Tienda