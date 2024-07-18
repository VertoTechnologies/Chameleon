// components/DropdownMenu.jsx
'use client'

// components/DropdownMenu.jsx
// components/DropdownMenu.jsx

import React from "react";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { IoIosSettings, IoIosLogOut, IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

interface DropdownMenuProps {
  userName: string;
}

const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({ userName }) => {
  const router = useRouter();

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Add your settings logic here
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
    // Perform logout logic (e.g., clear session, etc.)
    router.push('/Login'); // Redirect to the login page
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
    <Dropdown>
      <DropdownTrigger>
        <Button className={cn("bordered", dropdownButtonStyle)}>
          {userName}
          <IoIosArrowDown style={arrowStyle} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu">
        
        <DropdownItem onClick={handleLogoutClick} className={cn("cursor-pointer")} style={menuItemStyle}>
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
  );
};

export default DropdownMenuComponent;
