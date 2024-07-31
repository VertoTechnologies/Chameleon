// components/SearchResultsContainer.tsx

'use client'
import React from 'react';
import UserProfile from '@/app/Explore/ExploreComponents/searchresults';

interface User {
  userId: string;
  name: string;
  nativeLanguage: string,
  fluentLanguagess: string[],
  learningLanguagess: string[],
  profilePic: string;
}
interface UserProfileProps {
  user: User[]; 
}



const ITEMS_PER_PAGE = 6; // Number of items to show per page

const RecommendationResultsContainer: React.FC<UserProfileProps> = ({ user }) => {
  

  return (
    <div className="max-w-full px-4 py-6">
      <div className="grid gap-4">
        {user.map((item) => (
          <UserProfile key={item.userId} user={item} />
        ))}
      </div>
    
    </div>
  );
};

export default RecommendationResultsContainer;
