// components/PrivacyContentPopup.tsx

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PrivacyContentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyContentPopup: React.FC<PrivacyContentPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-96 overflow-y-auto relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-600 z-10">
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-green-600">Privacy Policy</h2>
        <div className="mb-4 text-gray-700">
          <div className="mb-4">
            <p className="font-bold">1. Introduction</p>
            <p>
              Welcome to Chameleon! We value your privacy and are committed to protecting your personal information.
              This Privacy Policy outlines how we collect, use, and protect your data.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">2. Information We Collect</p>
            <p>
              Personal Information: Name, email, date of birth, profile description, language preferences, and interests.
            </p>
            <p>
              Usage Data: This data is used for personalised use of the application such as recommending friends and helping you find communities.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">3. How We Use Your Information</p>
            <p>
              To Provide Services: Facilitate language exchanges and manage user accounts.
            </p>
            <p>
              To Improve Services: Analyse usage data to enhance the app.
            </p>
            <p>
              To Communicate: Send updates and promotional materials.
            </p>
            <p>
              To Ensure Safety: Monitor and prevent fraudulent or harmful activities.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">4. Sharing Your Information</p>
            <p>
              We do not sell your personal information. We may share data with service providers or as required by law.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">5. Data Security</p>
            <p>
              We implement robust security measures to protect your personal information, though no method is 100% secure.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">6. Your Rights</p>
            <p>
              You can request to access, update, delete, or object to the processing of your personal information.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">7. Age Restriction</p>
            <p>
              Chameleon is for users aged 18 and older. We do not knowingly collect data from those under 18.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">8. Changes to This Policy</p>
            <p>
              We may update this policy. Significant changes will be posted on our app with the updated effective date.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">9. Contact Us</p>
            <p>
              Questions or concerns? Contact us at <a href="mailto:contact.vertotech@gmail.com">contact.vertotech@gmail.com</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyContentPopup;
