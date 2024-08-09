// src/components/ChatHeader.tsx
"use client";
import React, { useState } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import GroupInfoPopup from './Groupinfo';

interface User {
  _id: string;
  name: string;
  profilePic: string;
}

interface ChatHeaderProps {
  language: string;
  profilePic?: string;
  users: User[]; // Updated to pass user details
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ language, profilePic, users }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-[#F4F4F4] p-4 flex items-center justify-between border-b">
      {/* Left side: Profile picture and community language */}
      <div className="flex items-center space-x-3">
        <img
          src={profilePic || "/assets/extras/profilepicture.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300 ml-2"
        />
        <span className="text-mtextra text-lg font-bold align-middle ml-2">
          {language || "Loading..."}
        </span>
      </div>

      {/* Right side: Icons */}
      <div className="flex space-x-4">
        <HiDotsHorizontal
          className="text-[#65AD87] text-3xl cursor-pointer mr-1 mt-1"
          title="More Options"
          onClick={handlePopupOpen}
        />
      </div>

      {isPopupOpen && <GroupInfoPopup users={users} onClose={handlePopupClose} />}
    </div>
  );
};

export default ChatHeader;
