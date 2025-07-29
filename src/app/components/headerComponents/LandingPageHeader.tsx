// components/Header.tsx

'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative bg-[#E7EEEA] border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
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
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link href="/" className="text-sm lg:text-lg font-mt-extra text-black hover:text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100">
              Home
            </Link>
            <Link href="/#about" className="text-sm lg:text-lg font-mt-extra text-black hover:text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100">
              About Us
            </Link>
            <Link href="/#offer" className="text-sm lg:text-lg font-mt-extra text-black hover:text-gray-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100">
              What We Offer
            </Link>
          </div>

          {/* Desktop Sign Up and Sign In Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Link href="/Login">
              <button className="px-4 lg:px-5 py-2 border border-black text-black font-normal text-sm lg:text-base rounded-full hover:bg-gray-200 transition-colors duration-200">
                Sign In
              </button>
            </Link>
            <Link href="/SignUp">
              <button className="px-4 lg:px-5 py-2 bg-[#65AD87] text-white font-normal text-sm lg:text-base rounded-full hover:bg-[#569A74] transition-colors duration-200">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#65AD87] transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
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
              href="/" 
              className="block text-base font-mt-extra text-black hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/#about" 
              className="block text-base font-mt-extra text-black hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              href="/#offer" 
              className="block text-base font-mt-extra text-black hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
              onClick={closeMenu}
            >
              What We Offer
            </Link>
            
            {/* Mobile Sign Up and Sign In Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-200">
              <Link href="/Login" onClick={closeMenu}>
                <button className="w-full px-4 py-2 border border-black text-black font-normal rounded-full hover:bg-gray-200 transition-colors duration-200">
                  Sign In
                </button>
              </Link>
              <Link href="/SignUp" onClick={closeMenu}>
                <button className="w-full px-4 py-2 bg-[#65AD87] text-white font-normal rounded-full hover:bg-[#569A74] transition-colors duration-200">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;