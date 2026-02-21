import Image from 'next/image'
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setProfileImage } from '@/lib/features/onboarding/onboarding-Slice';
import {  ProfilePhotoSchema } from '../../schemas';
import { toast } from 'sonner';

const ProfilePhoto = (props:{ step: number; handleNext: () => void; }) => {

    const { handleNext } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const profileImage = useAppSelector((state) => state.onboarding.profileImage);

    const handleSkip = () => {
        dispatch(setProfileImage(null));
        handleNext();
    }

    const handleContinue = () => {
        const imageValidation = ProfilePhotoSchema.safeParse({ image: profileImage });
        if (!imageValidation.success) {
            toast.error(imageValidation.error.issues[0].message);
            return;
        }
        handleNext();
    }

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
        '/Images/Plus.svg',
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

    const handlePhotoAdd = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        dispatch(setProfileImage(file));
    }

    return (

        <div className='max-w-4xl xl:max-w-6xl flex flex-col items-center gap-6 p-8 lg:p-12'>

            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-4xl xl:text-5xl font-medium text-gray-900 text-center'>Profile Photo</h1>
                <p className='text-gray-800 text-center text-base xl:text-lg'>You can update everything later from your Profile settings</p>
            </div>

            <div className='flex flex-col items-center gap-4'>
                <Image
                    src={profileImage ? URL.createObjectURL(profileImage) : "/Images/p0.svg"}
                    alt='logo'
                    width={230}
                    height={230}
                />

                <div className='grid grid-rows-2 grid-flow-col gap-4'>
                    {(images.map((image, index) => {
                        if(index === images.length - 1){
                            return (
                                <div key={index} className='rounded-full cursor-pointer w-16 h-16 xl:w-23 xl:h-23 flex items-center justify-center'>
                                    <Image
                                        src={image}
                                        alt='add'
                                        width={70}
                                        height={70}
                                        onClick={handlePhotoAdd}
                                    />
                                </div>
                            )
                        }
                        return (
                            <Image
                                src={image}
                                alt='dummy'
                                width={70}
                                height={70}
                                key={index}
                                className='rounded-full cursor-pointer w-16 h-16 xl:w-23 xl:h-23'
                            />
                        )
                    }))}
                </div>
            </div>
            <div className='flex items-center gap-3 w-full'>
                <button className='bg-transparent text-blue-600 px-5 py-2 rounded-md w-full border border-blue-600' onClick={handleSkip} >Skip</button>
                <button className='bg-blue-600 text-white px-5 py-2 rounded-md w-full' onClick={handleContinue} >Continue</button>
            </div>
            <input aria-label="Profile photo input" id='file-input' type='file' accept='image/*' ref={fileInputRef} className='hidden' onChange={handleFileChange} />
        </div>
    )
}

export default ProfilePhoto;