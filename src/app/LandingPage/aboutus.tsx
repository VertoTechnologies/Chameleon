// components/Aboutus.tsx
import React from 'react';
import Link from 'next/link';

const Aboutus = () => {
  return (
    <section id='about' className="relative w-full scroll-smooth bg-green-400 bg-opacity-35 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left flex-1 z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              About Us
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black mb-6 sm:mb-8 max-w-lg leading-relaxed">
              We believe that language is the bridge that connects people across cultures and continents. Our app, Chameleon, embodies this vision by creating a straightforward, reliable platform for language learners to connect, practice, and grow together.
            </p>
            <Link href="/SignUp">
              <button className="w-full sm:w-auto bg-[#65AD87] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full shadow-lg hover:bg-[#569A74] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base lg:text-lg font-medium">
                Let's get Started!
              </button>
            </Link>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src="/assets/extras/aboutus.png"
                alt="About Image"
                className="w-full h-auto object-contain"
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 sm:top-4 md:top-6 left-2 sm:left-4 md:left-6 z-0">
        <img
          src="/assets/extras/dots.png"
          alt="Decorative dots"
          className="w-12 h-3 sm:w-16 sm:h-4 md:w-20 md:h-5 lg:w-24 lg:h-6 object-cover opacity-60"
        />
      </div>

      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 right-2 sm:right-4 md:right-6 z-0">
        <img
          src="/assets/extras/dots.png"
          alt="Decorative dots"
          className="w-12 h-3 sm:w-16 sm:h-4 md:w-20 md:h-5 lg:w-24 lg:h-6 object-cover opacity-60"
        />
      </div>

      {/* Background decorative images */}
      <div className="absolute bottom-0 left-0 z-0 opacity-20 sm:opacity-30">
        <img
          src="/assets/extras/bottomleft.png"
          alt="Bottom Left Background"
          className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 object-contain"
        />
      </div>

      <div className="absolute top-0 right-0 z-0 opacity-20 sm:opacity-30">
        <img
          src="/assets/extras/topright.png"
          alt="Top Right Background"
          className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 object-contain"
        />
      </div>
    </section>
  );
};

export default Aboutus;