// src/components/ChatHeader.tsx
'use client';
import React from 'react';

interface ChatHeaderProps {
  friendName: string | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ friendName }) => {
  return (
    <div className="bg-gray-200 p-4 flex items-center border-b">
      <h1 className="text-xl font-bold">Chat with {friendName}</h1>
    </div>
  );
};

export default ChatHeader;
