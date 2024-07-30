import React from 'react';
import { IoPersonAdd, IoClose } from "react-icons/io5";
import FriendButton from './friendbutton';

interface User {
    userId: string;
    name: string;
    nativeLanguage: string,
    fluentLanguagess: string[],
    learningLanguagess: string[],
    userInterests: string[],
    profilePic: string
  }
  
interface SuggestionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  usersData: User[];
}

const SuggestionPopup: React.FC<SuggestionPopupProps> = ({ isOpen, onClose, usersData }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50" 
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="bg-white w-[90%] max-w-6xl rounded-lg p-6 relative h-[55vh]">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" 
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#65AD87] text-center">Connect with your First Language Buddy!</h2>
        <div className="overflow-x-auto flex space-x-5 pb-4" style={{ maxHeight: '50vh' }}>
          {usersData.map((suggestion, index) => (
            <div 
              key={index} 
              className="flex-none w-[300px] bg-white rounded-lg shadow-md border border-gray-200 p-4 relative h-full flex flex-col justify-between"
              style={{ flex: '0 0 auto' }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={suggestion.profilePic} 
                  alt={suggestion.name} 
                  className="w-16 h-16 rounded-full border-4 border-[#65AD87]"
                />
                <p className="font-semibold text-lg ml-4">{suggestion.name}</p>
              </div>
              <div className="flex flex-col items-start flex-grow space-y-1">
                <p className="text-sm mt-2">Native: {suggestion.nativeLanguage}</p>
                <p className="text-sm mt-2">Fluent: {suggestion.fluentLanguagess.join(', ')}</p>
                <p className="text-sm mt-2">Learning: {suggestion.learningLanguagess.join(', ')}</p>
                
                <div className="mt-4 flex space-x-2 overflow-x-auto " style={{ maxHeight: '30px' }}>
                  {suggestion.userInterests.map((interest, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[#E0F7FA] text-[#00796B] rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap mt-2"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className= 'bg-[#65AD87] pl-3 text-white font-semibold rounded-full hover:bg-[#4E8C6A] transition-colors mt-4 self-end'>
                <FriendButton id = {window.localStorage.getItem('userId')}></FriendButton>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionPopup;