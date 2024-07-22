// src/components/MessageBubble.tsx
'use client';
import React from 'react';

interface MessageBubbleProps {
  message: string;
  isOwnMessage?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  return (
    <div
      className={`p-2 mb-2 rounded-lg ${isOwnMessage ? 'bg-green-100 self-end' : 'bg-gray-100 self-start'}`}
    >
      {message}
    </div>
  );
};

export default MessageBubble;
