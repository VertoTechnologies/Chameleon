'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatHeader from './CommunityComponents/Cheader';
import MessageInput from './CommunityComponents/Input';
import MessageBubble from './CommunityComponents/MessageBubble';
import { useProfile } from '../stores/UserStore';
interface User {
  _id: string;
  name: string;
  profilePic: string;
}
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
    userId?: string;
    _id: string;
    profilePic: string;
  };
  profilePic: string;
  createdAt: string;
}

const ChatDetails: React.FC<{ chat: Chat; userId: string; objectId_user: string }> = ({ chat, userId, objectId_user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [groupUsers, setGroupUsers] = useState<User[]>([]); // State for group users
  const profile = useProfile();
  useEffect(() => {
    const fetchGroupUsers = async () => {
      try {
        // Fetch user chats which include user details
        const response = await axios.get(`/api/userprofile/getGroups?userId=${userId}`);
        const userChats = response.data;

        // Find the current chat in the userChats array
        const currentChat = userChats.find((chatItem: Chat) => chatItem._id === chat._id);

        if (currentChat) {
          console.log('Users fetched for the group:', currentChat.users); // Logging fetched users
          setGroupUsers(currentChat.users);
        } else {
          console.error('Chat not found in user chats');
        }
      } catch (err) {
        console.error('Error fetching group users:', err);
      }
    };

    fetchGroupUsers();
  }, [chat._id, userId]);
  useEffect(() => {
    const socketInstance = io({
      path: '/api/socket',
    });

    setSocket(socketInstance);

    socketInstance.emit('joinRoom', chat._id);

    const handlePreviousMessages = (previousMessages: Message[]) => {
      console.log('Previous messages received:', previousMessages);
      setMessages((prevMessages) => {
        const newMessages = previousMessages.filter((message, index) => {
          // Check if the current message is the same as the previous message in the newMessages array
          if (index === 0) {
            // If it's the first message, compare it with the last message in prevMessages
            return prevMessages.length === 0 || prevMessages[prevMessages.length - 1].text !== message.text;
          } else {
            // Otherwise, compare it with the previous message in previousMessages
            return previousMessages[index - 1].text !== message.text;
          }
        });
        return [...prevMessages, ...newMessages];
      });
    };

    const handleReceiveMessage = (message: Message) => {
      console.log('New message received:', message);
      setMessages((prevMessages) => {
        // Check if the last message is the same as the new message
        if (prevMessages.length === 0 || prevMessages[prevMessages.length - 1].text !== message.text) {
          return [...prevMessages, message];
        }
        // If the text is the same, do not add the new message
        return prevMessages;
      });
    };

    socketInstance.on('previousMessages', handlePreviousMessages);
    socketInstance.on('receiveMessage', handleReceiveMessage);
    socketInstance.on('error', (socketError) => {
      console.error('Socket error:', socketError);
      setError(socketError.message);
    });

    return () => {
      socketInstance.off('previousMessages', handlePreviousMessages);
      socketInstance.off('receiveMessage', handleReceiveMessage);
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
        userId: userId,
        text: message,
        createdAt: timestamp,
      });
      const newMessage = response.data;
      socket?.emit('sendMessage', { ...newMessage, chatId: chat._id, userId: objectId_user });
    } catch (err) {
      setError((err as Error).message || 'An error occurred while sending the message.');
    }
  };

  return (
    <div
      className="flex flex-col h-[630px] rounded-lg shadow-lg relative bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/extras/bga2.png')" }}
    >
      <div className="absolute inset-0 bg-[rgba(124,181,151,0.3)]"></div>
      <div className="relative flex flex-col h-full">
      <ChatHeader language={chat.language} profilePic={chat.groupPhoto} users={groupUsers} />
        <div className="flex-1 p-4 overflow-y-auto flex flex-col">
          <div className="flex flex-col flex-grow">
            {messages.map((msg) => (
              console.log(msg.sender.userId, userId, objectId_user, msg.sender._id),
              <MessageBubble
                key={msg._id}
                message={msg.text}
                isOwnMessage={msg.sender.userId === userId || msg.sender._id === objectId_user || msg.sender._id === userId || msg.sender.userId === objectId_user || msg.sender.name === profile.name}
                timestamp={msg.createdAt}
                senderId={msg.sender.userId || ''}
                senderName={msg.sender.name}
                senderPicture={msg.profilePic}
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
