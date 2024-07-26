// components/UserProfile.tsx
'use client'
import React from 'react';

interface User {
  id: number;
  name: string;
  nativeLanguages: string[];
  fluentLanguages: string[];
  learningLanguages: string[];
}

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex justify-between items-center bg-white px-48 py-20 rounded-lg shadow-md w-full max-w-screen-7xl">
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <div className="rounded-full p-5">
            <img
              src="/assets/extras/profilepicture.png" // Placeholder image, replace with actual image source
              alt="Profile Picture"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold">{user.name}</h3>
          <div className="mt-1">
            <p><span className="font-semibold">Native Languages:</span> {user.nativeLanguages.join(', ')}</p>
            <p><span className="font-semibold">Fluent Languages:</span> {user.fluentLanguages.join(', ')}</p>
            <p><span className="font-semibold">Learning Languages:</span> {user.learningLanguages.join(', ')}</p>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>
        <div className="border-l-2 border-gray-300 h-24 mx-4"></div>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md">Add</button>
    </div>
  );
};

export default UserProfile;
