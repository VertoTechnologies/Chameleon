// src/components/MessageInput.tsx
'use client';
import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg"
      />
      <button
        onClick={handleSend}
        className="ml-2 px-4 py-2 bg-custom-green text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
