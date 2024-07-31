// components/Aboutus.tsx
import React from 'react';
import Link from 'next/link';

const Aboutus = () => {
  return (
    <section id='about' className="relative max-w-full scroll-smooth bg-green-400 bg-opacity-35 py-16 md:py-24 h-auto flex flex-row justify-center items-center">
      {/* Left side */}
      <div className="flex flex-col justify-center items-start text-center px-6 md:px-12 md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">About Us</h2>
        <p className="text-base md:text-lg text-black mb-4 max-w-lg ml-2">
          We believe that language is the bridge that connects people across cultures and continents. Our app, Chameleon, embodies this vision by creating a straightforward, reliable platform for language learners to connect, practice, and grow together.
        </p>
        <Link href="/SignUp">
          <button
            className="bg-green-400 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
            style={{
              backgroundColor: 'rgba(101, 173, 135, 1)',
              width: '300px',
            }}
          >
            Let's get Started!
          </button>
        </Link>
      </div>

      {/* Right side */}
      <img
        src="/assets/extras/aboutus.png"
        alt="About Image"
        className="ml-8 md:ml-12 max-w-xs md:max-w-lg"
        style={{ maxHeight: '260px' }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <img
          src="/assets/extras/dots.png"
          alt="Dot Image"
          style={{ width: '90.5px', height: '22.5px', objectFit: 'cover' }}
        />
      </div>

      <div className="absolute bottom-0 right-0 mb-4 mr-4">
        <img
          src="/assets/extras/dots.png"
          alt="Dot Image"
          style={{ width: '90.5px', height: '22.5px', objectFit: 'cover' }}
        />
      </div>

      {/* Bottom left image */}
      <img
        src="/assets/extras/bottomleft.png"
        alt="Bottom Left Image"
        className="absolute bottom-0 left-0 h-48 w-48 md:h-56 md:w-56"
      />

      {/* Top right image */}
      <img
        src="/assets/extras/topright.png"
        alt="Top Right Image"
        className="absolute top-0 right-0 h-48 w-48 md:h-56 md:w-56"
      />
    </section>
  );
};

export default Aboutus;