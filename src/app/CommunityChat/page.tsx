'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatDetails from './ChatDetails';

interface Chat {
  _id: string;
  language: string;
  groupPhoto: string;
  users: string[];
}

const UserChatsPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  
  const userId = localStorage.getItem('userId'); // Replace with actual user ID or fetch from authentication context

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await axios.get<Chat[]>(`/api/userprofile/getGroups?userId=${userId}`);
        setChats(response.data);
      } catch (err) {
        setError((err as Error).message || 'An error occurred while fetching chats.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserChats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedChat) {
    return <ChatDetails chat={selectedChat} userId={userId} />;
  }

  return (
    <div>
      <h1>Group Chats</h1>
      {chats.length === 0 ? (
        <div>No group chats found.</div>
      ) : (
        <ul>
          {chats.map(chat => (
            <div className='border' onClick={() => setSelectedChat(chat)} key={chat._id}>
              <li key={chat._id}>
                <h2>{chat.language}</h2>
                <div className='w-14'>
                  {chat.groupPhoto ? (
                    <img src={chat.groupPhoto} alt="Group" />
                  ) : (
                    <img src={`/assets/extras/${chat.language}.png`} alt="Group" />
                  )}
                </div>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserChatsPage;
