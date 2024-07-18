'use client'
import '../globals.css'; // Correct path based on the structure above
import Header from '../components/headermain';
import Footer from '../components/footer';
import React, { useState } from 'react';

const Page = () => {
  const [activeButton, setActiveButton] = useState('friends');

  const toggleButton = (button: string) => {
    setActiveButton(button);
  };

  return (
    <section className="overflow-y-auto h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green ">
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Left Box with custom scrollbar */}
        <div className="w-1/4 h-screen overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)' }}>
  {/* Toggle Buttons */}
  <div className="p-4">
    <button
      className={`p-2 rounded-full border-none ${activeButton === 'friends' ? 'bg-custom-green text-white' : 'bg-white text-black'}`}
      style={{ backgroundColor: activeButton === 'friends' ? '#65AD87' : 'transparent', borderRadius: '30px' }}
      onClick={() => toggleButton('friends')}
    >
      Friends
    </button>
    <button
      className={`p-2 rounded-full border-none ${activeButton === 'community' ? 'bg-custom-green text-white' : 'bg-white text-black'}`}
      style={{ backgroundColor: activeButton === 'community' ? '#65AD87' : 'transparent', borderRadius: '30px' }}
      onClick={() => toggleButton('community')}
    >
      Community
    </button>
  </div>
</div>


        {/* Main Content Area */}
        <div className="flex-grow p-4">
          {/* Main content goes here */}
          <h1>Main Content Area</h1>
          <p>This is where your main content would go.</p>
        </div>

        {/* Right Box with custom scrollbar */}
        <div className="w-1/4 h-screen overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'rgba(101, 173, 135, 0.2)' }}>
          {/* Dummy content for the right box */}
          <div className="p-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            {/* Add more content here */}
          </div>
        </div>
      </div>
      {/* Footer Component */}
      <Footer />
    </section>
  );
};

export default Page;
