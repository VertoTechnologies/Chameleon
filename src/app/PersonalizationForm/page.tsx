import React from 'react';
import PersonalizationForm from './PersonalizationForm'
import Border from '../components/authComponents/FormBorder';
import Background from '../components/authComponents/Background';

const Page: React.FC = () => {
  return (
    <div className="sign-up-layout rounded-4xl relative overflow-hidden">
      <div className="form-container flex rounded-4xl h-auto relative z-10">
        <PersonalizationForm />
        <Border />
      </div>
      <Background />
    </div>
  );
};

export default Page;
