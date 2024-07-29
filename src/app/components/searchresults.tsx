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
    <div className="flex items-center bg-white px-6 py-8 rounded-xl shadow-lg w-[850px] space-x-8">
      <div className="flex-shrink-0">
        <img
          src="/assets/extras/profilepicture.png" // Placeholder image, replace with actual image source
          alt="Profile Picture"
          className="h-44 w-44 rounded-full object-cover" // Adjust size
        />
      </div>
      <div className="h-[100%] w-0.5 bg-gray-300 mx-6"></div> {/* Grey vertical line */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold font-mt-extra">{user.name}</h2>
          <button className="bg-[#65AD87] text-white px-6 py-1 rounded-full">Add</button> {/* Adjusted button */}
        </div>
        <hr className="border-t border-gray-300 my-3" />
        <div className="mb-3">
          <p><span className="font-semibold font-mt-extra mr-6">Native Languages</span> {user.nativeLanguages.join(', ')}</p>
          <hr className="border-t  border-gray-300 my-3" />
          <p><span className="font-semibold font-mt-extra mr-6">Fluent Languages</span> {user.fluentLanguages.join(' , ')}</p>
          <hr className="border-t  border-gray-300 my-3" />
          <p><span className="font-semibold font-mt-extra mr-6">Learning Languages</span> {user.learningLanguages.join(', ')}</p>
        </div>
        <hr className="border-t  border-gray-300 my-3" /> 
      </div>
    </div>
  );
};

export default UserProfile;
