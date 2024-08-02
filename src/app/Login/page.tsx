"use client";
import React from 'react';
import Login from './Login';
import Border from '../components/authComponents/FormBorder';
import Background from '../components/authComponents/Background';
import withNoAuth from '../components/authComponents/withNoAuth';

const Page: React.FC = () => {
  return (
    <div className="sign-up-layout rounded-4xl relative overflow-hidden">
      <div className="form-container flex rounded-4xl h-auto relative z-10">
        <Login />
        <Border />
      </div>
      <Background />
    </div>
  );
};

export default withNoAuth(Page);
