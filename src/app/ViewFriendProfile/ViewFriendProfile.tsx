'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LanguageProficiency from '../ViewProfile/LanguageProficiency';

interface Language {
    language: string;
    level: number;
}

interface User {
    userId: string;
    name: string;
    userDescription: string;
    nativeLanguage: string;
    fluentLanguagess: string[];
    learningLanguagess: string[];
    userInterests: string[];
    profilePic: string;
    purpose: string;
    learningLanguageRanks: Language[];
    fluentLanguageRanks: Language[];
}

interface ViewProps{
    userId: string
}

const ViewFriendProfile: React.FC<ViewProps>  = ({userId}) => {
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userId) return;
            
            try {
                console.log(`Fetching profile for userId: ${userId}`); // Log the userId being used
                const response = await fetch(`/api/userprofile/viewProfile/?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Profile data received:', data); // Log the received profile data
                setUserData(data);
                console.log(userData)
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return (
        <div className="min-h-sm flex items-center justify-center pr-36 pt-10">
            <div className="max-w-screen grid grid-cols-1 md:grid-cols-2 text-lg">
                <div className="max-w-96 bg-white rounded-xl overflow-hidden shadow-lg p-6 relative ml-64 w-full">
                    <div className="flex flex-col items-center mb-4 w-full">
                        <div className="relative border-2 border-[#9C3B5E] rounded-full w-full" style={{ width: "120px", height: "120px" }}>
                            <Image
                                className="rounded-full object-cover"
                                src={userData?.profilePic || "/assets/extras/profilepicture.png"}
                                alt="Profile Picture"
                                layout="fill"
                            />
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 mt-4 ml-4">
                        <Image
                            src="/assets/extras/dots.png"
                            alt="Decoration"
                            width={50}
                            height={48}
                        />
                    </div>
                    <div className="border-t border-gray-300 my-4 w-full"></div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-4xl mb-2 flex-grow text-center font-mt-extra">
                                {userData?.name}
                            </h2>
                        </div>
                        <div>
                            <p>Here {userData?.purpose === 'both' ? 'to teach and learn' : userData?.purpose}</p>
                        </div>
                        <h3 className="font-bold text-xl mb-2 pt-10 font-mt-extra">Description</h3>
                        <p className="text-black mb-4">{userData?.userDescription}</p>
                        <div>
                            <h3 className="font-bold text-xl mb-2 pt-10 font-mt-extra">Interests</h3>
                            {userData?.userInterests.join(", ")}
                        </div>
                    </div>
                </div>
                <div className="pr-36 w-full">
                    <div className="bg-white py-4 mr-36 pr-36 rounded-xl shadow-lg w-[700px] max-h-[600px] overflow-x-hidden overflow-y-auto hide-scrollbar">
                        <div className="p-4 rounded-lg bg-white">
                            <h3 className="text-2xl mb-2 font-inter">Native Language</h3>
                            <div className="py-4 px-4 bg-white rounded-[20px] shadow-md border-l-8 border-[#F49345] w-[650px]">
                                <div className="flex flex-col">
                                    <span className="text-lg font-inter">{userData?.nativeLanguage}</span>
                                    <div className="h-1 mt-4 bg-gradient-to-r from-[#F49345] to-transparent w-full"></div>
                                </div>
                            </div>
                        </div>
                        <LanguageProficiency
                            title="Fluent Languages"
                            languages={userData?.fluentLanguageRanks || []}
                            onLevelChange={() => {}}
                            borderColor="border-[#DB3946]"
                            lineColor="bg-gradient-to-r from-[#DB3946]"
                            color="white"
                            editable={false}
                            textSize="2xl"
                            width="650px"
                            starH="9"
                            num={4}
                            cursor=''
                        />
                        <LanguageProficiency
                            title="Learning Languages"
                            languages={userData?.learningLanguageRanks || []}
                            onLevelChange={() => {}}
                            borderColor="border-[#9C3B5E]"
                            lineColor="bg-gradient-to-r from-[#9C3B5E]"
                            color="white"
                            editable={false}
                            textSize="2xl"
                            width="650px"
                            starH="9"
                            num={4}
                            cursor=''
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewFriendProfile;
