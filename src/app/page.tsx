import Aboutus from './landingpage/aboutus';
import Flags from './landingpage/flags';
import Features from './landingpage/features';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import ReactDOM from 'react-dom';
import React from 'react';

export default function Home() {
  return (
    <section className="overflow-y-auto h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green scrollbar-track-gray">
      <Header />
      <div className="p-4">
        <Aboutus />
      </div>
      <div className="p-4">
        <Flags />
      </div>
      <div className="p-4">
        <Features />
      </div>
      <Footer />
    </section>
  );
}
