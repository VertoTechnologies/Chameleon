import React from 'react';
import Image from 'next/image';

const BgImg = () => {
  return (
    <div className="absolute inset-x-0 bottom-0" style={{ maxWidth: '100%', maxHeight: '300px' }}>
      <Image
        src='/assets/extras/BgImg.png'
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};

export default BgImg;
