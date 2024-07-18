// components/Communities.tsx

import React from 'react';

interface CommunitiesProps {
  activeButton: string;
  toggleButton: (button: string) => void;
}

const Communities: React.FC<CommunitiesProps> = ({ activeButton, toggleButton }) => {
    const communitiesList = [
        { name: 'Urdu', image:'/assets/extras/French.png'},
        { name: 'French', image:'/assets/extras/French.png'},
        { name: 'English', image:'/assets/extras/French.png'},
        { name: 'German', image:'/assets/extras/French.png'},
        { name: 'Hindi', image:'/assets/extras/French.png'}
      ];
  return (
    <div className="w-1/4 h-screen overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)', boxShadow: '5px 4px 10px rgba(5, 5, 0, 0.5)' }}>
      {/* Toggle Buttons */}
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
          Communities
        </button>
      </div>

      {/* Friends List */}
      <div className="mt-4 ml-7">
  {communitiesList.map((community, index) => (
    <div key={index} className="flex items-center p-4 border-b-2" style={{ borderBottomColor: '#65AD87' }}>
      <img src={community.image} alt={community.name} className="w-12 h-12 rounded-md mr-3" />
      <span className="text-lg font-medium">{community.name}</span>
    </div>
  ))}
</div>

    </div>
  );
};

export default Communities;
