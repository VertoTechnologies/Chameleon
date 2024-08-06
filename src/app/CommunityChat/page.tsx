'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '../components/headerComponents/HomeHeader';
import Footer from '@/app/components/footerComponents/footer';
import LeftBox from '../components/friendsComponents/friends';
import Communities from '../components/friendsComponents/FriendRequests';
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
  const [activeButton, setActiveButton] = useState('friends');
  const searchParams = useSearchParams();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const friendId = searchParams?.get('friend') ?? null;
  const userId = localStorage.getItem('userId') || '';

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };
  useEffect(() => {
    console.log('Selected chat:', selectedChat);
  }, [selectedChat]);
  
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

    if (userId) {
      fetchUserChats();
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow" style={{ maxHeight: 'calc(150vh - 60px - 50px)' }}>
        {activeButton === 'friends' ? (
          <LeftBox
            activeButton={activeButton}
            toggleButton={toggleButton}
          />
        ) : (
          <Communities
            activeButton={activeButton}
            toggleButton={toggleButton}
            //setSelectedChat={setSelectedChat}
          
          />
        )}
        <div className="flex-1 px-4 overflow-hidden">
          {selectedChat ? (
            <ChatDetails chat={selectedChat} userId={userId} />
          ) : (
            <div>Select a chat to view details.</div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
  
};

export default UserChatsPage;
