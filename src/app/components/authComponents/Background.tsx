import Image from 'next/image';
import React from 'react'

const Background = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Bottom Left Decorative Element */}
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 opacity-30 sm:opacity-40">
        <Image
          src='/assets/extras/gulp.png'
          alt="Decorative Element"
          width={200}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Top Right Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 opacity-30 sm:opacity-40">
        <Image
          src='/assets/extras/gulp2.png'
          alt="Decorative Element"
          width={200}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Top Left Dots */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 opacity-20 sm:opacity-30">
        <Image
          src='/assets/extras/dots.png'
          alt="Decorative Dots"
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Bottom Right Dots */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 opacity-20 sm:opacity-30">
        <Image
          src='/assets/extras/dots.png'
          alt="Decorative Dots"
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

export default Background