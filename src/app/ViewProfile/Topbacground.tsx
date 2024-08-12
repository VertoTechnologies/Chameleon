import React from 'react';

const BackgroundImage: React.FC = () => {
  return (
    <img
      src="/assets/extras/backgroundprofile.png" // Replace with your image path
      alt="Background"
      className="max-w-full h-64 object-cover" // Adjust height as needed
    />
  );
};
export default BackgroundImage;