// components/Aboutus.tsx
'use client'
import React from 'react'; 
import { IoSearchOutline } from "react-icons/io5";
import Link from 'next/link';

const Aboutus = () => {
  return (
    <section id='about' className="relative max-w-full scroll-smooth bg-[#65ad87] bg-opacity-50 py-16 md:py-28 h-auto flex flex-row justify-center items-center">
     {/* Search Bar */}
     <div className="flex flex-col justify-center items-center text-center px-6 md:px-12 md:text-left w-full">
        <div className="relative w-full md:w-6/12 lg:w-2/3">
          <input 
            type="text" 
            className="w-full px-4 py-3 pl-10  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-white" 
            placeholder="Search on basis of language..." 
          />
          <IoSearchOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={25} />
          <button 
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-[rgb(101,173,135)] text-white px-5 py-1"
            onClick={() => alert('Search button clicked')}
          >
            Search
          </button>
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
