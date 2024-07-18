// components/RightBox.jsx

import React from 'react';
import { IoSearchSharp } from "react-icons/io5";

const RightBox = () => {
  const suggestedUsers = [
    { name: 'Emily Clark', image: "/assets/extras/profilepicture.png" },
    { name: 'Michael Brown', image: "/assets/extras/profilepicture.png" },
    { name: 'Jessica Taylor', image: "/assets/extras/profilepicture.png" }
  ];

  return (
    <div className="w-1/4 h-screen overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)' }}>
      {/* Suggestions Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center p-4">
        <h1 className="text-mtextra text-lg font-bold mb-2">Suggestions</h1>
          <IoSearchSharp style={{ color: '#7B7D84' }} className="h-7 w-7 mr-3" />
        </div>
        <div className="mt-2 ml-7 mr-5">
          {suggestedUsers.map((user, index) => (
            <div key={index} className={`flex items-center p-4 ${index === 0 ? '' : 'border-t-2'}`} style={{ borderTopColor: '#65AD87' }}>
              <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
              <span className="text-lg font-medium">{user.name}</span>
              <button className="ml-auto mr-4 text-white px-6 py-2" style={{ backgroundColor: '#65AD87', borderRadius: '30px' }}>Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBox;
