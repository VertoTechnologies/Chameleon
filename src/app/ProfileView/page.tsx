import React from 'react';
import ViewFile from './ViewFile';
import BgImg from './BgImg';

const Page: React.FC = () => {
  return (
    <div className="sign-up-layout rounded-4xl relative overflow-hidden">
      <BgImg />
      <div className="form-container flex rounded-4xl h-auto relative z-10">
        <ViewFile />
      </div>
    </div>
  );
};

export default Page;
