// components/Aboutus.tsx
'use client'
import React, { useState } from 'react'; 
import { IoSearchOutline } from "react-icons/io5";
import { useProfile } from './slaystore';
import UserProfile from './searchresults';


interface User {
  userId: string;
  name: string;
  nativeLanguage: string;
  fluentLanguagess: string[];
  learningLanguagess: string[];
}

const ITEMS_PER_PAGE = 6; // Number of items to show per page

const Aboutus: React.FC = () => {
  const profile = useProfile();
  const id = profile.userId
  const [input, setInput] = useState<string>('');
  const [usersData, setUsersData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const option = 'Native Language';

  //  const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const selectedData = usersData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const fetchUsersData = async () => {
    console.log(profile.userId)
    try {
      const response = await fetch(`/api/getUsers?userId=${profile.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input, option, currentPage }) // Send data in the request body
      });
      {console.log(profile)}
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUsersData(data.users);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handler for button click
  const buttonClicked = (): void => {
    fetchUsersData();
    // Use the `input` state value here
    console.log('Input value:', input);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    fetchUsersData();
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchUsersData();
  };

  return (
    <section id='about' className="relative max-w-full scroll-smooth bg-[#65ad87] bg-opacity-50 py-16 md:py-28 h-auto flex flex-col items-center">
      {/* Search Bar */}
      <div className="flex flex-col justify-center items-center text-center px-6 md:px-12 md:text-left w-full mb-8">
        <div className="relative w-full md:w-6/12 lg:w-2/3">
          <input 
            type="text" 
            className="w-full px-4 py-3 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-white" 
            placeholder="Search on basis of language..." 
            onChange={handleInputChange}
          />
          <IoSearchOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={25} />
          <button 
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-[rgb(101,173,135)] text-white px-5 py-1"
            onClick={buttonClicked}
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {usersData.length > 0 && (
        <div className="max-w-full px-4 py-6">
          <div className="grid gap-4">
            {usersData.map((item) => (
              <UserProfile key={item.userId} user={item} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} {/*of {totalPages}*/}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={handleNextPage}
              // disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <img
          src="/assets/extras/dots.png"
          alt="Dot Image"
          style={{ width: '90.5px', height: '22.5px', objectFit: 'cover' }}
        />
      </div>

      <div className="absolute bottom-0 right-0 mb-4 mr-4">
        <img
          src="/assets/extras/dots.png"
          alt="Dot Image"
          style={{ width: '90.5px', height: '22.5px', objectFit: 'cover' }}
        />
      </div>

      {/* Bottom left image */}
      <img
        src="/assets/extras/bottomleft.png"
        alt="Bottom Left Image"
        className="absolute bottom-0 left-0 h-48 w-48 md:h-40 md:w-30"
      />

      {/* Top right image */}
      <img
        src="/assets/extras/topright.png"
        alt="Top Right Image"
        className="absolute top-0 right-0 h-48 w-48 md:h-40 md:w-30"
      />
    </section>
  );
};

export default Aboutus;
