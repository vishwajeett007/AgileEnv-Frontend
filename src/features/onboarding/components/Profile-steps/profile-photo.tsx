import React from 'react'
import Image from 'next/image'


const ProfilePhoto = () => {

    const images = [
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        '/Images/p0.svg',
        // '/Images/p1.svg',
        // '/Images/p2.svg',
        // '/Images/p3.svg',
        // '/Images/p4.svg',
        // '/Images/p5.svg',
        // '/Images/p6.svg',
        // '/Images/p7.svg',
        // '/Images/p8.svg',
        // '/Images/p9.svg',
        // '/Images/p10.svg',
    ]
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>

            <div className='max-w-4xl flex flex-col items-center gap-3'>

                <div className='flex flex-col items-center gap-3'>
                    <h1 className='text-2xl font-semibold text-gray-600'>Profile Photo</h1>
                    <p className='text-gray-600'>You can update everything later from your Profile settings</p>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <Image
                        src='/Images/p0.svg'
                        alt='logo'
                        width={40}
                        height={40}
                    />
                    <div className='flex flex-row flex-wrap max-w-2xl items-center gap-3'>
                        {(images.map((image, index) => {
                            return (
                                <Image
                                    src={image}
                                    alt='dummy'
                                    width={40}
                                    height={40}
                                    key={index}
                                />
                            )
                        }))}
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <button className='bg-blue-500 text-white px-5 py-2 rounded-md'>Skip</button>
                    <button className='bg-blue-500 text-white px-5 py-2 rounded-md'>Continue</button>
                </div>
            </div>

        </div >
    )
}

export default ProfilePhoto;