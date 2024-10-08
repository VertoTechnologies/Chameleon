import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

interface FriendActionsDropdownProps {
  onLeave: () => void;
}

const FriendActionsDropdown: React.FC<FriendActionsDropdownProps> = ({ onLeave }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button 
        onClick={toggleDropdown} 
        className="text-[#65AD87] focus:outline-none"
      >
        <HiDotsVertical size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg" style={{ zIndex: 1000 }}>
          <button
            onClick={onLeave}
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
          >
            Leave Hub
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendActionsDropdown;