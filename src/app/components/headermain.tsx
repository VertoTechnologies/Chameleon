// components/Header.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenuComponent from './dropdown';
import { useProfile } from "./slaystore";
const Header = () => {
 const profile = useProfile()
  return (
    <nav className="flex items-center justify-between max-w-container px-4 py-5 relative z-30">
      {/* Logo and Brand Name */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/assets/extras/Logo Mark.png" alt="logo" width={100} height={50} /> {/* Increased width and height */}
        </Link>
        <div className="cursor-pointer ml-4">
          <span className="ml-2 font-source-code-pro text-2xl font-medium tracking-wider">CHAMELEON</span> {/* Increased size and letter-spacing */}
        </div>
      </div>
      
      {/* Navigation Links */}
      <div className="flex space-x-32 ml-14 "> {/* Increased space between navigation links */}
        <Link href="/Dashboard" className="text-lg font-mt-extra text-black hover:text-gray-700">
          Home
        </Link>
        <Link href="/" className="text-lg font-mt-extra text-black hover:text-gray-700">
          About us {/* Adjusted ml to match 92px spacing */}
        </Link>
        <Link href="/Explore" className="text-lg font-mt-extra text-black hover:text-gray-700">
          Explore
        </Link>
      </div>

      {/* Dropdown */}
      
     
      {/* User Avatar Placeholder and Dropdown */}
      <div className="flex items-center ml-8 mr-4"> {/* Adjusted margin to position avatar and dropdown */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-2">
          <Image src="/assets/extras/profilepicture.png" alt="User Avatar" layout="fill" objectFit="cover" />
        </div>
        <DropdownMenuComponent userName={profile.name} />
      </div>

       
      
    </nav>
  );
}

export default Header;
