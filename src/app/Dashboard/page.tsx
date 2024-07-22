
'use client'
import '../globals.css'; // Correct path based on the structure above
import Header from '../components/headermain';
import Footer from '../components/footer';

import LeftBox from '../components/friends';
import RightBox from '../components/suggestions';
import Communities from '../components/communities';
import useUserProfile from '../components/useUserProfile';
import useUserProfileStore from '../components/slaystore.js'
import React, { useEffect, useState } from 'react';

const Page = () => {

  const setName = useUserProfileStore((state) => state.setName);
  const setUserDescription = useUserProfileStore((state) => state.setUserDescription);
  const setNativeLanguage = useUserProfileStore((state) => state.setNativeLanguage);
  const setFluentLanguages = useUserProfileStore((state) => state.setFluentLanguages);
  const setLearningLanguages = useUserProfileStore((state) => state.setLearningLanguages);
  const setUserInterests = useUserProfileStore((state) => state.setUserInterests);

  const { profile } = useUserProfile(window?.localStorage.getItem("userId"));

  useEffect(() => {
    if (!profile) {
        return
    }
    
    setName(profile.name)
    setUserDescription(profile.userDescription)
    setNativeLanguage(profile.nativeLanguage)
    setFluentLanguages(profile.fluentLanguages)
    setLearningLanguages(profile.learningLanguages)
    setUserInterests(profile.userInterests)

  }, [profile]);



  const [activeButton, setActiveButton] = useState('friends');

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };


  return (
    <section className="overflow-y-auto h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green">
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
          <h1>Main Content Area</h1>
          <p>This is where your main content would go.</p>

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

