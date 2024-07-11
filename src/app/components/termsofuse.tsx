// components/TermsOfUsePopup.tsx

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TermsOfUsePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void; // Function to handle agree action
}

const TermsOfUsePopup: React.FC<TermsOfUsePopupProps> = ({ isOpen, onClose, onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAgree = () => {
    if (isChecked) {
      onAgree();
      onClose();
    }
  };

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
        <h2 className="text-xl font-bold mb-4 text-center text-green-600">Terms of Service</h2>
        <div className="mb-4 text-gray-700">
          <div className="mb-4">
            <p className="font-bold">1. Acceptance of Terms</p>
            <p>
              By using Chameleon, you agree to these terms. If you do not agree, do not use our app.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">2. Eligibility</p>
            <p>
              Users must be 18 or older.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">3. User Accounts</p>
            <p>
              Registration: Provide accurate information and keep your account secure.
            </p>
            <p>
              Termination: We may suspend or terminate accounts for violations.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">4. User Conduct</p>
            <p>
              Compliance: Follow all laws and respect other users.
            </p>
            <p>
              Content: Do not post offensive or infringing content.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">5. Intellectual Property</p>
            <p>
              All app content is owned by Chameleon or its licensors.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">6. Disclaimer of Warranties</p>
            <p>
              Chameleon is provided "as is." We do not guarantee uninterrupted or error-free service.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">7. Limitation of Liability</p>
            <p>
              We are not liable for indirect, incidental, or consequential damages.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">8. Indemnification</p>
            <p>
              You agree to indemnify Chameleon from any claims arising from your use of the app.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">9. Governing Law</p>
            <p>
              These terms are governed by the laws of the Government of Pakistan.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">10. Changes to These Terms</p>
            <p>
              We may update these terms. Significant changes will be posted on our app.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">11. Contact Us</p>
            <p>
              Questions? Contact us at <a href="mailto:contact.vertotech@gmail.com">contact.vertotech@gmail.com</a>.
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="agree"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-gray-700">I agree to the Terms of Service</label>
        </div>
        <button
          onClick={handleAgree}
          disabled={!isChecked}
          className={`mt-4 w-full py-2 rounded-lg ${isChecked ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Agree
        </button>
      </motion.div>
    </div>
  );
};

export default TermsOfUsePopup;
