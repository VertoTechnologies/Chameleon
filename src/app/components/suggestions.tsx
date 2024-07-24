// components/RightBox.jsx

'use client'
import React, { useEffect, useState } from 'react';
import FriendButton from './friendbutton';
import { IoSearchSharp } from "react-icons/io5";

// Define the User type
interface User {
  userId: string;
  name: string;
}

const RightBox: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`/api/getUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsersData(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsersData();
  }, []);

  return (
    <div className="w-1/4 h-screen overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)' }}>
      {/* Suggestions Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center p-4">
        <h1 className="text-mtextra text-lg font-bold mb-2">Suggestions</h1>
          <IoSearchSharp style={{ color: '#7B7D84' }} className="h-7 w-7 mr-3" />
        </div>
        <div className="mt-2 ml-7 mr-5">
        {usersData.length > 0 ? (
          <div>
            {usersData.map((user, index) => (
              <div key={user.userId} className={`flex items-center p-4 ${index === 0 ? '' : 'border-t-2'}`} style={{ borderTopColor: '#65AD87' }}>
                <img src={'/assets/extras/profilepicture.png'} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
                <span className="text-lg font-medium">{user.name}</span>
                <div className= 'flex justify-end w-full'><FriendButton id = {user.userId}></FriendButton></div>
                
              </div>
            ))}
          </div>
        ) : (
          <div className='p-3 border-2 border-white'>
            No users found
          </div>
        )}
        {/* Add more content here */}
      </div>
        </div>
      </div>
      
    
  );
};

export default RightBox;
