'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LanguageProficiency from '../ViewProfile/LanguageProficiency';
import { useProfile } from '../stores/UserStore';
import styles from './SuggestionBox.module.css';
import axios from 'axios';
import { addFriend } from '../components/friendsComponents/FriendApiCalls';

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

// const useUserLanguages = (initialLanguage: Language[]) => {
//     const [lang, set] = useState(initialLanguage);
//     const handleLanguageChange = () => {
//             // handle language change logic
//     }
//     return [lang, handleLanguageChange];
// }

const SuggestionBox: React.FC = () => {
    const profile = useProfile();
    const [usersData, setUsersData] = useState<User[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

    const sendEmailNotification = async (toEmail: string, fromUserName: string) => {
        const emailText = `Ready to Connect with People?<br>${fromUserName} wants to be your New Language Buddy! Add them back and learn together.`;

        try {
            await axios.post('/api/notifications/sendfriendrequestemail', {
                toEmail,
                fromUserName,
                emailText
            });
        } catch (error) {
            console.error('Error sending email notification:', error);
            // Optionally set an alert message for email error
        }
    }

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch(`/api/users/suggestedUsers?userId=${profile.userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsersData(data.users);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        
        };

        fetchUsersData();
        
        // const getUsersRank = async () => {
        //     try {
        //         const response = await fetch(`/api/userprofile/getRank?userId=${profile.userId}`)
        //     }
        // }
    }, [profile.fluentLanguagess]);

    // Function for handling swipe to the right
const handleSwipeRight = () => {
    // Update the swipe direction and current index immediately
    setSwipeDirection('right');
    setTimeout(() => {
        setCurrentIndex((prevIndex) => {
            const totalUsers = usersData.length;
            return (prevIndex + 1) % totalUsers;
        });
        setSwipeDirection(null);
    }, 500); // Duration of the swipe animation
};

// Function for handling swipe to the left
const handleSwipeLeft = async () => {
    // Update the swipe direction and current index immediately
    setSwipeDirection('left');
    setTimeout(() => {
        setCurrentIndex((prevIndex) => {
            const totalUsers = usersData.length;
            return prevIndex === 0 ? totalUsers - 1 : prevIndex - 1;
        });
        setSwipeDirection(null);
    }, 500); // Duration of the swipe animation

    // Perform the friend request and email notification in the background
    try {
        const response = await addFriend(profile.userId, currentUser.userId);
        console.log('Friend request sent:', response);
        alert("Request Sent");

        const recipientEmail = response.recipientEmail;
        const senderName = profile.name; // Adjust according to your profile data

        // Send email notification
        await sendEmailNotification(recipientEmail, senderName);
        console.log("Recipient's email:", recipientEmail);
    } catch (error) {
        console.error('Error sending friend request:', error);
        alert("Request Failed");
    }
};



    const currentUser = usersData[currentIndex];


    return (
        <div className='px-16 py-4 h-[570px] font-inter'>
            {usersData.length > 0 ? (
                <div
                    className={`relative bg-[#7EBA9A] h-[570px] rounded-[50px] flex ${swipeDirection ? styles[`swipe${capitalize(swipeDirection)}`] : ''}`}
                >
                    <div
                        className='relative h-full w-[45%] flex flex-col justify-between rounded-l-[50px] p-8'
                        style={{
                            backgroundImage: "url('/assets/extras/suggestionBg3.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        {/* Left Side */}
                        <div className='relative flex flex-col items-center w-[70%]'>
                            <div className='relative rounded-full items-center' style={{ width: '150px', height: '150px' }}>
                                <Image
                                    className='rounded-full object-cover'
                                    src={currentUser.profilePic}
                                    alt='Profile Picture'
                                    layout='fill'
                                />
                            </div>
                            <div className=' w-full text-center'>
                                <h2 className='text-3xl mb-2 font-inter pt-4'>{currentUser.name}</h2>
                                <div className="border-2 border-[#FDD0AC] mt-4 mb-1 w-full"></div>
                                <p className='font-inter'>Here to learn</p>
                            </div>
                            <div className='w-full text-left'>
                                <h3 className='font-semibold text-2xl mb-2 pt-5 font-inter'>Description</h3>
                                <p className='text-black mb-4 text-l font-inter'>
                                    {currentUser.userDescription}
                                </p>
                                <div>
                                    <h3 className='font-semibold text-2xl mb-2 pt-8 font-inter'>Interests</h3>
                                    <p className='text-l font-inter'>{currentUser.userInterests.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className='flex flex-col p-8 overflow-x-hidden overflow-y-auto hide-scrollbar'>
                        <div className='flex flex-col justify-center items-start space-t-8'>
                            {/* Native Language */}
                            <div className="p-3 rounded-lg">
                                <h3 className="text-xl mb-2 font-inter font-medium ">Native Language</h3>
                                <div className="py-3 px-3 bg-white rounded-[20px] shadow-md border-l-8 border-[#F49345] w-[500px]">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-medium font-inter">{currentUser.nativeLanguage}</span>
                                        <div className="h-1 mt-4 bg-gradient-to-r from-[#F49345] to-transparent w-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Fluent Languages */}
                            {currentUser.learningLanguageRanks.length > 0 ? (       
                            <LanguageProficiency
                                title="Fluent Languages"
                                languages={currentUser.fluentLanguageRanks}
                                onLevelChange={() =>{}
                                }
                                borderColor="border-[#DB3946]"
                                lineColor="bg-gradient-to-r from-[#DB3946]"
                                color='none'
                                editable={false}
                                textSize='xl'
                                width='500px'
                                starH='8'
                                num={0}
                            />) : (
                                <p className="text-xl font-medium text-gray-500">Sad, no learning languages</p>
                            )}

                            {/* Learning Languages */}
                            {currentUser.learningLanguageRanks.length > 0 ? (
                                <LanguageProficiency
                                    title="Learning Languages"
                                    languages={currentUser.learningLanguageRanks}
                                    onLevelChange={() => {}
                                    }
                                    borderColor="border-[#9C3B5E]"
                                    lineColor="bg-gradient-to-r from-[#9C3B5E]"
                                    color='none'
                                    editable={false}
                                    textSize='xl'
                                    width='500px'
                                    starH='8'
                                    num={0}
                                />
                            ) : (
                                <p className="text-xl font-medium text-gray-500">Sad, no learning languages</p>
                            )}
                            
                        </div>
                    </div>
                    <div className='flex absolute justify-center bottom-[-50px] left-1/2 transform -translate-x-[50%] space-x-14 mt-4'>
                        <button
                            className=' bg-white text-3xl shadow-lg rounded-full w-20 h-20'
                            onClick={() => handleSwipeRight()}
                        >
                            ✗
                        </button>
                        <button
                            className='bg-white text-[#A3CEB7] text-3xl shadow-lg rounded-full w-20 h-20'
                            onClick={() => handleSwipeLeft()}
                        >
                            ✓
                        </button>
                    </div>
                </div>
            ) : (
                <div className='p-3 border-2 border-white'>
                    No users found
                </div>
            )}
        </div>
    );
};

export default SuggestionBox;

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
