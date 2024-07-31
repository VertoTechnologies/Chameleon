"use client";

import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
interface AddPicProps {
  onImageChange: (imageBase64: string) => void;
  oldImage: string | null;
}
const AddPic: React.FC<AddPicProps> = ({ onImageChange, oldImage }) => {
  const [image, setImage] = useState<string | null>(oldImage);

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          if (reader.result) {
            setImage(reader.result.toString());
            onImageChange(base64String);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-36 h-36 border-2 border-gray-200 bg-[#65AD87] rounded-full flex items-center justify-center text-gray-500 relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <>
            <input
              type="file"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleImageChange}
            />
            <i className="bi bi-upload text-2xl"></i>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPic;
