"use client";
import React from 'react';
import SignUp from './SignUp';
import Border from '../components/authComponents/FormBorder';
import Background from '../components/authComponents/Background';
import withNoAuth from '../components/authComponents/withNoAuth';

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#A7CDB9] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Mobile: Single column, Desktop: Two columns */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-white rounded-lg lg:rounded-2xl shadow-lg relative z-10 min-h-[600px] lg:min-h-[700px]">
        {/* Sign Up Form */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <SignUp />
        </div>
        
        {/* Logo/Border Section - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block lg:w-1/2 order-1 lg:order-2">
          <Border />
        </div>
      </div>
      <Background />
    </div>
  );
};

export default withNoAuth(Page);
