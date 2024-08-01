// components/DropdownMenu.jsx
'use client'

// components/DropdownMenu.jsx
// components/DropdownMenu.jsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { IoIosSettings, IoIosLogOut, IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import useUserProfileStore, { useProfile } from "@/app/stores/UserStore"
import Settings from './settings';

interface DropdownMenuProps {
  userName: string;
}

const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({ userName }) => {
  const router = useRouter();
  const profile = useProfile()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
  const resetUserProfileStore = useUserProfileStore((state:any) => state.reset); // Get the reset function


  const handleSettingsClick = () => {
    console.log("Settings clicked");
    
    setIsSettingsOpen(true);
  };
  const closeSettingsModal = () => {
    setIsSettingsOpen(false); // Close the Settings modal
  };
  async function logoutUser(userId: string) {
    try {
      const response = await fetch('/api/userprofile/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      localStorage.removeItem('userId'); // Remove the userId from localStorage
      localStorage.removeItem('user-profile-storage'); // Remove the user profile from localStorage
      resetUserProfileStore(); // Reset the user profile store
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  }
  

  const handleLogoutClick = () => {
    console.log("Logout clicked");
    logoutUser(profile.userId)
    localStorage.removeItem('userId'); // Remove the userId from localStorage
    localStorage.removeItem('user-profile-storage'); // Remove the user profile from localStorage
    // Perform logout logic (e.g., clear session, etc.)
    router.push('/Login'); // Redirect to the login page
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Perform logout logic (e.g., clear session, etc.)
    router.push('/ViewProfile'); // Redirect to the loagin page
  };


  const dropdownButtonStyle = {
    backgroundColor: "#65AD87",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    cursor: "pointer",
    minWidth: "120px",
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'white', // Background color for menu items
    color: '#333', // Text color for menu items
  };

  const arrowStyle = {
    marginRight: "8px",
    marginLeft: "6px",
    width: "30px",
    color: "#65AD87",
    height: "30px",
  };

  return (
    <div className=''>
    <Dropdown>
      <DropdownTrigger>
        <Button className={cn("bordered", dropdownButtonStyle)}>
          {userName}
          <IoIosArrowDown style={arrowStyle} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu">
        
        <DropdownItem onClick={handleProfileClick} className={cn("cursor-pointer")} style={menuItemStyle}>
          <CgProfile style={{ marginRight: "8px" }} />
          <span>Profile</span>
        </DropdownItem>
        <DropdownItem onClick={handleSettingsClick} className={cn("cursor-pointer")} style={menuItemStyle}>
          <IoIosSettings style={{ marginRight: "8px" }} />
          <span>Settings</span>
        </DropdownItem>
        <DropdownItem onClick={handleLogoutClick} className={cn("cursor-pointer")} style={menuItemStyle}>
          <IoIosLogOut style={{ marginRight: "8px" }} />
          <span>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    {isSettingsOpen && (
        <Settings isOpen={isSettingsOpen} onClose={closeSettingsModal} />
      )}
    </div>
  );
};

export default DropdownMenuComponent;
