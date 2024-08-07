"use client";

import React from "react";
import Image from "next/image";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import { useProfile } from "../stores/UserStore";

const ProfileCard: React.FC = () => {
  const router = useRouter();
  const profile = useProfile();

  const handleEditFile = () => {
    const userId = profile.userId;

    if (!userId) {
      alert("User not found");
      return;
    }

    router.push("/SetupProfile?userId=" + userId);
  };

  return (
    <div className="max-w-96 bg-white rounded-xl overflow-hidden shadow-lg p-6 relative ml-64">
      <div className="flex flex-col items-center mb-4">
      <div className="relative border-2 border-[#9C3B5E] rounded-full" style={{ width: "120px", height: "120px" }}>
        <Image
          className="rounded-full object-cover"
          src={profile.profilePic || "/assets/extras/profilepicture.png"}
          alt="Profile Picture"
          layout="fill"
        />
      </div>

      </div>
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <Image
          src="/assets/extras/dots.png" // Make sure this path is correct
          alt="Decoration"
          width={50}
          height={48}
        />
      </div>
      <div className="border-t border-gray-300 my-4 w-full"></div>
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl mb-2 flex-grow text-center font-inter">
            {profile?.name}
          </h2>
          <div onClick={handleEditFile}>
            <i className="bi bi-pencil-fill cursor-pointer"></i>
          </div>
          
        </div>
        <div>
            <p>Here {profile.purpose === 'both' ? 'to teach and learn' : profile.purpose}</p>
        </div>
        <h3 className="font-bold text-xl mb-2 pt-10 font-inter">
          Description
        </h3>
        <p className="text-black mb-4">{profile?.userDescription}</p>
        <div>
          <h3 className="font-bold text-xl mb-2 pt-10 font-inter">
            Interests
          </h3>
          {profile?.userInterests.join(", ")}
        </div>
        
      </div>
    </div>
  );
};

export default ProfileCard;
