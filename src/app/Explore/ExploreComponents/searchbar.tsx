// components/Aboutus.tsx
'use client'
import React, { useEffect, useState, useRef } from 'react'; 
import { IoSearchOutline } from "react-icons/io5";
import { useProfile } from '@/app/stores/UserStore';
import UserProfile from './searchresults';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ShadcnComponents/select";

interface User {
  userId: string;
  name: string;
  nativeLanguage: string;
  fluentLanguagess: string[];
  learningLanguagess: string[];
  profilePic: string
}

const Searchbar: React.FC = () => {
  const profile = useProfile();
  const id = profile.userId
  const [input, setInput] = useState<string>('');
  const [usersData, setUsersData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [option, setOption] = useState<string>('Name');
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleSelectChange = (value: string) => {
    setOption(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission
      fetchUsersData(); // Trigger the search
      setCurrentPage(1);
    }
  };

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/searchAndSuggestUsers?userId=${profile.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input.toLowerCase, option, currentPage }) // Send data in the request body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUsersData(data.users);
      setTotalCount(data.totalCountF);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handler for button click
  const buttonClicked = (): void => {
    fetchUsersData();
    setCurrentPage(1);
    console.log('Input value:', input);
  };

  useEffect(() => {
    if (currentPage !== 0) {
      fetchUsersData();
    }
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage<((totalCount/4))) setCurrentPage(currentPage + 1);
    
  };

  return (
    <section id='about' className="relative max-w-full scroll-smooth bg-[#65ad87] bg-opacity-50 py-16 md:py-28 h-auto flex flex-col items-center">
      {/* Search Bar */}
      <div className="flex flex-col justify-center items-center text-center px-6 md:px-12 md:text-left w-full mb-8">
        <div className="relative w-full md:w-6/12 lg:w-2/3" ref={inputRef}>
          <input 
            type="text" 
            className="w-full px-4 py-3 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-white" 
            placeholder="Search on basis of language..." 
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <IoSearchOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={25} />
          <button 
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-[rgb(101,173,135)] text-white px-5 py-1"
            onClick={buttonClicked}
          >
            Search
          </button>
        </div>
        <Select onValueChange={(value) => handleSelectChange(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a Filter" />
  </SelectTrigger>
  <SelectContent>
  <SelectItem value="Name">Name</SelectItem>
    <SelectItem value="Native Language">Native Language</SelectItem>
    <SelectItem value="Fluent Language">Fluent Language</SelectItem>
    <SelectItem value="Learning Language">Learning Language</SelectItem>
  </SelectContent>
</Select>
      </div>

      {/* Search Results */}
      {loading ? (
        <div className='p-3'>
          <Skeleton
            height={300}
            width={900}
            enableAnimation={true}
            baseColor="rgba(101, 173, 135, 0.2)"
            highlightColor="rgba(101, 173, 135, 0.4)"
            direction="ltr"
          />
        </div>
      ) : (
        usersData.length > 0 && (
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
                Page {currentPage}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          </div>
        )
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

export default Searchbar;