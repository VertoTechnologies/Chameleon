'use client';
import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import '../globals.css'; // Ensure this path is correct

interface ChatProps {
  friendId: string | null;
}

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string; // Include timestamp
  _id: string; // MongoDB document ID
}

const Chat: React.FC<ChatProps> = ({ friendId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Assuming you have a way to get the current user's ID

  useEffect(() => {
    const fetchMessages = async () => {
      if (friendId && userId) {
        try {
          const response = await fetch(`/api/getmessage?senderId=${userId}&receiverId=${friendId}`);
          if (!response.ok) throw new Error('Failed to fetch messages');
          const data = await response.json();
          console.log('Fetched messages:', data); // Log fetched messages
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    

    fetchMessages();
  }, [friendId, userId]);

  const handleSend = async (message: string, timestamp: string) => {
    if (friendId && userId) {
      try {
        const response = await fetch('/api/sendmessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId: friendId,
            message,
            timestamp,
          }),
        });
        if (!response.ok) throw new Error('Failed to send message');
        const newMessage = await response.json();
        console.log('Sent message:', newMessage); // Log sent message
        setMessages([...messages, newMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  

  return (
    <div 
      className="flex flex-col h-[750px] bg-white rounded-lg shadow-lg"
      style={{
        background: `
          linear-gradient(
            rgba(101, 173, 135, 0.3), 
            rgba(101, 173, 135, 0.3)
          ), 
          url(/assets/extras/Background.png)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header */}
      <ChatHeader friendId={friendId} />

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg.message}
              isOwnMessage={msg.senderId === userId}
              timestamp={msg.timestamp} // Pass timestamp to MessageBubble
            />
          ))}
        </div>
      </div>

      {/* Input Box */}
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
