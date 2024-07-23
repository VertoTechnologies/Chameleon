'use client';

import '../globals.css'; // Correct path based on the structure above
import Header from '../components/headermain';
import Footer from '../components/footer';
import LeftBox from '../components/friends';
import RightBox from '../components/suggestions';
import Communities from '../components/communities';
import useUserProfile from '../components/useUserProfile';
import useUserProfileStore from '../components/slaystore';
import React, { useEffect, useState } from 'react';
import { IoChatbubbleSharp } from "react-icons/io5";

const Page = () => {
  const { profile } = useUserProfile(typeof window !== "undefined" ? window.localStorage.getItem("userId") : null);

  useEffect(() => {
    if (!profile) return;
    useUserProfileStore.setState(profile);
    console.log(profile);
  }, [profile]);

  const [activeButton, setActiveButton] = useState('friends');
  const [onlineUsers] = useState([
    { name: 'John Doe', image: "/assets/extras/profilepicture.png" },
    { name: 'Jane Smith', image: "/assets/extras/profilepicture.png" },
    { name: 'Alice Johnson', image: "/assets/extras/profilepicture.png" }
  ]);

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

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
        <div className="flex-grow p-4">
          <h1 className="text-mtextra text-xl font-bold mb-2">Online</h1>
          
          {/* Online Users Section */}
          <div className="mt-6">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center px-4 py-2" style={{ borderTopColor: '#65AD87', borderTopWidth: '2px', borderTopStyle: 'solid' }}>
                <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
                <span className="text-lg text-mtextra">{user.name}</span>
                <span className="ml-auto">
                  {/* Chat icon using IoChatbubbleSharp */}
                  <IoChatbubbleSharp style={{ color: '#65AD87' }} className="h-6 w-6" />
                </span>
              </div>
            ))}
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
