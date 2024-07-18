// components/FAQPopup.tsx

import React, { useState } from 'react';
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FAQPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQPopup: React.FC<FAQPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards and PayPal for payments.',
    },
    {
      question: 'How can I reset my password?',
      answer: 'You can reset your password through the Forgot Password link on the login page.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 30-day free trial for new users.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription through the Account Settings page.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes, you can upgrade your plan at any time through the Subscription section.',
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes, we provide 24/7 customer support via email and live chat.',
    },
    {
      question: 'Where can I find the mobile app?',
      answer: 'Our mobile app is available for download on iOS and Android devices.',
    },
    {
      question: 'How secure is my data?',
      answer: 'We use industry-standard encryption and security protocols to protect your data.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

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
        <h2 className="text-xl font-bold mb-4 text-center text-green-600">FAQs</h2>
        <div className="mb-4 text-gray-700">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(index)}>
                <p className="font-bold">{faq.question}</p>
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {activeIndex === index && (
                <div className="mt-2">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQPopup;
