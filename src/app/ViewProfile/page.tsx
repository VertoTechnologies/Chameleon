"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/headerComponents/HomeHeader";
import Footer from "@/app/components/footerComponents/footer";
import ViewProfile from "./ViewProfile";
import BackgroundImage from "./Topbacground";
import withAuth from "../components/authComponents/withAuth";
import EditProfilePopup from "../EditProfile/EditProfilePopUp";

const Page: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const router = useRouter();

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    router.refresh();
  };

  return (
    <div className="rounded-4xl relative overflow-hidden">
      <Header />
      <div className="relative">
        <BackgroundImage />
        <div className="relative -mt-32 z-10 flex justify-center">
          <ViewProfile onEditClick={handleOpenPopup} />
        </div>
      </div>
      

      {isPopupVisible && (
        <div className="fixed top-5 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-60">
          <EditProfilePopup onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
};

export default withAuth(Page);