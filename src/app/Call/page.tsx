'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import '../globals.css'; // Ensure this path is correct based on your project structure
import Header from '../components/headermain';
import Footer from '../components/footer';
import LeftBox from '../components/friends';
import Call from './call'; // Adjust the path if necessary
import Communities from '../components/communities';

const ChatPage = () => {
  const [activeButton, setActiveButton] = useState('friends');
  const searchParams = useSearchParams();
  const friendId = searchParams?.get('friend') ?? null; // Directly get 'friend' from searchParams

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  console.log('Friend ID:', friendId); // Debug log for friendId

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
          {/* Pass friendId as a prop to Call component */}
          <Call friendId={friendId} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ChatPage;
