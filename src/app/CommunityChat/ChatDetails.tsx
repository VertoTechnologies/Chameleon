'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatHeader from './CommunityComponents/Cheader';
import MessageInput from './CommunityComponents/Input';
import MessageBubble from './CommunityComponents/MessageBubble';

interface Chat {
  _id: string;
  language: string;
  groupPhoto: string;
  users: string[];
}

interface Message {
  _id: string;
  text: string;
  sender: {
    name: string;
   
    _id: string;
  };
  photo: string; 
  createdAt: string;
}

const ChatDetails: React.FC<{ chat: Chat; userId: string }> = ({ chat, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socketInstance = io({
      path: '/api/socket',
    });

    setSocket(socketInstance);

    socketInstance.emit('joinRoom', chat._id);

    socketInstance.on('previousMessages', (previousMessages) => {
      console.log('Previous messages received:', previousMessages);
      setMessages(previousMessages);
    });

    socketInstance.on('receiveMessage', (message) => {
      console.log('New message received:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketInstance.on('error', (socketError) => {
      console.error('Socket error:', socketError);
      setError(socketError.message);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [chat._id]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (message: string, timestamp: string) => {
    try {
      const response = await axios.post('/api/groups/groupMessage', {
        chatId: chat._id,
        userId,
        text: message,
        createdAt: timestamp,
      });
      const newMessage = response.data;
      socket?.emit('sendMessage', { ...newMessage, chatId: chat._id, userId });
    } catch (err) {
      setError((err as Error).message || 'An error occurred while sending the message.');
    }
  };

  return (
    <div
      className="flex flex-col  h-[650px] rounded-lg shadow-lg relative bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/extras/Background.png')" }}
    >
      <div className="absolute inset-0 bg-[rgba(101,173,135,0.3)]"></div>
      <div className="relative flex flex-col h-full">
        <ChatHeader language={chat.language} profilePic={chat.groupPhoto} />
        <div className="flex-1 p-4 overflow-y-auto flex flex-col">
          <div className="flex flex-col flex-grow">
            {messages.map((msg) => (
              <MessageBubble
                key={msg._id}
                message={msg.text}
                isOwnMessage={msg.sender._id === userId}
                timestamp={msg.createdAt}
                senderName={msg.sender.name}
                senderPicture={msg.photo} // Add this prop
              />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatDetails;
