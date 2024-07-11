import Image from 'next/image';

import React from 'react'

const Background = () => {
  return (
    <div>
        <div className="absolute inset-x-0 bottom-0" style={{ maxWidth: '30%', maxHeight: '300px' }}>
          <Image
            src='/assets/extras/gulp.png'
            alt="Example Image"
            width={1600}
            height={600}
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="absolute top-0 right-0" style={{ maxWidth: '30%', maxHeight: '300px' }}>
          <Image
            src='/assets/extras/gulp2.png'
            alt="Example Image"
            width={1600}
            height={600}
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="absolute top-6 left-6" style={{ maxWidth: '30%', maxHeight: '300px' }}>
          <Image
            src='/assets/extras/dots.png'
            alt="Example Image"
            width={1600}
            height={600}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="absolute bottom-6 right-6" style={{ maxWidth: '30%', maxHeight: '300px' }}>
          <Image
            src='/assets/extras/dots.png'
            alt="Example Image"
            width={1600}
            height={600}
            layout="responsive"
            objectFit="cover"
          />
        </div>
    </div>
  )
}

export default Background