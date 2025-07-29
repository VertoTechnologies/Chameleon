import React from 'react';
import Image from 'next/image';

const Border = () => {
  return (
    <div className="w-full h-full bg-[#F6EDE4] rounded-r-2xl flex flex-col items-center justify-center p-6 lg:p-8 xl:p-12">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo Image */}
        <div className="w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-6 lg:mb-8">
          <Image
            src='/assets/images/logo.png'
            alt="Chameleon Logo"
            width={300}
            height={300}
            className="w-full h-full object-contain rounded-xl"
            priority
          />
        </div>
        
        {/* Brand Name */}
        <h2 className="font-source-code-pro font-bold text-xl lg:text-2xl xl:text-3xl tracking-wider text-black text-center">
          CHAMELEON
        </h2>
        
        {/* Tagline */}
        <p className="mt-4 text-center text-gray-600 text-sm lg:text-base max-w-xs">
          Connect, Learn, and Grow with Language Partners Worldwide
        </p>
      </div>
    </div>
  );
}

export default Border;
