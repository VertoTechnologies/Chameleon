import React from 'react';
import Image from 'next/image';

const Border = () => {
  return (
    <div className="logo-container rounded-xl rounded-l-3xl bg-orange-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <div style={{ maxWidth: '100%', maxHeight: '300px' }}>
          <Image
            src='/assets/images/logo.png'
            alt="Example Image"
            width={1600}
            height={600}
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h2 className='font-source-code font-bold text-lg tracking-wider text-black mt-4'>CHAMELEON</h2>
      </div>
    </div>
  );
}

export default Border;
