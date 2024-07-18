// components/LeftBox.tsx

import React from 'react';

interface LeftBoxProps {
  activeButton: string;
  toggleButton: (button: string) => void;
}

const LeftBox: React.FC<LeftBoxProps> = ({ activeButton, toggleButton }) => {
  return (
    <div className="w-1/4 h-screen overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)' }}>
      {/* Toggle Buttons */}
      <div className="p-4">
        <button
          className={`p-2 rounded-full border-none ${activeButton === 'friends' ? 'bg-custom-green text-white' : 'bg-white text-black'}`}
          style={{ backgroundColor: activeButton === 'friends' ? '#65AD87' : 'transparent', borderRadius: '30px' }}
          onClick={() => toggleButton('friends')}
        >
          Friends
        </button>
        <button
          className={`p-2 rounded-full border-none ${activeButton === 'community' ? 'bg-custom-green text-white' : 'bg-white text-black'}`}
          style={{ backgroundColor: activeButton === 'community' ? '#65AD87' : 'transparent', borderRadius: '30px' }}
          onClick={() => toggleButton('community')}
        >
          Community
        </button>
      </div>
    </div>
  );
};

export default LeftBox;
