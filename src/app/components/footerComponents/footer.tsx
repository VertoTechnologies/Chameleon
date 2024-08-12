'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import ContactPopup from './ContactPopup'; // Import the ContactPopup component
import TermsOfUsePopup from './termsofuse';
import PrivacyPolicyPopup from './privacy';
import FAQPopup from './FAQ'; // Import the FAQPopup component

const Footer = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false); // State for ContactPopup visibility
  const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false); // State for TermsOfUsePopup visibility
  const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false); // State for PrivacyPolicyPopup visibility
  const [isFAQPopupOpen, setIsFAQPopupOpen] = useState(false); // State for FAQPopup visibility

  const openContactPopup = () => {
    setIsContactPopupOpen(true);
  };

  const closeContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  const openTermsPopup = () => {
    setIsTermsPopupOpen(true);
  };

  const closeTermsPopup = () => {
    setIsTermsPopupOpen(false);
  };

  const openPrivacyPopup = () => {
    setIsPrivacyPopupOpen(true);
  };

  const closePrivacyPopup = () => {
    setIsPrivacyPopupOpen(false);
  };

  const openFAQPopup = () => {
    setIsFAQPopupOpen(true);
  };

  const closeFAQPopup = () => {
    setIsFAQPopupOpen(false);
  };

  const handleAgree = () => {
    console.log("User agreed to the terms of service");
    // Additional actions on agreement can be handled here
  };

  return (
    <footer className="bg-white text-[#2D2E2E] py-6 px-4">
      <div className="max-w-container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" >

            <Image src="/assets/extras/Logo Mark.png" alt="logo" width={100} height={50} /> {/* Increased width and height */}
        
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-20 ml-8 mr-8"> {/* Adjusted margins */}
        <span className="text-lg font-medium hover:text-gray-700 ml-[-0.5rem]" onClick={openContactPopup} style={{ cursor: 'pointer' }}>Contact</span>
          <span className="text-lg font-medium hover:text-gray-700 ml-[-0.5rem]" onClick={openTermsPopup} style={{ cursor: 'pointer' }}>Terms Of Use</span>
          {/* Replace placeholder href with actual URLs */}
          <span className="text-lg font-medium hover:text-gray-700 ml-[-0.5rem]" onClick={openPrivacyPopup} style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span className="text-lg font-medium hover:text-gray-700 ml-[-0.5rem]" onClick={openFAQPopup} style={{ cursor: 'pointer' }}>FAQ</span>
        </div>
        

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <Link href="https://facebook.com">
            <FaFacebookF className="text-gray-600 hover:text-gray-800" />
          </Link>
          <Link href="https://instagram.com">
            <FaInstagram className="text-gray-600 hover:text-gray-800" />
          </Link>
          <Link href="https://twitter.com">
            <FaTwitter className="text-gray-600 hover:text-gray-800" />
          </Link>
        </div>
      </div>
        {/* ContactPopup */}
        {isContactPopupOpen && (
        <ContactPopup isOpen={isContactPopupOpen} onClose={closeContactPopup} />
      )}

      {/* TermsOfUsePopup */}
      {isTermsPopupOpen && (
        <TermsOfUsePopup isOpen={isTermsPopupOpen} onClose={closeTermsPopup} onAgree={handleAgree} />
      )}

      {/* PrivacyPolicyPopup */}
      {isPrivacyPopupOpen && (
        <PrivacyPolicyPopup isOpen={isPrivacyPopupOpen} onClose={closePrivacyPopup} />
      )}

      {/* FAQPopup */}
      {isFAQPopupOpen && (
        <FAQPopup isOpen={isFAQPopupOpen} onClose={closeFAQPopup} />
      )}
    </footer>
  );
};

export default Footer;
