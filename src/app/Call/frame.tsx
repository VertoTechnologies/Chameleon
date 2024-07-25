import React from 'react';
import { HiMicrophone } from 'react-icons/hi'; // Using an icon library like react-icons
import { FaMicrophoneSlash } from 'react-icons/fa';
interface FrameProps {
  profilePicture: string;
  userName: string;
}

const Frame: React.FC<FrameProps> = ({ profilePicture, userName }) => {
  return (
    <div className="flex flex-col items-center justify-center w-96 px h-64 bg-white rounded-lg shadow-lg relative">
      <img
        src={profilePicture}
        alt={userName}
      
      />
      <div className="absolute bottom-2 left-2 bg-[rgba(101,173,135,0.5)] text-black text-sm px-2 py-1 rounded-full">
        {userName}
      </div>
      {/* Mute button */}
      <div
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-[rgba(101,173,135,0.5)] text-white rounded-full"
        title="Mute"
      >
        <FaMicrophoneSlash  className="text-xl" />
      </div>
    </div>
  );
};

export default Frame;
