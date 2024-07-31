"use client";

import { useEffect, useState } from 'react';

interface UserProfile {
    userId: string;
    name: string;
    userDescription: string;
    nativeLanguage: string,
    fluentLanguagess: string[],
    learningLanguagess: string[],
    userInterests: string[],
    isOnline: boolean,
}

const useUserProfile = (userId: string | null) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

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
                setProfile(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return { profile };
};

export default useUserProfile;
