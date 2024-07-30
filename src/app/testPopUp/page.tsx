// Page.tsx

'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button'; // Adjust the import based on your project
import SuggestionPopup from '../components/suggestionsPopUp';
import { useRouter } from 'next/navigation';

interface User {
  userId: string;
  name: string;
  nativeLanguage: string,
  fluentLanguagess: string[],
  learningLanguagess: string[],
  userInterests: string[],
  profilePic: string
}

const Page: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [usersData, setUsersData] = useState<User[]>([]);
  const input = '';
  const option = '';
  const router = useRouter();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`/api/getUsers?userId=${window.localStorage.getItem('userId')}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({input, option}) 
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsersData(data.users);
        console.log(usersData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsersData();
  }, [window.localStorage.getItem('userId')]);

//   const handleButtonClick = () => {
//     setIsPopupOpen(true);
//   };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    router.push('/Dashboard')
  };

  return (
    <div className="p-6">
      {/* <Button 
        type="button"
        variant="outline" 
        className="w-[120px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white"
        onClick={handleButtonClick}
      >
        Save
      </Button> */}

      {/* SuggestionPopup Component */}
      <SuggestionPopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        usersData={usersData} 
      />
    </div>
  );
};

export default Page;
