'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import '../globals.css'; // Correct path based on the structure above
import Header from '../components/headermain';
import Footer from '../components/footer';
import LeftBox from '../components/friends';
import Chat from '../Chatcomponents/Chat';
import Communities from '../components/communities';

const ChatPage = () => {
  const [activeButton, setActiveButton] = useState('friends');
  const searchParams = useSearchParams();
  const friendId = searchParams?.get('friend') ?? null;

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  return (
    <section className="overflow-y-auto h-[calc(80vh-4rem)] min-h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green scrollbar-track-gray">
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
          <Chat friendId={friendId} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ChatPage;
