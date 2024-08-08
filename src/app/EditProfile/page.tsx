'use client'
import React, { useState } from "react";
import Popup from "./editpopup";

const EditProfile: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <button onClick={openPopup}>Edit Profile</button>
      {isPopupOpen && <Popup />}
    </div>
  );
};

export default EditProfile;
