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

  const [onlineUsers, setOnlineUsers] = useState<
   UserData[]
  >([]);

  useEffect(() => {
    if (!profile) return;
    useUserProfileStore.setState(profile);
    console.log(profile);

    const fetchOnlineUsers = async () => {
      try {
        if (!profile?.userId) return;
        const response = await fetch(
          `/api/users/onlineusers?userId=${profile.userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOnlineUsers(data);
      } catch (error) {
        console.error("Error fetching online users:", error);
      }
    };

    fetchOnlineUsers();
  }, [profile]);



  const handleChatClick = (event: React.MouseEvent<HTMLSpanElement>, userData: UserData) => {
    router.push(`/Chat?friend=${userData.userId}`); // Navigate to the chat page of the clicked user

  };
  
  
  if (!profile) {
    return <div>Loading...</div>; // Or show a loading spinner or placeholder
  }

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
        {activeButton === "friends" ? (
          <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
        ) : (
          <Communities
            activeButton={activeButton}
            toggleButton={toggleButton}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-grow p-4">
          <div className="flex-col"></div>
          <h1 className="text-mtextra text-xl font-bold mb-2">Online</h1>

          {/* Online Users Section */}
         
        </div>

        {/* Right Box */}
        <RightBox />
      </div>

      {/* Footer Component */}
      
    </section>
  );
};

export default Page;
