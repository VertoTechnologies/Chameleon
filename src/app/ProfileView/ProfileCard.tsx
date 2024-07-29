"use client"

import React from 'react';
import Image from 'next/image';

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
        <div className="max-w-xs bg-white rounded-xl overflow-hidden shadow-lg p-6 relative ml-64">
      <div className="flex flex-col items-center mb-4">
        <div className="relative" style={{ width: '120px', height: '120px' }}>
          <Image
            className="rounded-full object-cover"
            src="/assets/extras/profilepicture.png"
            alt="Profile Picture"
            layout="fill"
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <Image
          src="/assets/extras/dots.png" // Make sure this path is correct
          alt="Decoration"
          width={50}
          height={48}
          
        />
      </div>
            <div className="border-t border-gray-300 my-4 w-full"></div>
            <div className="">
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold  mb-2 flex-grow text-center font-mt-extra">{profile?.name}</h2>
                    <i className="bi bi-pencil-fill cursor-pointer" onClick={editFile}></i>
                </div>
                <h3 className="font-bold text-xl mb-2 pt-14  font-mt-extra">Description</h3>
                <p className="text-black mb-4">
                    {profile?.userDescription}
                </p>
                <div>
                    <h3 className="font-bold text-xl mb-2 pt-14  font-mt-extra">Interests</h3>
                    {profile?.userInterests.join(', ')}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;



