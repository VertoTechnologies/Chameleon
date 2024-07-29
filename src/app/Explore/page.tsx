'use client'

import React, { useState, useEffect } from 'react';
import Header from '../components/headermain';
import Footer from '../components/footer';
import RecResultsContainer from '../components/recommeendationC'
import { useProfile } from '../components/slaystore';
import useFriendStore from '../components/friendStore';
import Aboutus from '../components/searchbar';


interface User {
  userId: string;
  name: string;
  nativeLanguage: string,
  fluentLanguagess: string[],
  learningLanguagess: string[]
}


const Explore: React.FC = () => {
  const userData2 = useFriendStore((state) => state.usersData);
  const profile = useProfile()
  const [usersData, setUsersData] = useState<User[]>([]);
  const input = ''
  const option = ''

  
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`/api/getUsers?userId=${profile.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({input, option }) 
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
      <Aboutus></Aboutus>
      <div className="flex flex-col items-center p-4 bg-[rgb(101,173,135,0.2)] rounded-lg shadow-lg">
      <h1 className="text-xl font-bold font-mt-extra text-center mb-4">
      Add Your Language Buddies
      </h1>
      <RecResultsContainer user={usersData} />
      </div>
      <Footer />
    </section>
  );
}; 

export default Explore;
