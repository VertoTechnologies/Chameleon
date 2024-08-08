"use client";

import React, { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import "bootstrap-icons/font/bootstrap-icons.css";

interface AddPicProps {
  onImageChange: (imageBase64: string) => void;
  oldImage: string | null;
}

const AddPic: React.FC<AddPicProps> = ({ onImageChange, oldImage }) => {
  const [image, setImage] = useState<string | null>(oldImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String); // Update the displayed image
        onImageChange(base64String); // Pass the base64 string to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 border-2 border-gray-200 bg-[#65AD87] rounded-full flex items-center justify-center text-gray-500 overflow-hidden shadow-md">
        {image && (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        )}
        <input
          type="file"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          onChange={handleImageChange}
        />
        <BiCloudUpload
          className="absolute text-white"
          style={{ fontSize: "2.5rem" }}
        />
      </div>
      <p className="font-source-code font-medium">Add your profile picture</p>
    </div>
  );
};

export default AddPic;
