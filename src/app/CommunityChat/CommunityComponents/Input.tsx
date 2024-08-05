'use client';

import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { CiFaceSmile } from 'react-icons/ci';
import Picker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
  onSend: (message: string, timestamp: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      const timestamp = new Date().toISOString();
      console.log('Sending message:', message, 'Timestamp:', timestamp);
      onSend(message, timestamp);
      setMessage('');
    }
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4 flex relative">
      <div className="flex-1 flex items-center border border-[#65AD87] rounded-lg bg-white h-16">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="flex-1 p-2 border-none rounded-lg bg-white resize-none overflow-auto outline-none focus:ring-0 focus:border-transparent h-full"
        />
        <button
          className="text-[#65AD87] text-3xl ml-2 relative"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <CiFaceSmile />
          {showEmojiPicker && (
            <div className="absolute right-0 bottom-full mt-2 mb-3">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </button>
        <button
          onClick={handleSend}
          className="text-[#65AD87] text-3xl ml-4"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
