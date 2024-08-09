'use client'
import React, { useEffect, useState } from 'react';
import UserProfile from '@/app/Explore/ExploreComponents/searchbox';
import { useProfile } from '@/app/stores/UserStore';

interface User {
  userId: string;
  name: string;
  nativeLanguage: string;
  fluentLanguagess: string[];
  learningLanguagess: string[];
  profilePic: string;
  userInterests: string[];
  purpose: string;
}


const RecommendationResultsContainer: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const profile = useProfile();

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
}, [profile.fluentLanguagess]);

  return (
    <div className="max-w-full px-4 py-6">
      <div className="grid gap-4">
        {usersData.map((item) => (
          <UserProfile key={item.userId} user={item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationResultsContainer;