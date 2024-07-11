import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-[#2D2E2E] py-8 px-4">
      <div className="max-w-container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" >

            <Image src="/assets/extras/Logo Mark.png" alt="logo" width={100} height={50} /> {/* Increased width and height */}
        
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-20 ml-8 mr-8"> {/* Adjusted margins */}
          <Link href="/" passHref>
            <span className="text-lg font-medium hover:text-gray-700 ml-[-0.5rem]">Contact</span>
          </Link>
          <Link href="/about" passHref>
            <span className="text-lg font-medium hover:text-gray-700">Terms Of Use</span>
          </Link>
          <Link href="/offer" passHref>
            <span className="text-lg font-medium hover:text-gray-700">Privacy Policy</span>
          </Link>
          <Link href="/" passHref>
            <span className="text-lg font-medium hover:text-gray-700 ml-[-0.5rem]">FAQ</span>
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mr-6"> {/* Increased space on the right */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="text-[#3A4F39] text-2xl hover:text-gray-200" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-[#3A4F39] text-2xl hover:text-gray-200" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-[#3A4F39] text-2xl hover:text-gray-200" />
          </a>
        </div>
      </div>
      <div className="ml-16"></div>
    </footer>
  );
};

export default Footer;
