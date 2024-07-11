import React from 'react';

const Aboutus = () => {
  return (
    <section className="relative max-w-full bg-green-400 bg-opacity-35 py-16 md:py-24 h-auto flex flex-row justify-center items-center">
      {/* Left side */}
      <div className="flex flex-col justify-center items-start text-center px-6 md:px-12 md:text-left"> {/* Updated alignment classes */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">About Us</h2> {/* Removed md:text-left here */}
        <p className="text-base md:text-lg text-black mb-4 max-w-lg ml-2"> {/* Added ml-4 for margin-left */}
          We believe that language is the bridge that connects people across cultures and continents. Our app, Chameleon, embodies this vision by creating a straightforward, reliable platform for language learners to connect, practice, and grow together.
        </p>
        <button
          className="bg-green-400 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          style={{
            backgroundColor: 'rgba(101, 173, 135, 1)', // Background color
            width: '300px', // Adjust width as needed
          }}
        >
          Let's get Started!
        </button>
      </div>

      {/* Right side */}
      <img
        src="/assets/extras/aboutus.png"  // Replace with your image path for 'aboutus.png'
        alt="About Image"
        className="ml-8 md:ml-12 max-w-xs md:max-w-lg"
        style={{ maxHeight: '260px' }}  // Adjust max height as needed
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <img
          src="/assets/extras/dots.png"  // Replace with your dot image path
          alt="Dot Image"
          style={{ width: '90.5px', height: '22.5px', objectFit: 'cover' }} // Adjust size of dots image
        />
      </div>

      <div className="absolute bottom-0 right-0 mb-4 mr-4">
        <img
          src="/assets/extras/dots.png"  // Replace with your dot image path
          alt="Dot Image"
          style={{ width: '90.5px', height: '22.5px', objectFit: 'cover' }} // Adjust size of dots image
        />
      </div>

      {/* Bottom left image */}
      <img
        src="/assets/extras/bottomleft.png"  // Replace with your image path
        alt="Bottom Left Image"
        className="absolute bottom-0 left-0 h-48 w-48 md:h-56 md:w-56"  // Increased size for bottomleft.png
      />

      {/* Top right image */}
      <img
        src="/assets/extras/topright.png"  // Replace with your image path
        alt="Top Right Image"
        className="absolute top-0 right-0 h-48 w-48 md:h-56 md:w-56"  // Increased size for topright.png
      />
    </section>
  );
};

export default Aboutus;
