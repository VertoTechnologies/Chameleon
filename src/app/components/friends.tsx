'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  userId: string;
  name: string;
  profilePic: string;
}

interface LeftBoxProps {
  activeButton: string;
  toggleButton: (button: string) => void;
}

const LeftBox: React.FC<LeftBoxProps> = ({ activeButton, toggleButton }) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/getUsers');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFriendClick = (userId: string) => {
    router.push(`/Chat?friend=${encodeURIComponent(userId)}`);
  };

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
          Communities
        </button>
      </div>

      {/* Friends List */}
      <div className="mt-4 ml-6 mr-3">
        {users.length > 0 ? (
          users.map((user) => (
            <div 
              key={user.userId} 
              className="flex items-center p-4 border-b-2 cursor-pointer" 
              style={{ borderBottomColor: '#65AD87' }} 
              onClick={() => handleFriendClick(user.userId)}
            >
              <img src={user.profilePic} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
              <span className="text-lg font-medium">{user.name}</span>
            </div>
          ))
        ) : (
          <div className='p-3 border-2 border-white'>
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBox;
