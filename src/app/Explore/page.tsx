import React from 'react';
import Header from '../components/headermain';
import Footer from '../components/footer';
import SearchBar from '../components/searchbar';
import SearchResultsContainer from '../components/SearchResultContainer';

const Explore = () => {
  return (
    <section className="scroll-smooth overflow-y-auto h-screen scrollbar scrollbar-thumb-custom-green scrollbar-track-gray ">
      <Header />
      <SearchBar />
      <div className="flex justify-center p-4 bg-[rgb(101,173,135,0.2)]">
        <SearchResultsContainer />
      </div>
      <Footer />
    </section>
  );
};

export default Explore;
