"use client"

import React from 'react';
import Image from 'next/image';
import Interests from './Interests';
import useUserProfile from '../components/useUserProfile';
import { useUserStore } from '../components/store';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/navigation';
import { useProfile } from '../components/slaystore';

const ProfileCard: React.FC = () => {
    const router = useRouter();
    const editFile = () => {
        router.push('/ProfileCreate?userId=' + window?.localStorage?.getItem("userId"));
    };

    // const { profile } = useUserProfile(window?.localStorage?.getItem("userId") || null);

    const profile = useProfile()

    return (
        <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg p-6">
            <div className="flex flex-col items-center mb-4">
                <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                    <Image
                        className="rounded-full object-cover"
                        src="/assets/extras/logo.png"
                        alt="Profile Picture"
                        layout="fill"
                        style={{ borderRadius: '50%' }}
                    />
                </div>
            </div>
            <div className="border-t border-gray-300 my-4 w-full"></div>
            <div className="">
                <div className='flex justify-between items-center'>
                    <h2 className="text-3xl mb-2 flex-grow text-center">{profile?.name}</h2>
                    <i className="bi bi-pencil-fill cursor-pointer" onClick={editFile}></i>
                </div>
                <h3 className="font-bold text-2xl mb-2 pt-14">Description</h3>
                <p className="text-gray-700 mb-4">
                    {profile?.userDescription}
                </p>
                <div>
                    <h3 className="font-bold text-2xl mb-2 pt-14">Interests</h3>
                    {profile?.userInterests}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;



