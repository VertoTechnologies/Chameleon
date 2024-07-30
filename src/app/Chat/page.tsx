'use client';
import React, { useState } from 'react';
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
    <section className="flex flex-col min-h-screen " >
      {/* Header Component */}
      <Header />
      <div className="flex flex-grow" style={{ maxHeight: 'calc(150vh - 60px - 50px)' }}>
        {/* Left Box or Communities */}
        {activeButton === 'friends' ? (
          <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
        ) : (
          <Communities activeButton={activeButton} toggleButton={toggleButton} />
        )}
        <div className="flex-1 px-4 overflow-hidden">
          <Chat friendId={friendId} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ChatPage;
