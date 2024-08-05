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
          <div className="text-center text-2xl font-bold mt-4">
            Coming Soon...
          </div>
        </div>

        {/* Right Box */}
        <RightBox />
      </div>

      {/* Footer Component */}
      
    </section>
  );
};

export default withAuth(Page);
