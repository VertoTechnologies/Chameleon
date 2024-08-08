'use client';
import React from 'react';

interface MessageBubbleProps {
  message: string;
  isOwnMessage?: boolean;
  timestamp?: string;
  senderName: string;
  senderPicture: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  timestamp,
  senderName,
  senderPicture,
}) => {
  const formattedTimestamp = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div
      className={`py-1  flex ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      } items-center`}
    >
      {!isOwnMessage && (
        <img
          src={senderPicture}
          alt={senderName}
          className="w-6 h-11 rounded-full mr-2"
        />
      )}
      <div
        className={`px-2 py-1 rounded-lg max-w-[60%] break-words shadow-md ${
          isOwnMessage ? 'bg-[#65AD87] text-white' : 'bg-white'
        }`}
        style={{
          backgroundColor: isOwnMessage ? '#65AD87' : '#ffffff',
          color: isOwnMessage ? '#ffffff' : '#000000',
          borderRadius: '15px',
          padding: '8px 12px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {!isOwnMessage && (
          <div className="font-bold text-sm ">{senderName}</div>
        )}
        {message}
        {timestamp && (
          <div className={`text-xs  ${isOwnMessage ? 'text-white text-right' : 'text-gray-500 text-left'}`}>
            {formattedTimestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
