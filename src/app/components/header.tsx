// components/Header.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="flex items-center justify-between max-w-container px-4 py-5 relative z-30">
      {/* Logo and Brand Name */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/assets/extras/Logo Mark.png" alt="logo" width={100} height={50} /> {/* Increased width and height */}
        </Link>
        <div className="cursor-pointer ml-4">
          <span className="ml-2 font-source-code-pro text-2xl font-medium tracking-wider mr-10">CHAMELEON</span> {/* Increased size and letter-spacing */}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-16 ml-8 mr-8"> {/* Increased space between navigation links */}
        <Link href="/" className="text-lg font-mt-extra text-black hover:text-gray-700">
          Home
        </Link>
        <Link href="/about" className="text-lg font-mt-extra text-black hover:text-gray-700">
          About Us {/* Adjusted ml to match 92px spacing */}
        </Link>
        <Link href="/offer" className="text-lg font-mt-extra text-black hover:text-gray-700">
          What We Offer
        </Link>
      </div>

      {/* Sign Up and Sign In Buttons */}
      <div className="flex space-x-4">
        <Link href="/Login">
          <button className="px-5 py-2 border border-black text-black font-normal rounded-full hover:bg-gray-200">
            Sign In
          </button>
        </Link>
        <Link href="/SignUp">
          <button className="px-5 py-2 bg-[#65AD87] text-white font-normal rounded-full hover:bg-[#569A74]">
            Sign Up
          </button>
        </Link>
        <div className="ml-8"></div> {/* Increased space at the end */}
      </div>
    </nav>
  );
}

export default Header;
