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
  const friend = searchParams?.get('friend') ?? null;
  const [friendName, setFriendName] = useState<string | null>(friend);
  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  useEffect(() => {
    if (friend) {
      setFriendName(friend);
    }
  }, [friend]);

  return (
    <section className="overflow-y-auto h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green scrollbar-track-gray">
    {/* Header Component */}
    <Header />
    <div className="flex flex-grow">
        {/* Left Box or Communities */}
        {activeButton === 'friends' ? (
          <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
        ) : (
          <Communities activeButton={activeButton} toggleButton={toggleButton} />
        )}
    <div className="flex-1 p-4">
    <Chat friendName={friendName} />
      {/* Chat implementation here */}
    </div>
    </div>
      <Footer />
      </section>
  );
};

export default ChatPage;
