'use client';
import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import '../globals.css';
import { useProfile } from '../components/slaystore';

interface ChatProps {
  friendId: string | null;
}

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  _id: string;
}

const Chat: React.FC<ChatProps> = ({ friendId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const profile = useProfile();
  const userId = profile.userId;

  useEffect(() => {
    const fetchMessages = async () => {
      if (friendId && userId) {
        try {
          const response = await fetch(`/api/getmessage?senderId=${userId}&receiverId=${friendId}`);
          if (!response.ok) throw new Error('Failed to fetch messages');
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();

    const eventSource = new EventSource(`/api/messageEventListener?friendId=${friendId}&userId=${userId}`);

    eventSource.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
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
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col h-[750px] bg-white rounded-lg shadow-lg">
      <ChatHeader friendId={friendId} />
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg.message}
              isOwnMessage={msg.senderId === userId}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
