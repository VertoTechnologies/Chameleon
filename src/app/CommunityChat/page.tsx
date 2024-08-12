'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '@/app/components/headerComponents/HomeHeader';
import Footer from '@/app/components/footerComponents/footer';
import LeftBox from '../components/friendsComponents/friends';
import Communities from '../components/friendsComponents/FriendRequests';
import ChatDetails from './ChatDetails';
import { useProfile } from "../stores/UserStore";
import withAuth from '../components/authComponents/withAuth';
import Loading from '../loading'; // Import the loading component

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
  const [currUser, setCurrUser] = useState<string>('');
  const chatId = searchParams?.get('chatId') ?? null;
  const profile = useProfile();

 
  const router = useRouter();


  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await axios.get<Chat[]>(`/api/userprofile/getGroups?userId=${profile.userId}`);
        setChats(response.data);

        // If a chatId is present, find the corresponding chat
        if (chatId) {
          const chat = response.data.find(c => c._id === chatId);
          setSelectedChat(chat || null);
        }
      } catch (err) {
        setError((err as Error).message || 'An error occurred while fetching chats.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async ()=>{
      try{
        const reponse = await axios.get(`/api/userprofile/viewProfile?userId=${profile.userId}`);3
        setCurrUser(reponse.data._id);
      }catch(err){
        setError((err as Error).message || 'An error occurred while fetching user.');
      }
    }

    if (profile.userId) {
      fetchUserChats();
      fetchUser();
      console.log(currUser);
    }
  }, [profile.userId, chatId,currUser]);

  if (loading) return <div>
    <Loading />
  </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // <section className="flex flex-col min-h-screen ">
    <section className="flex flex-col min-h-screen bg-[#E7EEEA]">
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
          />
        )}
        <div className="flex-1 px-4 overflow-hidden">
          {selectedChat ? (
            <ChatDetails chat={selectedChat} userId={profile.userId} objectId_user={currUser} />
          ) : (
            <div>Select a chat to view details.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default withAuth(UserChatsPage);
