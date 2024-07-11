// components/ContactPopup.tsx

'use client'
import React from 'react';
import { FaTimes, FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-600">
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-green-600">Contact Us</h2>
        <div className="flex items-center mb-4">
          <FaPhoneAlt className="text-gray-700 text-2xl mr-2" />
          <p className="text-gray-700">+1 234 567 890</p>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-gray-700 text-2xl mr-2" />
          <p className="text-gray-700">contact@example.com</p>
        </div>
        <div className="flex items-center mb-4">
          <FaLinkedin className="text-gray-700 text-2xl mr-2" />
          <p className="text-gray-700">LinkedIn Profile</p>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-700 text-2xl mr-2" />
          <p className="text-gray-700">123 Main Street, City, Country</p>
        </div>
        <button onClick={onClose} className="w-full bg-[#65AD87] text-white py-2 rounded hover:bg-green-600 mt-4">
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default ContactPopup;
