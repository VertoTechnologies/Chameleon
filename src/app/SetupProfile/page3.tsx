'use client'

import React from 'react';
import Setup2 from './SetupProfile';
import Background from '../components/authComponents/Background';
import Border from '../components/authComponents/FormBorder';


const Page: React.FC = () => {
  return (
    <div className="sign-up-layout rounded-4xl relative overflow-hidden">
      <div className="form-container flex rounded-4xl h-auto relative z-10">
        <Setup2 />
        <Border />
      </div>
      <Background />
    </div>
  );
};

export default Page;
