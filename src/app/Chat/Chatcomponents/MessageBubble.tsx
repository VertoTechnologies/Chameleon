'use client';
import React from 'react';

interface MessageBubbleProps {
  message: string;
  isOwnMessage?: boolean;
  timestamp?: string; 
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage, timestamp }) => {
  
  const formattedTimestamp = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  // console.log('MessageBubble props:', { message, isOwnMessage, timestamp }); // Log props

  return (
    <div
      className={`p-2 mb-2 flex ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`p-3 rounded-lg max-w-[50%] break-words ${
          isOwnMessage ? 'bg-[#65AD87] text-white' : 'bg-gray-100'
        }`}
        style={{
          backgroundColor: isOwnMessage ? '#65AD87' : '#f1f1f1',
        }}
      >
        {message}
        {/* Display the timestamp */}
        {timestamp && (
          <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
            {formattedTimestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
  