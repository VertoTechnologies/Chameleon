'use client'
import React, { useState, useEffect } from 'react';
import Header from '../components/headerComponents/HomeHeader';
import Footer from '../components/footerComponents/footer';
import RecResultsContainer from '../components/suggestionComponents/recommendationComponent'
import { useProfile } from '../stores/UserStore';
import useFriendStore from '../stores/friendStore';
import Searchbar from '@/app/Explore/ExploreComponents/searchbar';
import withAuth from '../components/authComponents/withAuth';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface User {
  userId: string;
  name: string;
  nativeLanguage: string,
  fluentLanguagess: string[],
  learningLanguagess: string[],
  profilePic: string
}


const Explore: React.FC = () => {
  // const userData2 = useFriendStore((state) => state.usersData);
  const profile = useProfile()
  const [usersData, setUsersData] = useState<User[]>([]);
  const input = ''
  const option = ''
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`/api/users/searchAndSuggestUsers?userId=${profile.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({input, option }) 
        });
        {console.log(profile)}
        if (!response.ok) {
          console.error('Network response was not ok');
        }
        setIsLoading(false);

        const data = await response.json();
        setUsersData(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsersData();
  }, [profile.userId]);

  return (
    <section className="scroll-smooth overflow-y-auto h-screen scrollbar scrollbar-thumb-custom-green scrollbar-track-gray ">
      <Header />
      <Searchbar></Searchbar>
      
      
    </section>
  );
}; 

export default withAuth(Explore);