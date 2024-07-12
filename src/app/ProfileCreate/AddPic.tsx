'use client'

import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddPic: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-36 h-36 border-2 border-gray-200 bg-[#65AD87] rounded-full flex items-center justify-center text-gray-500 relative overflow-hidden">
        {image ? (
          <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
          <>
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" 
              onChange={handleImageUpload} 
            />
            <i className="bi bi-upload text-2xl"></i>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPic;
