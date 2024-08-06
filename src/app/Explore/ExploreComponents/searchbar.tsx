'use client';
import React, { useEffect, useState, useRef } from 'react'; 
import { IoSearchOutline } from "react-icons/io5";
import { useProfile } from '@/app/stores/UserStore';
import UserProfile from './searchbox';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaUser, FaLanguage, FaGlobe, FaBook, FaCheck } from 'react-icons/fa';

// Define the User type
interface User {
  userId: string;
  name: string;
  nativeLanguage: string;
  fluentLanguagess: string[];
  learningLanguagess: string[];
  profilePic: string;
  userInterests: string[];
  purpose: string;
}

// SearchBar Component
const SearchBar: React.FC<{ 
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void; 
  buttonClicked: () => void; 
  handleSelectChange: (value: string) => void;
}> = ({ handleInputChange, handleKeyDown, buttonClicked, handleSelectChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('Name'); // Default to 'Name'

  const handleFilterClick = (filter: string) => {
    const newFilter = filter === selectedFilter ? null : filter;
    setSelectedFilter(newFilter || 'Name'); // Default to 'Name' if filter is null
    handleSelectChange(newFilter || 'Name');
  };

  return (
    <section id='searchbar' className="relative max-w-full scroll-smooth bg-[#65ad87] bg-opacity-50 py-12 md:py-14 h-auto flex flex-col items-center">
      {/* Search Bar */}
      <div className="flex flex-col justify-center items-center text-center px-6 md:px-12 md:text-left w-full mb-8">
        <div className="relative w-full md:w-6/12 lg:w-2/3" ref={inputRef}>
          <input 
            type="text" 
            className="w-full px-4 py-3 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-white rounded-lg" 
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
        <div className="flex flex-wrap gap-2 mt-7">
          {[  'Native Language', 'Fluent Language', 'Learning Language'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                selectedFilter === filter
                  ? 'bg-[#B2EBF2] text-[#004D40] border border-[#004D40]'
                  : 'bg-[#E0F7FA] text-[#00796B]'
              }`}
            >
              {selectedFilter === filter && <FaCheck className="text-[#004D40]" />}
             
              {filter === 'Native Language' && <FaGlobe />}
              {filter === 'Fluent Language' && <FaLanguage />}
              {filter === 'Learning Language' && <FaBook />}
              
              {filter}
            </button>
          ))}
        </div>
      </div>

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
        className="absolute bottom-0 left-0 h-40 w-48 md:h-32 md:w-30"
      />

      {/* Top right image */}
      <img
        src="/assets/extras/topright.png"
        alt="Top Right Image"
        className="absolute top-0 right-0 h-40 w-48 md:h-32 md:w-30"
      />
    </section>
  );
};

// SearchResults Component
// SearchResults Component
const SearchResults: React.FC<{ 
  usersData: User[], 
  handlePrevPage: () => void, 
  handleNextPage: () => void, 
  currentPage: number, 
  totalCount: number 
}> = ({ usersData, handlePrevPage, handleNextPage, currentPage, totalCount }) => {
  // Calculate total pages based on total count and items per page (assuming 4 items per page)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="flex flex-col items-center p-4 bg-[rgb(101,173,135,0.2)] rounded-lg shadow-lg ">
      {/* Display user profiles */}
      <div className="grid gap-4">
        {usersData.map((item) => (
          <UserProfile key={item.userId} user={item} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-[#65AD87] text-white rounded-lg"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-[#65AD87] text-white rounded-lg"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Main Component
const SearchSection: React.FC = () => {
  const profile = useProfile();
  const id = profile.userId;
  const [input, setInput] = useState<string>('');
  const [usersData, setUsersData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [option, setOption] = useState<string>('Name');

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
    }
  };

  const fetchUsersData = async () => {
    try {
      const response = await fetch(`/api/users/searchAndSuggestUsers?userId=${profile.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, option, currentPage })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUsersData(data.users);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const buttonClicked = (): void => {
    fetchUsersData();
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalCount / 4)) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (currentPage !== 0) {
      fetchUsersData();
    }
  }, [currentPage]);

  return (
    <section id='about' >
      <SearchBar 
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        buttonClicked={buttonClicked}
        handleSelectChange={handleSelectChange}
      />
      <SearchResults 
        usersData={usersData} 
        handlePrevPage={handlePrevPage} 
        handleNextPage={handleNextPage} 
        currentPage={currentPage} 
        totalCount={totalCount} 
      />
    </section>
  );
};

export default SearchSection;
