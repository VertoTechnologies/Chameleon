// components/Header.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenuComponent from './dropdown';

const Header = () => {
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
      <div className="flex space-x-24 ml-10 mr-10"> {/* Increased space between navigation links */}
        <Link href="/" className="text-lg font-mt-extra text-black hover:text-gray-700">
          Home
        </Link>
        <Link href="/" className="text-lg font-mt-extra text-black hover:text-gray-700">
          Find Friends {/* Adjusted ml to match 92px spacing */}
        </Link>
        <Link href="/" className="text-lg font-mt-extra text-black hover:text-gray-700">
          Communities
        </Link>
      </div>

      {/* Dropdown */}
      
     
      {/* User Avatar Placeholder and Dropdown */}
      <div className="flex items-center ml-8"> {/* Adjusted margin to position avatar and dropdown */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-2">
          <Image src="/assets/extras/profilepicture.png" alt="User Avatar" layout="fill" objectFit="cover" />
        </div>
        <DropdownMenuComponent userName="John Doe" />
      </div>

       
      
    </nav>
  );
}

export default Header;
