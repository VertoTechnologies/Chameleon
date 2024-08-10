// app/components/friends/FriendRequests.tsx

import React from 'react';
import PendingRequests from './PendingRequests';

interface RequestsProps {
  activeButton: string;
  toggleButton: (button: string) => void;
}

const FriendRequests: React.FC<RequestsProps> = ({ activeButton, toggleButton }) => {
  return (
    <div className="w-1/4 h-[630px] overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)', boxShadow: '5px 4px 10px rgba(5, 5, 0, 0.5)' }}>
      {/* Toggle Buttons */}
      <div className="p-4 flex mt-4 ml-7">
        <button
          className={`px-10 py-2 rounded-full border-none ${activeButton === 'friends' ? 'bg-custom-green text-white shadow-2xl' : 'bg-white text-black shadow'}`}
          style={{ 
            backgroundColor: activeButton === 'friends' ? '#65AD87' : 'white', 
            borderRadius: '30px', 
            marginRight: '-15px',
            boxShadow: activeButton === 'friends' ? '5px 4px 10px rgba(5, 5, 0, 0.5)' : 'none' 
          }}
          onClick={() => toggleButton('friends')}
        >
          Friends
        </button>
        <button
          className={`px-9 py-2 rounded-full border-none ${activeButton === 'community' ? 'bg-custom-green text-white shadow-2xl' : 'bg-white text-black shadow'}`}
          style={{ 
            backgroundColor: activeButton === 'community' ? '#65AD87' : 'white', 
            borderRadius: '30px', 
            zIndex: 1, 
            position: 'relative', 
            left: '-15px',
            boxShadow: activeButton === 'community' ? '5px 4px 10px rgba(5, 5, 0, 0.5)' : 'none'
          }}
          onClick={() => toggleButton('community')}
        >
          Requests
        </button>
      </div>

      {/* Pending Friend Requests */}
      <div className="mt-4 ml-6 mr-3">
        {activeButton === 'community' && <PendingRequests />}
      </div>
    </div>
  );
};

export default FriendRequests;
