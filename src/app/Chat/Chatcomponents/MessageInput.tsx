// MessageInput.tsx
'use client';
import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { CiFaceSmile } from 'react-icons/ci';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { RiGalleryUploadLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";

interface MessageInputProps {
  onSend: (message: string, timestamp: string, image?: File) => void; // Updated to include image
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSend = () => {
    if (message.trim() || image) {
      const timestamp = new Date().toISOString(); // Get current time in ISO format
      console.log('Sending message:', message, 'Timestamp:', timestamp); // Log message and timestamp
      onSend(message, timestamp, image); // Pass message and image
      setMessage('');
      setImage(undefined);
      setImagePreview(null);
    }
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false); // Close the picker after selecting an emoji
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="p-4 flex flex-col relative">
      {/* Image Preview */}
      {imagePreview && (
        <div className="flex flex-row">
          <img src={imagePreview} alt="Preview" className="max-w-full max-h-48 rounded-lg bg-[#65AD87] p-4" />
          <button
          onClick={handleSend}
          className="text-[#65AD87] text-3xl z-10 max-w-fit"
        >
            <IoIosSend />
            </button>
        </div>
      )}
      {/* Input Field with Buttons */}
      <div className="flex-1 flex items-center border border-[#65AD87] rounded-lg bg-white h-16">
        {/* Textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="flex-1 p-2 border-none rounded-lg bg-white resize-none overflow-auto outline-none focus:ring-0 focus:border-transparent h-full"
        />
        {/* Emoji Button */}
        <button
          className="text-[#65AD87] text-3xl ml-2 relative"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <CiFaceSmile />
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute right-0 bottom-full mt-2 mb-3">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </button>
        {/* Image Picker */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="text-[#65AD87] text-3xl ml-2 cursor-pointer">
        <CiImageOn />
        </label>
        {/* Send Button */}
        <button
          onClick={handleSend}
          className="text-[#65AD87] text-3xl ml-2 mr-1"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
