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

  const handleImageClick = () => {
    router.push('/Explore'); // Replace with your target route
  };

  return (
    <section className="h-screen ">
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
        <div className="flex-grow p-4 bg-[url('/assets/extras/dashboardbackground.png')] bg-cover bg-center">
          {/* Add your clickable image here */}
          <div onClick={handleImageClick}  className="absolute bottom-32 right-96  mr-24 cursor-pointer">
            <Image
              src="/assets/extras/cham.png" // Replace with the path to your image
              alt="Clickable Image"
              width={250} // Adjust width as needed
              height={90} // Adjust height as needed
              className="object-cover"
            />
          </div>
          <div onClick={handleImageClick}  className="absolute bottom-72 right-64   cursor-pointer">
            <Image
              src="/assets/extras/messagebubble.png" // Replace with the path to your image
              alt="Clickable Image"
              width={280} // Adjust width as needed
              height={90} // Adjust height as needed
              className="object-cover"
            />
             {/* Text Overlay */}
             <div className="absolute inset-0 flex items-center justify-center text-center text-white text-md font-semibold">
             <span className="transform translate-y-[-55%] translate-x-1">Find Chameleons Worldwide!</span>
            </div>
          </div>
          {/* Content area is empty now */}
        </div>

       
      </div>

      {/* Footer Component */}
     
    </section>
  );
};

export default withAuth(Page);
