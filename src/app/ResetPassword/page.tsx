"use client";
import React from 'react';
import Border from '../components/authComponents/FormBorder';
import Background from '../components/authComponents/Background';
import withNoAuth from '../components/authComponents/withNoAuth';
import ResetPasswordForm from './ResetPasswordForm';

const Page: React.FC = () => {
  return (
    <div className="sign-up-layout rounded-4xl relative overflow-hidden">
      <div className="form-container flex rounded-4xl h-auto relative z-10">
        <ResetPasswordForm />
      </div>
      <Background />
    </div>
  );
};

export default withNoAuth(Page);