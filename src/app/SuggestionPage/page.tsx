'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import '../globals.css'; // Correct path based on the structure above
import Header from '../components/headerComponents/HomeHeader';
import LeftBox from '../components/friendsComponents/friends';
import SuggestionBox from './SuggestionBox';
import Communities from '../components/friendsComponents/FriendRequests';
import withAuth from '../components/authComponents/withAuth';

const ChatPage = () => {
  const [activeButton, setActiveButton] = useState('friends');
  const searchParams = useSearchParams();
  const friendId = searchParams?.get('friend') ?? null;

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  return (
    <section className="flex flex-col min-h-screen">
      {/* Header Component */}
      <Header />
      <div className="flex flex-grow">
        {/* Left Box or Communities */}
        {activeButton === 'friends' ? (
          <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
        ) : (
          <Communities activeButton={activeButton} toggleButton={toggleButton} />
        )}
        <div className="flex-1 px-4">
          <SuggestionBox />
        </div>
      </div>
    </section>
  );
};

export default withAuth(ChatPage);
