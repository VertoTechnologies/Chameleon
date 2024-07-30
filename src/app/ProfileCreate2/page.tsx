import React from 'react';
import ProFile from './ProFile'
import Border from '../components/Border';
import Background from '../components/Background';

const Page: React.FC = () => {
  return (
    <div className="sign-up-layout rounded-4xl relative overflow-hidden">
      <div className="form-container flex rounded-4xl h-auto relative z-10">
        <ProFile />
        <Border />
      </div>
      <Background />
    </div>
  );
};

export default Page;
