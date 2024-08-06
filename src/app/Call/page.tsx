"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import "../globals.css"; // Ensure this path is correct based on your project structure
import Header from "@/app/components/headerComponents/HomeHeader";
import Footer from "@/app/components/footerComponents/footer";
import LeftBox from "@/app/components/friendsComponents/friends";
import Communities from "@/app/components/friendsComponents/FriendRequests";

// Dynamically import the Call component
const Call = dynamic(() => import("./call"), { ssr: false });
interface Chat {
  _id: string;
  language: string;
  groupPhoto: string;
  users: string[];
}
const AgoraProvider = dynamic(() => import("./provider"), { ssr: false });

const ChatPage = () => {
  const [activeButton, setActiveButton] = useState("friends");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  // const searchParams = useSearchParams();
  // const friendId = searchParams?.get("friend") ?? null; // Directly get 'friend' from searchParams

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  return (
    <section className="overflow-y-auto h-[calc(80vh-4rem)] min-h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green scrollbar-track-gray">
      {/* Header Component */}
      <Header />
      <div className="flex flex-grow">
        {/* Left Box or Communities */}
        {activeButton === "friends" ? (
          <LeftBox activeButton={activeButton} toggleButton={toggleButton} setSelectedChat={setSelectedChat} />
        ) : (
          <Communities
            activeButton={activeButton}
            toggleButton={toggleButton}
          />
        )}
        <div className="flex-1 px-4">
          <AgoraProvider>
            {/* Pass friendId as a prop to Call component */}
          </AgoraProvider>
        </div>
      </div>
      <Footer />
    </section>
  );
  // }
};

export default ChatPage;
