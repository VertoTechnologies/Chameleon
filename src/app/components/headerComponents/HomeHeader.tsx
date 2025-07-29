// src/components/Header.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenuComponent from './dropdown';
import { useProfile } from "../../stores/UserStore";
import { HiMenu, HiX } from 'react-icons/hi';

const Header: React.FC = () => {
  const profile = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (!profile) {
    return null; 
  }

  return (
    <nav className="bg-[#E7EEEA] border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand Name */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/assets/extras/Logo Mark.png" 
                alt="logo" 
                width={60} 
                height={30} 
                className="sm:w-20 sm:h-10 md:w-24 md:h-12"
              />
              <span className="ml-2 sm:ml-4 font-source-code-pro text-lg sm:text-xl md:text-2xl font-medium tracking-wider text-black">
                CHAMELEON
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12 xl:space-x-16">
            <Link href="/Dashboard" className="text-sm lg:text-lg font text-black hover:text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100">
              Home
            </Link>
            <Link href="/SuggestionPage" className="text-sm lg:text-lg font text-black hover:text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100">
              Explore
            </Link>
            <Link href="/Explore" className="text-sm lg:text-lg font text-black hover:text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100">
              Find
            </Link>
          </div>

          {/* Desktop User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden">
              <Image 
                src={profile.profilePic || '/assets/extras/profilepicture.png'} 
                alt="User Avatar" 
                fill
                className="object-cover"
              />
            </div>
            <DropdownMenuComponent userName={profile.name} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#65AD87] transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#E7EEEA] border-t border-gray-200 shadow-lg z-40">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Navigation Links */}
            <Link 
              href="/Dashboard" 
              className="block text-base font text-black hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/SuggestionPage" 
              className="block text-base font text-black hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
              onClick={closeMenu}
            >
              Explore
            </Link>
            <Link 
              href="/Explore" 
              className="block text-base font text-black hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
              onClick={closeMenu}
            >
              Find
            </Link>
            
            {/* Mobile User Profile */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image 
                    src={profile.profilePic || '/assets/extras/profilepicture.png'} 
                    alt="User Avatar" 
                    fill
                    className="object-cover"
                  />
                </div>
                <DropdownMenuComponent userName={profile.name} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
