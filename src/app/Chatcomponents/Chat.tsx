// src/components/Chat.tsx
'use client';
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatProps {
  friendName: string | null;
}

const Chat: React.FC<ChatProps> = ({ friendName }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (message: string) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <ChatHeader friendName={friendName} />
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} isOwnMessage={index % 2 === 0} />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
