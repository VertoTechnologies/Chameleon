<<<<<<< Updated upstream
import React from 'react'
=======
'use client'
import '../globals.css'; // Correct path based on the structure above
import Header from '../components/headermain';
import Footer from '../components/footer';
import LeftBox from '../components/friends'; // Corrected import path
import RightBox from '../components/suggestions';
import Communities from '../components/communities';
import React, { useState } from 'react';

const Page = () => {
  const [activeButton, setActiveButton] = useState('friends');

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };
>>>>>>> Stashed changes

const page = () => {
  return (
    <div>
      Dashboard
    </div>
  )
}

<<<<<<< Updated upstream
export default page
=======
      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Left Box or Communities */}
        {activeButton === 'friends' ? (
          <LeftBox activeButton={activeButton} toggleButton={toggleButton} />
        ) : (
          <Communities activeButton={activeButton} toggleButton={toggleButton} />
        )}

        {/* Main Content Area */}
        <div className="flex-grow p-4">
          <h1>Main Content Area</h1>
          <p>This is where your main content would go.</p>
        </div>

        {/* Right Box */}
        <RightBox />
      </div>

      {/* Footer Component */}
      <Footer />
    </section>
  );
};

export default Page;
>>>>>>> Stashed changes
