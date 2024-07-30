import React from 'react';
import Header from '../components/headermain';
import Footer from '../components/footer';
import ViewFile from './ViewFile';
import BackgroundImage from './Topbacground'; // Import the component

const Page: React.FC = () => {
  return (
    <div className="rounded-4xl relative overflow-hidden">
      <Header />
      <div className="relative">
        <BackgroundImage /> {/* Call the image component here */}
        <div className="relative -mt-32 z-10 flex justify-center">
          <ViewFile />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;