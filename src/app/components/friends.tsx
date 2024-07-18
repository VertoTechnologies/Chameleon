import React from 'react';

interface LeftBoxProps {
  activeButton: string;
  toggleButton: (button: string) => void;
}

const LeftBox: React.FC<LeftBoxProps> = ({ activeButton, toggleButton }) => {
  const friendsList = [
    { name: 'John Doe', image: "/assets/extras/profilepicture.png" },
    { name: 'Jane Smith', image: "/assets/extras/profilepicture.png" },
    { name: 'Alice Johnson', image: "/assets/extras/profilepicture.png" }
  ];

  return (
    <div className="w-1/4 h-screen overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)' }}>
      <div className="p-4 flex mt-4 ml-7">
        <button
          className={`px-10 py-2 rounded-full border-none ${activeButton === 'friends' ? 'bg-custom-green text-white shadow-2xl' : 'bg-white text-black shadow'}`}
          style={{ 
            backgroundColor: activeButton === 'friends' ? '#65AD87' : 'white', 
            borderRadius: '30px', 
            marginRight: '-15px',
            boxShadow: activeButton === 'friends' ? '5px 4px 10px rgba(5, 5, 0, 0.5)' : 'none' 
          }}
          onClick={() => toggleButton('friends')}
        >
          Friends
        </button>
        <button
          className={`px-9 py-2 rounded-full border-none ${activeButton === 'community' ? 'bg-custom-green text-white shadow-2xl' : 'bg-white text-black shadow'}`}
          style={{ 
            backgroundColor: activeButton === 'community' ? '#65AD87' : 'white', 
            borderRadius: '30px', 
            zIndex: 1, 
            position: 'relative', 
            left: '-15px',
            boxShadow: activeButton === 'community' ? '5px 4px 10px rgba(5, 5, 0, 0.5)' : 'none'
          }}
          onClick={() => toggleButton('community')}
        >
          Community
        </button>
      </div>

      {/* Friends List */}
      <div className="mt-4 ml-7">
        {friendsList.map((friend, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b-2 border-blue-900">
            <img src={friend.image} alt={friend.name} className="w-12 h-12 rounded-full mr-4" />
            <span className="text-lg font-medium">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBox;
