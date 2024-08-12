import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaBell, FaRegBell } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, width = '400px' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [theme, setTheme] = useState<'default' | 'custom'>('default');

  useEffect(() => {
    // Apply initial theme from local storage or default
    const storedTheme = localStorage.getItem('theme') as 'default' | 'custom' | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply Dark Mode styles
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Adjust brightness when Dark Mode is enabled
    if (isDarkMode && theme === 'custom') {
      document.documentElement.style.setProperty('--brightness', '0.5'); 
    } else {
      document.documentElement.style.removeProperty('--brightness');
    }
  }, [isDarkMode, theme]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);

    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    localStorage.setItem('notificationsEnabled', JSON.stringify(!notificationsEnabled));
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'default' ? 'custom' : 'default';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!isOpen) return null; // Return nothing if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div
        className="relative bg-white rounded-lg shadow-lg"
        style={{ width }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Settings</h3>
          <button
            className="text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Dark/Light Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Dark Mode</span>
            <button
              onClick={handleDarkModeToggle}
              className="flex items-center space-x-2 text-gray-600"
            >
              {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
              <span>{isDarkMode ? 'Enabled' : 'Disabled'}</span>
            </button>
          </div>

          {/* Notification Settings */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Enable Notifications</span>
            <button
              onClick={handleNotificationsToggle}
              className="flex items-center space-x-2 text-gray-600"
            >
              {notificationsEnabled ? <FaBell className="text-green-500" /> : <FaRegBell className="text-gray-500" />}
              <span>{notificationsEnabled ? 'Enabled' : 'Disabled'}</span>
            </button>
          </div>

          {/* Theme Selection */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Theme</span>
            <button
              onClick={handleThemeChange}
              className="flex items-center space-x-2 text-gray-600"
            >
              {theme === 'custom' ? <MdCheckBox className="text-blue-500" /> : <MdCheckBoxOutlineBlank className="text-gray-500" />}
              <span>{theme === 'custom' ? 'Custom' : 'Default'}</span>
            </button>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
