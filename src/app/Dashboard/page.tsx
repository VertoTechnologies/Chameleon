"use client";

import "../globals.css"; // Correct path based on the structure above
import Header from "../components/headerComponents/HomeHeader";
import Footer from "../components/footerComponents/footer";
import LeftBox from "../components/friendsComponents/friends";
import RightBox from "../components/suggestionComponents/suggestions";
import Communities from "../components/friendsComponents/FriendRequests";
import useUserProfile from "../components/profileComponents/useUserProfile";
import useUserProfileStore from "../stores/UserStore";
import React, { useEffect, useState } from "react";
import { IoChatbubbleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import withAuth from "../components/authComponents/withAuth";
import Loading from "../components/loadingComponents/Loading";
import Image from 'next/image'; // Import Image component
import useSuggestionStore from "../stores/SuggestionStore";

interface UserData {
  name: string;
  profilePic: string;
  userId: string;
}

const Page = () => {
  const { profile } = useUserProfile(
    typeof window !== "undefined" ? localStorage.getItem("userId") : null
  );
  const router = useRouter(); // Initialize useRouter
  const [activeButton, setActiveButton] = useState("friends");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    useUserProfileStore.setState(profile);
    console.log(profile);
  }, [profile]);

  if (!profile) {
    return <Loading />; // Or show a loading spinner or placeholder
  }
  
  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  const handleImageClick = () => {
    router.push('/SuggestionPage'); // Replace with your target route
  };

  return (
    <section className="h-screen bg-[#E7EEEA] flex flex-col">
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Box or Communities */}
        <div className="hidden lg:block">
          {activeButton === "friends" ? (
            <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
          ) : (
            <Communities
              activeButton={activeButton}
              toggleButton={toggleButton}
            />
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative bg-[url('/assets/extras/dashboardbackground.png')] bg-cover bg-center p-4 sm:p-6 lg:p-8">
          {/* Mobile Toggle Buttons for Friends/Communities */}
          <div className="lg:hidden mb-4">
            <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => toggleButton("friends")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeButton === "friends"
                    ? "bg-[#65AD87] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Friends
              </button>
              <button
                onClick={() => toggleButton("communities")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeButton === "communities"
                    ? "bg-[#65AD87] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Communities
              </button>
            </div>
          </div>

          {/* Mobile Drawer for Friends/Communities */}
          <div className="lg:hidden mb-4">
            <div className="bg-white rounded-lg shadow-sm max-h-64 overflow-y-auto">
              {activeButton === "friends" ? (
                <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
              ) : (
                <Communities
                  activeButton={activeButton}
                  toggleButton={toggleButton}
                />
              )}
            </div>
          </div>

          {/* Clickable Images - Responsive positioning */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Chameleon Image */}
            <div 
              onClick={handleImageClick}  
              className="absolute bottom-8 sm:bottom-16 md:bottom-24 lg:bottom-32 right-4 sm:right-12 md:right-24 lg:right-96 xl:right-[24rem] cursor-pointer pointer-events-auto transform hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/assets/extras/cham.png"
                alt="Clickable Chameleon"
                width={150}
                height={60}
                className="sm:w-48 sm:h-20 md:w-56 md:h-24 lg:w-64 lg:h-28 object-cover"
              />
            </div>
            
            {/* Message Bubble */}
            <div 
              onClick={handleImageClick}  
              className="absolute bottom-16 sm:bottom-32 md:bottom-48 lg:bottom-72 right-2 sm:right-8 md:right-16 lg:right-64 cursor-pointer pointer-events-auto transform hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/assets/extras/messagebubble.png"
                alt="Clickable Message Bubble"
                width={200}
                height={70}
                className="sm:w-56 sm:h-20 md:w-64 md:h-24 lg:w-72 lg:h-28 object-cover"
              />
              
              {/* Text Overlay - Responsive */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold transform -translate-y-2 sm:-translate-y-3 md:-translate-y-4 lg:-translate-y-6 px-2">
                  Find Chameleons Worldwide!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Page);
