'use client'

import React, { useState, useEffect } from 'react';
import Header from '../components/headermain';
import Footer from '../components/footer';
import SearchBar from '../components/searchbar';
import SearchResultsContainer from '../components/SearchResultContainer';
import RecResultsContainer from '../components/recommeendationC'
import { useProfile } from '../components/slaystore';



const Explore: React.FC = () => {
  const profile = useProfile()
  const [usersData, setUsersData] = useState<User[]>([]);

  interface User {
    userId: string;
    name: string;
    nativeLanguage: string,
    fluentLanguagess: string[],
    learningLanguagess: string[]
  }
  

  
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`/api/getUsers?user=${encodeURIComponent(JSON.stringify(profile))}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        {console.log(profile)}
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsersData(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsersData();
  }, [window?.localStorage?.getItem('userId')]);

  return (
    <section className="scroll-smooth overflow-y-auto h-screen scrollbar scrollbar-thumb-custom-green scrollbar-track-gray ">
      <Header />
      <SearchBar />
      <div className="flex justify-center p-4 bg-[rgb(101,173,135,0.2)]">
        {/* <SearchResultsContainer user = {usersData}/> */}
        <RecResultsContainer user = {usersData}/>
      </div>
      <Footer />
    </section>
  );
}; 

export default Explore;
