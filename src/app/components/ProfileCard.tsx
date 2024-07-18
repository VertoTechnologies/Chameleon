import React from 'react';
import Image from 'next/image';
import Interests from '../components/Interests';
import useUserProfile from '../components/useUserProfile';

const ProfileCard: React.FC = () => {
    //const id = 
    // localStorage.getItem("userId")
    const { profile } = useUserProfile('lyqrdtgb2wx20smx');
    console.log(profile)
    return (
        <div className=" max-w-sm bg-white rounded-lg overflow-hidden shadow-lg p-6">
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
            <div className="text-center">
                <h2 className="font-bold text-xl mb-2">{profile?.name || "Zara Ahmed"}</h2>
                <p className="text-gray-700 mb-4">
                    {profile?.description || "I am a 6th semester student and I just finished a German language course in my university. My professor told me that there is free education in Germany so I want to go there and do my Masters."}
                </p>
                <div>
                    <Interests interests={[{ interest: 'football'}]} />
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
