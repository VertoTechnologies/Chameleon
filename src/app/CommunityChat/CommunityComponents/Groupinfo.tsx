// src/components/GroupInfoPopup.tsx
"use client";
import React from 'react';

interface GroupInfoPopupProps {
  users: { name: string; profilePicture?: string }[]; // Assuming users have a name and optional profile picture
  onClose: () => void;
}

const GroupInfoPopup: React.FC<GroupInfoPopupProps> = ({ users, onClose }) => {
  const totalUsers = users.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Group Info</h2>
        
        {/* Display total users */}
        <p className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Total Members: {totalUsers}
        </p>
        
        {/* Members Heading */}
        <h3 className="text-xl font-bold mb-2 text-[#65AD87]">Members</h3>
        
        {/* User List */}
        <ul className="list-none max-h-60 overflow-y-auto">
          {users.map((user, index) => (
            <li key={index} className="mb-2 flex items-center space-x-3">
              <img
                src={user.profilePicture || "/assets/extras/profilepicture.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-gray-800">{user.name}</span>
            </li>
          ))}
        </ul>
        
        {/* Close Button */}
        <button
          className="mt-6 bg-[#65AD87] text-white py-2 px-4 rounded w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GroupInfoPopup;
