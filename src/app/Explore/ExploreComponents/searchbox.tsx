'use client'
import React from 'react';
import FriendButton from '@/app/components/friendsComponents/friendbutton';

interface User {
  userId: string;
  name: string;
  nativeLanguage: string;
  fluentLanguagess: string[];
  learningLanguagess: string[];
  profilePic: string;
  userInterests: string[];
  purpose:string

}

const interestIcons: { [key: string]: string } = {
  sports: '⚽️',
  music: '🎵',
  films: '🎬',
  literature: '📚',
  food: '🍔',
  travel: '✈️',
  games: '🎮',
  fashion: '👗',
  art: '🎨',
  technology: '💻',
  politics: '🏛️',
  science: '🔬',
  history: '📜',
  nature: '🌿',
  health: '🏥',
  fitness: '🏋️‍♂️',
  education: '🎓',
  business: '💼',
  finance: '💰',
  religion: '⛪️',
  philosophy: '💭',
  psychology: '🧠',
  sociology: '👥',
  languages: '🗣️',
  other: '⭐️'
};

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex items-center bg-white px-6 py-8 rounded-xl shadow-lg w-[850px] space-x-8">
      <div className="flex-shrink-0">
        <img
          src={user.profilePic || "/assets/extras/profilepicture.png"} // Placeholder image
          alt="Profile Picture"
          className="h-44 w-44 rounded-full object-cover" // Adjust size
        />
      </div>
      <div className="h-full w-0.5 bg-gray-300 mx-6"></div> {/* Grey vertical line */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold font-mt-extra">{user.name}</h2>
          <div className="bg-[#65AD87] text-white pl-3 rounded-full">
            <FriendButton id={user.userId} />
          </div> {/* Adjusted button */}
        </div>
        
    
        
        <p><span className=" font-mt-extra ">Here </span>{user.purpose === 'Both' ? 'to teach and learn' : user.purpose}</p>
        <hr className="border-t border-gray-300 my-3" />
        
        <p>
          <span className="font-semibold font-mt-extra mr-5">Interests:</span>
          {user.userInterests?.length > 0 ? (
            user.userInterests.map((interest, index) => (
              <span key={index} className="mr-5">
                {interestIcons[interest.toLowerCase()] || '🔸'} {interest}
              </span>
            ))
          ) : (
            'Not specified'
          )}
        </p>
        
        <hr className="border-t border-gray-300 my-3" />
        <div className="mb-3">
          <p>
            <span className="space-x-9"> {/* Adds some space between language categories */}
              <span className="font-semibold">Native:</span> {user.nativeLanguage || 'Not specified'}
              <span className="font-semibold mx-4">Fluent:</span> {user.fluentLanguagess?.length > 0 ? user.fluentLanguagess.join(', ') : 'Not specified'}
              <span className="font-semibold mx-4">Learning:</span> {user.learningLanguagess?.length > 0 ? user.learningLanguagess.join(', ') : 'Not specified'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
