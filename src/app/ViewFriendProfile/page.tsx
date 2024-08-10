'use client'

import React from 'react'
import ViewFriendProfile from './ViewFriendProfile'
import { useSearchParams } from "next/navigation";
import BackgroundImage from '../ViewProfile/BackgroundImage';
import Header from '../components/headerComponents/HomeHeader';
import Background from '../components/authComponents/Background';

const page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("friend") ?? null;

  return (
    <div className="rounded-4xl relative overflow-hidden bg-[#E7EEEA]">
      <Header />
      <div className="relative ">
        <div className=" mt-18 flex justify-center">
          <ViewFriendProfile userId={userId || ''}/>
        </div>
      </div>
      <Background />
    </div>
  )
}

export default page