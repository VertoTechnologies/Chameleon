'use client'
import '../globals.css';
import Header from '../components/headermain';
import Footer from '../components/footer';
import LeftBox from '../components/friends';
import RightBox from '../components/suggestions';
import Communities from '../components/communities';
import useUserProfileStore from '../components/slaystore';
import React, { useEffect, useState } from 'react';
import { IoChatbubbleSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter(); // Initialize useRouter
  const profile = useUserProfileStore((state) => state); // Use profile from the store

  const [activeButton, setActiveButton] = useState('friends');
  const [onlineUsers, setOnlineUsers] = useState<{ name: string; profilePic: string; userId: string }[]>([]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        if (!profile?.userId) return; // Ensure userId is available

        // Fetch online users excluding the current user
        const response = await fetch(`/api/onlineusers?userId=${profile.userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOnlineUsers(data);
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers();
  }, [profile?.userId]);

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  const handleChatClick = (userId: string) => {
    console.log("Navigating to chat with:", userId);
    router.push(`/Chat?friend=${encodeURIComponent(userId)}`); // Navigate to the chat page of the clicked user
  };

  if (!profile) {
    return <div>Loading...</div>; // Or show a loading spinner or placeholder
  }

  return (
    <section className="overflow-y-auto h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green scrollbar-track-gray">
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Left Box or Communities */}
        {activeButton === 'friends' ? (
          <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
        ) : (
          <Communities activeButton={activeButton} toggleButton={toggleButton} />
        )}

        {/* Main Content Area */}
        <div className="flex-grow p-6">
          <div className='flex-col'>
            <h1 className="text-mtextra text-xl font-bold mb-2">Online</h1>
            {/* Online Users Section */}
            <div className="online-users-container mt-6 custom-scrollbar">
              {onlineUsers.map((user, index) => (
                <div key={index} className="flex items-center px-4 py-2" style={{ borderTopColor: '#65AD87', borderTopWidth: '2px', borderTopStyle: 'solid' }}>
                  <img src={user.profilePic || '/assets/extras/profilepicture.png'} alt={user.name} className="w-12 h-12 rounded-full mr-4 border-2 border-[#65AD87]" />
                  <span className="text-lg text-mtextra">{user.name}</span>
                 
                  <span className="ml-auto cursor-pointer" onClick={() => handleChatClick(user.userId)}>
                    {/* Chat icon using IoChatbubbleSharp */}
                    <IoChatbubbleSharp style={{ color: '#65AD87' }} className="h-6 w-6" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Box */}
        <RightBox />
      </div>

      {/* Footer Component */}
      <Footer />
    </section>
  );
};

export default Page;
