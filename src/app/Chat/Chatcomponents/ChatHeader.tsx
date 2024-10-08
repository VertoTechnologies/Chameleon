// app/chatComponents/ChatHeader.tsx

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "@/components/ShadcnComponents/button";
import Link from "next/link";

interface ChatHeaderProps {
  friendId: string | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ friendId }) => {
  const searchParams = useSearchParams();
  const room =  searchParams?.get("chatroom") ?? null;
  const router = useRouter();
  const [friendName, setFriendName] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(
    "/assets/extras/profilepicture.png"
  );
  const handleCallClick = () => {
    console.log("Initiating call...");
    if (friendId) {
      router.push(`/room?room=${room}`); // Pass friendId as a query parameter
    } else {
      console.error("Friend ID is not available");
    }
  };

const viewFriendProfile = () => {
  
}

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const response = await fetch(`/api/userprofile/viewProfile?userId=${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setFriendName(data.name);
        setProfilePic(data.profilePic || "/assets/extras/profilepicture.png");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setFriendName("User not found");
        setProfilePic("/assets/extras/profilepicture.png");
      }
    };

    if (friendId) {
      fetchUser(friendId);
    }
  }, [friendId]);

 const openUserProfile = () => {
  router.push(`/ViewFriendProfile?friend=${friendId}`);
 }

  return (
    <div className="bg-[#F4F4F4] p-4 flex items-center justify-between border-b">
      {/* Left side: Profile picture and friend name */}
      <div className="flex items-center space-x-3">
        <img
          src={profilePic || "/assets/extras/profilepicture.png"}
          className="w-10 h-10 rounded-full border border-gray-300 ml-2"
        />
        <span className="text-mtextra text-lg font-bold align-middle ml-2 cursor-pointer" onClick={openUserProfile}>
        {friendName || "Loading..."}
          
        </span>
      </div>

      {/* Right side: Icons */}
      <div className="flex space-x-4">
        {/*<HiPhone
          className="text-[#65AD87] text-3xl cursor-pointer mr-1"
          title="Voice Call"  
          onClick={handleCallClick} // Adding onClick handler
        />
         <HiVideoCamera className="text-[#65AD87] text-3xl cursor-pointer mr-1" title="Video Call" />*/}
        {/* <Button
          onClick={handleCallClick} // Adding onClick handler
          className="bg-[#65AD87] text-[#ffff]"
          variant="destructive"
        > */}
        <i
          className="bi bi-telephone-plus-fill p-1 pl-1 pr-1 text-2xl bg-transparent bottom-full cursor-pointer mr-1 text-[#65AD87] border-spacing-x-2 rounded"
          onClick={handleCallClick}
          title="Join Call"
        ></i>
        {/* </Button> */}
        <HiDotsHorizontal
          className="text-[#65AD87] text-3xl cursor-pointer mr-1 mt-1"
          title="More Options"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
